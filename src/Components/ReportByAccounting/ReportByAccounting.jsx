import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { GET } from "../../Api/Config";
import { StyledDataGrid } from "../../Common/DataGridCustom";
import ExportButton from "../../Common/ExportButton/ExportButton";
import { formatDate, formatMoney } from "../../Common/FormatDate/FormatDate";
import { getReportByAccountingAction } from "../../redux/action/ReportAction";

function ReportByAccounting() {
  const [listSemester, setListSemester] = useState([]);
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState({ _id: "", name: "" });
  const [department, setDepartment] = useState({ _id: "", name: "" });
  const [reward, setReward] = useState({ _id: "", name: "" });
  const [reports, setReports] = useState([]);
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const report = useSelector((state) => state.ReportReducer);
  const [semesters, setSemester] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listReward, setListReward] = useState([]);

  const getDataReport = () => {
    dispatch(
      getReportByAccountingAction(
        subject._id,
        department._id,
        year,
        reward._id,
        auth.accessToken
      )
    );
  };

  useEffect(async () => {
    const data = await Promise.all([
      GET("semester", auth.accessToken),
      GET("department", auth.accessToken),
      GET("reward", auth.accessToken),
    ]);

    setSemester(data[0].data.semesters);
    setListDepartment(data[1].data.data);
    setListReward(data[2].data.rewards);
  }, []);
  useEffect(() => {
    getDataReport();
    setFileName(`Báo cáo thanh toán tài vụ`);
  }, [department, subject, year, reward]);
  useEffect(async () => {
    if (department._id === "") {
      const res = await GET("/subject", auth.accessToken);
      setListSubject(res.data.data);
    } else {
      const res = await GET(
        `/subject/department/${department._id}`,
        auth.accessToken
      );
      setListSubject(res.data.data);
    }
  }, [department]);
  useEffect(() => {
    if (report.byAccounting && report.byAccounting.documents) {
      setReports(report.byAccounting.documents);
    }
  }, [report]);
  useEffect(() => {
    if (reports && reports.length > 0) {
      reports.filter((report) => {
        report["author"] = report.auth_lecture.concat(report.auth_student);
      });
      filterDataExport(reports);
    }
  }, [reports]);

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
  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setReward(value);
  };
  const handleChangeDepartment = (event) => {
    const {
      target: { value },
    } = event;
    setDepartment(value);
    setSubject({ _id: "", name: "" });
  };
  const handleChangeSubject = (event) => {
    const {
      target: { value },
    } = event;
    setSubject(value);
  };
  const removeFilter = () => {
    if (
      reward._id !== "" ||
      subject._id !== "" ||
      department._id !== "" ||
      year !== ""
    ) {
      return (
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            setReward({ _id: "", name: "" });
            setDepartment({ _id: "", name: "" });
            setSubject({ _id: "", name: "" });
            setYear("");
          }}
        >
          Xoá lọc
        </Button>
      );
    }
  };

  const columns: GridColDef[] = [
    {
      field: "topic_name",
      headerName: "Tên bài nghiên cứu",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category_research_id",
      headerName: "Danh mục",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.value.name;
      },
    },
    {
      field: "department_id",
      headerName: "Khoa",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.name;
      },
    },
    {
      field: "subject_id",
      headerName: "Bộ môn",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.name;
      },
    },
    {
      field: "semester_id",
      headerName: " Kỳ học ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.value.semester_name + " / " + params.value.year;
      },
    },
    {
      field: "author",
      headerName: "Tác giả",
      minWidth: 250,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.map((lecturer, index) => {
          return lecturer.name + " ";
        });
      },
    },
    {
      field: "reward_id",
      headerName: "Loại danh mục thưởng",
      minWidth: 250,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.reward_name;
      },
    },
    {
      field: "amount",
      headerName: "Mức thưởng",
      minWidth: 250,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return formatMoney(params.row.reward_id.amount);
      },
    },
  ];
  const customFooter = () => {
    return (
      <Box style={{ float: "right", margin: 20 }}>
        <Stack direction={"row"} spacing={3}>
          <Typography variant='h5' component={"h5"} fontWeight='500'>
            Tổng thanh toán:
          </Typography>
          <Typography variant='h6' component={"h6"}>
            {report.byAccounting.totalPrice
              ? formatMoney(report.byAccounting.totalPrice)
              : 0}{" "}
            VND
          </Typography>
        </Stack>
      </Box>
    );
  };
  const filterDataExport = (data) => {
    const newData = data.map((data, index) => {
      let newAuthor = "";
      data.author.map((author) => {
        return (newAuthor += author.name);
      });

      return {
        STT: index + 1,
        "Tên bài nghiên cứu": data.topic_name,
        "Danh mục": data.category_research_id.name,
        Khoa: data.department_id.name,
        "Bộ môn": data.subject_id.name,
        "Kỳ học":
          data.semester_id.semester_name + " năm " + data.semester_id.year,
        "Tác giả": newAuthor,
        "Loại danh mục thưởng": data.reward_id.reward_name,
        "Ngày lưu": formatDate(data.save_date),
        "Mức thưởng": data.reward_id.amount,
      };
    });
    const footer = {
      "Ngày lưu": "Tổng thanh toán",
      "Mức thưởng": report.byAccounting.totalPrice,
    };
    newData.push(footer);
    setData(newData);
  };
  return (
    <Box>
      <Stack
        direction={{ sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent='space-between'
        mb={5}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: { fontSize: "1.25rem" },
          })}
        >
          Danh sách bài nghiên cứu đã thanh toán
        </Typography>
        <ExportButton data={data} fileName={fileName} type={"excel"} />
      </Stack>
      <Grid container sx={{ marginBottom: 3 }} spacing={3}>
        <Grid item xs={6} md={3}>
          <Box>
            <Select
              labelId='list-year-label'
              id='list-year'
              displayEmpty
              fullWidth
              value={reward}
              onChange={handleChangeCategory}
              renderValue={(reward) => {
                if (reward._id === "") {
                  return <small>Lựa chọn danh mục thanh toán</small>;
                }
                return reward.name;
              }}
            >
              {listReward && listReward.length > 0 ? (
                listReward.map((reward, index) => (
                  <MenuItem
                    key={index}
                    value={{ _id: reward._id, name: reward.reward_name }}
                  >
                    <ListItemText primary={reward.reward_name} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value=''></MenuItem>
              )}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <Select
              labelId='list-year-label'
              id='list-year'
              displayEmpty
              fullWidth
              value={department}
              onChange={handleChangeDepartment}
              renderValue={(department) => {
                if (department && department._id === "") {
                  return <small>Lựa chọn khoa</small>;
                }
                return department.name;
              }}
            >
              {listDepartment.length > 0 ? (
                listDepartment.map((department, index) => (
                  <MenuItem
                    key={index}
                    value={{ _id: department._id, name: department.name }}
                  >
                    <ListItemText primary={department.name} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value=''></MenuItem>
              )}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <Select
              labelId='list-year-label'
              id='list-year'
              displayEmpty
              fullWidth
              value={subject}
              onChange={handleChangeSubject}
              renderValue={(subject) => {
                if (subject.name === "") {
                  return <small>Lựa chọn bộ môn</small>;
                } else {
                  return subject.name;
                }
              }}
            >
              {listSubject.length > 0 ? (
                listSubject.map((subject, index) => (
                  <MenuItem
                    key={index}
                    value={{ _id: subject._id, name: subject.name }}
                  >
                    <ListItemText primary={subject.name} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value=''></MenuItem>
              )}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box>
            <Select
              labelId='list-year-label'
              id='list-year'
              displayEmpty
              fullWidth
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
        </Grid>
        <Grid item xs={6} md={3}>
          <Box height={"100%"} display='flex'>
            {removeFilter()}
          </Box>
        </Grid>
      </Grid>
      {reports ? (
        <StyledDataGrid
          ref={tableRef}
          rows={reports}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 50]}
          pagination
          components={{ Footer: customFooter }}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ReportByAccounting;
