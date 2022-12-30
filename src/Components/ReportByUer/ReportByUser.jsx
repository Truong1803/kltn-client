import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { getALLCategoryResearchAction } from "../../redux/action/CategoryAction";
import { getReportByUserAction } from "../../redux/action/ReportAction";
import { getALLSemesterAction } from "../../redux/action/SemesterAction";
import ApproveResearchDetail from "../ApproveResearch/ApproveResearchDetail";

function ReportByUser() {
  const [dataReport, setDataReport] = useState([]);
  const [listSemester, setListSemester] = useState([]);
  const [year, setYear] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const report = useSelector((state) => state.ReportReducer);
  const semesters = useSelector((state) => state.SemesterReducer);
  const [checkReportDetail, setCheckReportDetail] = useState(false);
  const getDataByUser = () => {
    dispatch(getReportByUserAction(year, auth.accessToken));
  };
  const getDataFilter = () => {
    dispatch(getALLSemesterAction(auth.accessToken));
    dispatch(getALLCategoryResearchAction(auth.accessToken));
  };
  useEffect(() => {
    getDataFilter();
  }, []);
  useEffect(() => {
    getDataByUser();
  }, [year]);
  useEffect(() => {
    if (report?.byUser) {
      console.log("my log test", report?.byUser);
      setDataReport(report.byUser);
    }
  }, [report]);
  const handleAction = async (action, item) => {
    setAction(action);
    setItem(item);
    setOpenDetail(true);
    setCheckReportDetail(true);
  };
  useEffect(() => {
    if (semesters?.length > 0) {
      const newList = [];
      semesters.filter((semester) => {
        newList.push(semester.year);
        return newList;
      });
      let data = new Set(newList);
      setListSemester(Array.from(data));
    }
  }, [semesters]);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const renderStatus = (amount_time, time_require) => {
      const total = time_require - amount_time;
      if (total <= 0) {
        return <Chip color='success' label='Hoàn thành' />;
      } else {
        return <Chip color='warning' label='Không hoàn thành' />;
      }
    };
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row'>
            {row.semester_id.year}
          </TableCell>
          <TableCell align='center'>{Math.floor(row.amount_time)}</TableCell>
          <TableCell align='center'>{Math.floor(row.time_require)}</TableCell>
          <TableCell align='center'>
            {renderStatus(row.amount_time, row.time_require)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Bài nghiên cứu
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên bài nghiên cứu</TableCell>
                      <TableCell>Danh mục</TableCell>
                      <TableCell>Công việc</TableCell>
                      <TableCell>Giờ tích luỹ</TableCell>
                      <TableCell>Học kỳ</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.document_id.map((documentRow) => (
                      <TableRow key={documentRow._id}>
                        <TableCell component='th' scope='row'>
                          {documentRow.topic_name}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {documentRow.category_research_id.name}
                        </TableCell>
                        <TableCell>
                          {documentRow.research_detail_id.research_detail_name}
                        </TableCell>
                        <TableCell align='center'>
                          {documentRow.amount_time}
                        </TableCell>
                        <TableCell>{documentRow.semester}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              handleAction("", documentRow);
                            }}
                            sx={{
                              backgroundColor: "#fff",
                              borderRadius: 1,
                            }}
                            disableElevation={true}
                            variant='outlined'
                          >
                            <VisibilityIcon color='primary' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
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
          Báo cáo nghiên cứu của giảng viên
        </Typography>
      </Stack>
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Năm học</TableCell>
                <TableCell align='center'>Giờ tích luỹ</TableCell>
                <TableCell align='center'>Giờ yêu cầu</TableCell>
                <TableCell align='center'>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataReport?.length > 0 ? (
                dataReport?.map((report) => (
                  <Row key={report._id} row={report} />
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ApproveResearchDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        item={item}
        action={action}
        report={checkReportDetail}
      />
    </Box>
  );
}

export default ReportByUser;
