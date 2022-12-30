import React, { forwardRef, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, ListItemText, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getReportByLecturerAction } from "../../../redux/action/ReportAction";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function LecturerPassSubject({
  openLecturer,
  setOpenLecturer,
  subjectId,
  year,
  option,
}) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const reports = useSelector((state) => state.ReportReducer);
  const handleDataLecturer = (year) => {
    dispatch(getReportByLecturerAction(option, year, auth.accessToken));
  };
  useEffect(() => {
    if (year === "") {
      handleDataLecturer("2021-2022");
    } else {
      handleDataLecturer(year);
    }
  }, [year]);

  useEffect(() => {
    if (reports.byLecturer) {
      setData(reports.byLecturer);
    }
  }, [reports.byLecturer]);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    let amount_time = Math.floor(row.amount_time);
    let time_require = Math.floor(row.time_require);
    let total = amount_time - time_require;
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
            {row.user_id.name}
          </TableCell>
          <TableCell align='center' style={total <= 0 ? { color: "red" } : {}}>
            {amount_time}
          </TableCell>
          <TableCell align='center'>{time_require}</TableCell>
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
  const renderTitle = () => {
    if (option === "pass") {
      return " hoàn thành ";
    } else if (option === "fail") {
      return " không hoàn thành ";
    } else {
      return " tham gia ";
    }
  };
  return (
    <div>
      {data ? (
        <Dialog fullScreen open={openLecturer} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                Danh sách giảng viên {renderTitle()} nghiên cứu của bộ môn{" "}
                {subjectId.name ? subjectId.name : ""}
              </Typography>
              <IconButton
                edge='start'
                color='inherit'
                onClick={() => {
                  setOpenLecturer(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box style={{ margin: 3 }}>
            <Box>
              <TableContainer component={Paper}>
                <Table aria-label='collapsible table'>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Giảng viên</TableCell>
                      <TableCell align='center'>Giờ tích luỹ</TableCell>
                      <TableCell align='center'>Giờ yêu cầu</TableCell>
                      <TableCell align='center'>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.length > 0 ? (
                      data?.map((report) => (
                        <Row key={report._id} row={report} />
                      ))
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Dialog>
      ) : (
        <></>
      )}
    </div>
  );
}
