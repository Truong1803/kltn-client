import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { formatDate } from "../../Common/FormatDate/FormatDate";
import { getResearchByCaseAction } from "../../redux/action/ResearchAction";
import ApproveResearchDetail from "../ApproveResearch/ApproveResearchDetail";
import ResearchModal from "./ManageResearchModal";

function ManagerResearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [listSemester, setListSemester] = useState([]);
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState({ _id: "", name: "" });
  const [department, setDepartment] = useState({ _id: "", name: "" });
  const [category, setCategory] = useState({ _id: "", name: "" });
  const [hasStudent, setHasStudent] = useState("");
  const [listResearch, setListResearch] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const researchs = useSelector((state) => state.ResearchReducer);
  const [semesters, setSemester] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const permission = useSelector((state) => state.CheckPermissionReducer);
  const roles = useSelector((state) => state.RoleReducer);

  const getDataResearch = () => {
    dispatch(
      getResearchByCaseAction(
        "",
        subject._id,
        department._id,
        year,
        category._id,
        true,
        hasStudent,
        auth.accessToken
      )
    );
  };

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
  useEffect(async () => {
    const data = await Promise.all([
      GET("semester", auth.accessToken),
      GET("department", auth.accessToken),
      GET("category-research", auth.accessToken),
    ]);

    setSemester(data[0].data.semesters);
    setListDepartment(data[1].data.data);
    setListCategory(data[2].data.categorys);
  }, []);
  useEffect(async () => {
    getDataResearch();
  }, [department, subject, year, category, hasStudent]);

  useEffect(() => {
    if (researchs) {
      if (researchs.length > 0) {
        researchs.filter((research) => {
          research["author"] = research.auth_lecture.concat(
            research.auth_student
          );
        });
        setListResearch(researchs);
      } else {
        setListResearch([]);
      }
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
      category._id !== "" ||
      subject._id !== "" ||
      department._id !== "" ||
      year !== "" ||
      hasStudent != ""
    ) {
      return (
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            setCategory({ _id: "", name: "" });
            setDepartment({ _id: "", name: "" });
            setSubject({ _id: "", name: "" });
            setYear("");
            setHasStudent("");
          }}
        >
          Xoá lọc
        </Button>
      );
    }
  };

  const handleAction = (action, item) => {
    if (action === "VIEW") {
      setOpenDetail(true);
      setAction(action);
      setItem(item);
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleChangeType = (event) => {
    const {
      target: { value },
    } = event;
    setHasStudent(value);
  };
  const renderChip = (item) => {
    if (item.status === true) {
      if (item.offer === "nomal") {
        return <Chip color='warning' label='Đã duyệt' />;
      } else if (item.offer === "offer") {
        return <Chip color='info' label='Đang đề xuất thưởng' />;
      } else if (item.offer === "pendding") {
        return <Chip color='primary' label='Đang chờ thanh toán' />;
      } else {
        return <Chip color='success' label='Đã thanh toán' />;
      }
    } else {
      return <Chip color='error' label='Chưa duyệt' />;
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
      valueGetter: (params) => {
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
      valueGetter: (params) => {
        return params.value.semester_name + " / " + params.value.year;
      },
    },

    {
      field: "author",
      headerName: "Tác giả",
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
      field: "approver",
      headerName: " Người duyệt ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value?.name || "";
      },
    },
    {
      field: "save_date",
      headerName: " Ngày lưu ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return formatDate(params.value) || "";
      },
    },
    {
      field: "offer",
      headerName: "Trạng thái",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return renderChip(params.row);
      },
      valueGetter: (params) => {
        if (params.value === "nomal") {
          return "đã duyệt";
        }
        if (params.value === "offer") {
          return "đề xuất thanh toán";
        }
        if (params.value === "paid") {
          return "đã thanh toán";
        }
        if (params.value === "pendding") {
          return "đã duyệt thanh toán";
        }
        return params.value;
      },
    },
    {
      field: "action",
      headerName: "",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleAction("VIEW", params.row)}
            disableElevation={true}
            variant='outlined'
          >
            <VisibilityIcon color='primary' />
          </Button>
        );
      },
    },
  ];

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
          Danh sách bài nghiên cứu
        </Typography>
        {permission.map((itemPermission) => {
          if (
            itemPermission.permission === "CREATE DOCUMENT" &&
            roles.id_role !== "TK"
          ) {
            return (
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  handleAction("ADD", "");
                }}
              >
                <AddIcon />
              </Button>
            );
          } else {
            return;
          }
        })}
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
                  return <small>Lựa chọn đề tài</small>;
                }
                return category.name;
              }}
            >
              {listCategory?.length > 0 ? (
                listCategory.map((category, index) => (
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
              value={department}
              onChange={handleChangeDepartment}
              renderValue={(department) => {
                if (department && department._id === "") {
                  return <small>Lựa chọn khoa</small>;
                }
                return department.name;
              }}
            >
              {listDepartment?.length > 0 ? (
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
        <Grid item xs={6} md={2.2}>
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
              {listSubject?.length > 0 ? (
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
                  return <small>Chọn bài nghiên cứu</small>;
                }
                return "Có sinh viên";
              }}
            >
              <MenuItem value={""}>
                <ListItemText primary={"Toàn bộ"} />
              </MenuItem>
              <MenuItem value={true}>
                <ListItemText primary={"Có sinh viên"} />
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
      <Box style={{ flex: 1 }}>
        <StyledDataGrid
          ref={tableRef}
          rows={listResearch}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          autoHeight={true}
          rowHeight={75}
          rowsPerPageOptions={[5, 10, 50]}
          pagination
        />
      </Box>
      {openDetail && (
        <ApproveResearchDetail
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
          item={item}
          action={action}
        />
      )}
      {isOpen && (
        <ResearchModal
          isOpen={isOpen}
          action={action}
          item={item}
          setIsOpen={setIsOpen}
        />
      )}
    </Box>
  );
}

export default ManagerResearch;
