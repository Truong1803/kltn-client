import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BackpackIcon from "@mui/icons-material/Backpack";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import TopicIcon from "@mui/icons-material/Topic";
import {
  Box,
  Button,
  Chip,
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
import { formatDate } from "../../Common/FormatDate/FormatDate";
import { getReportBySubjectAction } from "../../redux/action/ReportAction";
import { getResearchByCaseAction } from "../../redux/action/ResearchAction";
import TotalResearch from "../DashBoard/TopPaper/TotalResearch";
import LecturerSubject from "./TopReport/LecturerSubject";
import ResearchSubject from "./TopReport/ResearchSubject";
import LecturerPassSubject from "./TopReport/LecturerPass";

function ReportBySubject() {
  const [dataSubject, setDataSubject] = useState([]);
  const [listSemester, setListSemester] = useState([]);
  const [year, setYear] = useState("");
  const [category, setCategory] = useState({ _id: "", name: "" });
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [hasStudent, setHasStudent] = useState("");
  const [showLecturer, setShowLecturer] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showLecturerPass, setShowLecturerPass] = useState(false);
  const [showLecturerFail, setShowLecturerFail] = useState(false);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const researchs = useSelector((state) => state.ResearchReducer);
  const info = useSelector((state) => state.UserAuthReducer);
  const totalResearch = useSelector((state) => state.ReportReducer);
  const [semesters, setSemester] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const getDataResearch = () => {
    if (info && info.subject_id[0]) {
      dispatch(
        getResearchByCaseAction(
          "",
          info.subject_id[0]._id,
          "",
          year,
          category._id,
          true,
          hasStudent,
          auth.accessToken
        )
      );
      setFileName(`Danh s??ch b??i nc b??? m??n ${info.subject_id[0].name}`);
    }
  };
  const getDataTotal = () => {
    dispatch(getReportBySubjectAction(year, auth.accessToken));
  };
  useEffect(async () => {
    const data = await Promise.all([
      GET("semester", auth.accessToken),
      GET("category-research", auth.accessToken),
    ]);
    setSemester(data[0].data.semesters);
    setListCategory(data[1].data.categorys);
  }, []);
  useEffect(() => {
    getDataResearch();
    getDataTotal();
  }, [year, category, hasStudent]);
  useEffect(() => {
    if (researchs && researchs.length > 0) {
      researchs.filter(
        (research) =>
          (research["author"] = research.auth_lecture.concat(
            research.auth_student
          ))
      );
      filterDataExport(researchs);
    }
  }, [researchs]);
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
  useEffect(() => {
    const newData = [
      {
        name: "B??i nghi??n c???u pass",
        value: totalResearch.bySubject?.countUserPass,
      },
      {
        name: "B??i nghi??n c???u faild",
        value: totalResearch.bySubject?.countUserFail,
      },
    ];
    setDataSubject(newData);
  }, [totalResearch]);
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
    setCategory(value);
  };

  const removeFilter = () => {
    if (category._id !== "" || year !== "" || hasStudent != "") {
      return (
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            setCategory({ _id: "", name: "" });
            setYear("");
            setHasStudent("");
          }}
        >
          Xo?? l???c
        </Button>
      );
    }
  };
  const renderChip = (item) => {
    if (item.status === true) {
      if (item.offer === "nomal") {
        return <Chip color='warning' label='???? duy???t' />;
      } else if (item.offer === "offer") {
        return <Chip color='info' label='??ang ????? xu???t th?????ng' />;
      } else if (item.offer === "pendding") {
        return <Chip color='primary' label='??ang ch??? thanh to??n' />;
      } else {
        return <Chip color='success' label='???? thanh to??n' />;
      }
    } else {
      return <Chip color='error' label='Ch??a duy???t' />;
    }
  };
  const columns: GridColDef[] = [
    {
      field: "topic_name",
      headerName: "T??n b??i nghi??n c???u",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category_research_id",
      headerName: "Danh m???c",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.name;
      },
    },
    {
      field: "department_id",
      headerName: "Khoa",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.name;
      },
    },
    {
      field: "subject_id",
      headerName: "B??? m??n",
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
      headerName: " K??? h???c ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.semester_name + " / " + params.value.year;
      },
    },
    {
      field: "approver",
      headerName: " Ng?????i duy???t ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value?.name;
      },
    },

    {
      field: "author",
      headerName: "T??c gi???",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.map((student) => {
          return student.name + " ";
        });
      },
    },
    {
      field: "offer",
      headerName: "Tr???ng th??i",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return renderChip(params.row);
      },
    },
    {
      field: "save_date",
      headerName: " Ng??y l??u ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return formatDate(params.value);
      },
    },
  ];
  const filterDataExport = (data) => {
    const newData = data.map((data, index) => {
      let newAuthor = "";
      data.author.map((author) => {
        return (newAuthor += author.name);
      });
      return {
        stt: index + 1,
        topic_name: data.topic_name,
        category: data.category_research_id.name,
        department: data.department_id.name,
        subject: data.subject_id.name,
        semester: data.semester_id.year,
        auth: data.author.map((author) => author.name).toString(),
        link: data.link,
        category_id: data.category_research_id.id,
      };
    });
    setData(newData);
  };
  const handleChangeType = (event) => {
    const {
      target: { value },
    } = event;
    setHasStudent(value);
  };
  const handleAction = (action) => {
    if (action === "LECTURER") {
      setShowLecturer(true);
      setShowResearch(false);
      setShowLecturerFail(false);
      setShowLecturerPass(false);
    } else if (action === "DOCUMENT") {
      setShowLecturer(false);
      setShowResearch(true);
      setShowLecturerFail(false);
      setShowLecturerPass(false);
    } else if (action === "LECTURER PASS") {
      setShowLecturer(false);
      setShowResearch(false);
      setShowLecturerFail(false);
      setShowLecturerPass(true);
    } else if (action === "LECTURER FAIL") {
      setShowLecturer(false);
      setShowResearch(false);
      setShowLecturerPass(false);
      setShowLecturerFail(true);
    } else {
      setShowLecturer(false);
      setShowResearch(false);
      setShowLecturerPass(false);
      setShowLecturerFail(false);
    }
  };

  return (
    <Box>
      <Box>
        <Grid container p={5} spacing={5}>
          <Grid item xs={12} sm={4} md={3}>
            <Button
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                handleAction("LECTURER");
              }}
            >
              <TotalResearch
                data={totalResearch?.bySubject.countUser}
                title='Gi???ng vi??n'
                color='#C8FACD'
                colorIcon='#007B55'
                icon={<AccountBoxIcon fontSize='medium' />}
                styles={{ width: "100%" }}
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Button
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                handleAction("DOCUMENT");
              }}
            >
              <TotalResearch
                data={totalResearch?.bySubject.countUserResearch}
                title='Gi???ng vi??n tham gia nghi??n c???u'
                color='#D0F2FF'
                colorIcon='#04297A'
                icon={<TopicIcon fontSize='medium' />}
                styles={{ width: "100%" }}
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Button
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                handleAction("LECTURER PASS");
              }}
            >
              <TotalResearch
                data={totalResearch?.bySubject.countUserPass}
                title='Gi???ng vi??n ho??n th??nh nghi??n c???u'
                color='#FFF7CD'
                colorIcon='#7A4F01'
                icon={<BeenhereIcon fontSize='medium' />}
                styles={{ width: "100%" }}
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Button
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                handleAction("LECTURER FAIL");
              }}
            >
              <TotalResearch
                data={totalResearch?.bySubject.countUserFail}
                title='Gi???ng vi??n kh??ng ho??n th??nh nghi??n c???u'
                color='#FFE7D9'
                colorIcon='#7A0C2E'
                icon={<BackpackIcon fontSize='medium' />}
                styles={{ width: "100%" }}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
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
        ></Typography>
        <ExportButton data={data} fileName={fileName} />
      </Stack>
      <Grid container sx={{ marginBottom: 3 }} spacing={3}>
        <Grid item xs={6} md={2.2}>
          <Box>
            <Select
              labelId='list-year-label'
              id='list-year'
              displayEmpty
              fullWidth
              value={category}
              onChange={handleChangeCategory}
              renderValue={(category) => {
                if (category._id === "") {
                  return <small>L???a ch???n ????? t??i</small>;
                }
                return category.name;
              }}
            >
              {listCategory?.length > 0 ? (
                listCategory?.map((category, index) => (
                  <MenuItem
                    key={index}
                    value={{ _id: category._id, name: category.name }}
                  >
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled value=''></MenuItem>
              )}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6} md={2.2}>
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
                  return <small>L???a ch???n n??m h???c</small>;
                }
                return year;
              }}
            >
              {listSemester?.length > 0 ? (
                listSemester?.map((year, index) => (
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
        <Grid item xs={6} md={2.2}>
          <Box>
            <Select
              labelId='list-year-label'
              id='list-year'
              displayEmpty
              fullWidth
              value={hasStudent}
              onChange={handleChangeType}
              renderValue={(student) => {
                if (student.length === 0) {
                  return <small>Ch???n b??i nghi??n c???u</small>;
                }
                return "C?? sinh vi??n";
              }}
            >
              <MenuItem value={""}>
                <ListItemText primary={"To??n b???"} />
              </MenuItem>
              <MenuItem value={true}>
                <ListItemText primary={"C?? sinh vi??n"} />
              </MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6} md={2.2}>
          <Box height={"100%"} display='flex'>
            {removeFilter()}
          </Box>
        </Grid>
      </Grid>
      <StyledDataGrid
        ref={tableRef}
        rows={researchs}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        autoHeight={true}
        rowHeight={100}
        rowsPerPageOptions={[5, 10, 50]}
        pagination
      />
      <LecturerSubject
        openLecturer={showLecturer}
        setOpenLecturer={setShowLecturer}
        subjectId={info.subject_id[0]}
      />
      {showResearch && (
        <LecturerPassSubject
          openLecturer={showResearch}
          setOpenLecturer={setShowResearch}
          subjectId={info.subject_id[0]}
          year={year}
          option={""}
        />
      )}
      {showLecturerPass && (
        <LecturerPassSubject
          openLecturer={showLecturerPass}
          setOpenLecturer={setShowLecturerPass}
          subjectId={info.subject_id[0]}
          year={year}
          option={"pass"}
        />
      )}
      {showLecturerFail && (
        <LecturerPassSubject
          openLecturer={showLecturerFail}
          setOpenLecturer={setShowLecturerFail}
          subjectId={info.subject_id[0]}
          year={year}
          option={"fail"}
        />
      )}
    </Box>
  );
}

export default ReportBySubject;
