import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Grid,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import TotalResearch from "./TopPaper/TotalResearch";
import { useDispatch, useSelector } from "react-redux";
import TopicIcon from "@mui/icons-material/Topic";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import BackpackIcon from "@mui/icons-material/Backpack";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  getALLTotalResearchAction,
  getReportByDepartmentAction,
  getReportBySubjectAction,
} from "../../redux/action/ReportAction";
import { getALLSemesterAction } from "../../redux/action/SemesterAction";
export default function DashBoard() {
  const [listSemester, setListSemester] = useState([]);
  const [year, setYear] = useState("2021-2022");
  const [dataDepartment, setDataDepartment] = useState([]);

  const auth = useSelector((state) => state.AuthReducer);
  const totalResearch = useSelector((state) => state.ReportReducer);
  const semesters = useSelector((state) => state.SemesterReducer);
  const dispatch = useDispatch();
  const getDataTotal = () => {
    dispatch(getALLTotalResearchAction(year, auth.accessToken));
  };
  const getDataSemester = () => {
    dispatch(getALLSemesterAction(auth.accessToken));
  };
  const getDataByDepartment = () => {
    dispatch(getReportByDepartmentAction(year, auth.accessToken));
  };
  const getDataBySubject = () => {
    dispatch(getReportBySubjectAction(year, auth.accessToken));
  };
  useEffect(() => {
    getDataSemester();
  }, []);
  useEffect(() => {
    getDataByDepartment();
    getDataBySubject();
    getDataTotal();
  }, [year]);
  useEffect(() => {
    setDataDepartment(totalResearch.byDepartment);
  }, [totalResearch]);

  useEffect(() => {
    if (semesters.length > 0) {
      const newList = [];
      semesters.filter((semester) => {
        newList.push(semester.year);
        return newList;
      });
      let data = new Set(newList);
      setListSemester(Array.from(data));
    }
  }, [semesters]);

  const handleChangeYear = (event) => {
    const {
      target: { value },
    } = event;
    setYear(value);
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Box>
        <Grid container p={5} spacing={5}>
          <Grid item xs={12} sm={4} md={3}>
            <Box>
              <TotalResearch
                data={totalResearch?.total.countDocument}
                title='Số lượng bài nghiên cứu'
                color='#C8FACD'
                colorIcon='#007B55'
                icon={<TopicIcon fontSize='medium' />}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box>
              <TotalResearch
                data={totalResearch?.total.countDocumentApproved}
                title='Bài nghiên cứu đã duyệt'
                color='#D0F2FF'
                colorIcon='#04297A'
                icon={<BeenhereIcon fontSize='medium' />}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box>
              <TotalResearch
                data={totalResearch?.total.countDocumentUnAproved}
                title='Bài nghiên cứu chưa được duyệt'
                color='#FFF7CD'
                colorIcon='#7A4F01'
                icon={<BackpackIcon fontSize='medium' />}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box>
              <TotalResearch
                data={totalResearch?.total.countDocumentStudent}
                title='Bài nghiên cứu có sinh viên'
                color='#FFE7D9'
                colorIcon='#7A0C2E'
                icon={<AccountBoxIcon fontSize='medium' />}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Select
          labelId='list-year-label'
          id='list-year'
          displayEmpty
          value={year}
          onChange={handleChangeYear}
          renderValue={(year) => {
            if (year.length === 0) {
              return <small>Lựa chọn năm học</small>;
            }
            return year;
          }}
        >
          {listSemester.length > 0 ? (
            listSemester.map((year, index) => (
              <MenuItem key={index} value={year}>
                <ListItemText primary={year} />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value=''></MenuItem>
          )}
        </Select>
      </Box>
      <Box sx={{ height: "400px", mt: 5 }}>
        <Typography textAlign={"center"} fontSize={20} fontWeight={600}>
          Biểu đồ số lượng bài nghiên cứu của các khoa theo năm
        </Typography>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={600}
            height={300}
            data={dataDepartment}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='_id' />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign='top'
              height={50}
              formatter={(value, entry, index) => {
                if (value === "count") {
                  value = "Bài nghiên cứu";
                }
                return value;
              }}
            />
            <Bar
              dataKey='count'
              barSize={40}
              minPointSize={10}
              fill='#8884d8'
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
}
