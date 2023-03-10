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
        return <Chip color='success' label='Ho??n th??nh' />;
      } else {
        return <Chip color='warning' label='Kh??ng ho??n th??nh' />;
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
                  B??i nghi??n c???u
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>T??n b??i nghi??n c???u</TableCell>
                      <TableCell>Danh m???c</TableCell>
                      <TableCell>C??ng vi???c</TableCell>
                      <TableCell>Gi??? t??ch lu???</TableCell>
                      <TableCell>H???c k???</TableCell>
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
      return " ho??n th??nh ";
    } else if (option === "fail") {
      return " kh??ng ho??n th??nh ";
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
                Danh s??ch gi???ng vi??n {renderTitle()} nghi??n c???u c???a b??? m??n{" "}
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
                      <TableCell>Gi???ng vi??n</TableCell>
                      <TableCell align='center'>Gi??? t??ch lu???</TableCell>
                      <TableCell align='center'>Gi??? y??u c???u</TableCell>
                      <TableCell align='center'>Tr???ng th??i</TableCell>
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
