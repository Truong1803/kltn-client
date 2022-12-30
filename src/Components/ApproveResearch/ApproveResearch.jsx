import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import AccessModal from "../../Common/Alert/Acess";
import ConfirmModal from "../../Common/Alert/Confirm";
import { StyledDataGrid } from "../../Common/DataGridCustom";
import {
  deleteResearchAction,
  getResearchByCaseAction,
  researchApproveAction,
} from "../../redux/action/ResearchAction";
import ApproveResearchDetail from "./ApproveResearchDetail";
import EditIcon from "@mui/icons-material/Edit";
import ManageResearchModal from "../ManageResearch/ManageResearchModal";
function ApproveResearch() {
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [content, setContent] = useState("");
  const [method, setMethod] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [hasStudent, setHasStudent] = useState("");
  const [listSemester, setListSemester] = useState([]);
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState({ _id: "", name: "" });
  const [department, setDepartment] = useState({ _id: "", name: "" });
  const [category, setCategory] = useState({ _id: "", name: "" });
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

  const getDataResearch = () => {
    dispatch(
      getResearchByCaseAction(
        "nomal",
        subject._id,
        department._id,
        year,
        category._id,
        "false",
        hasStudent,
        auth.accessToken
      )
    );
  };
  useEffect(() => {
    getDataResearch();
  }, [department, subject, year, category, hasStudent]);

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
  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setAction(action);
      setOpenDetail(false);
    } else if (action === "APPROVE") {
      setAction(action);
      setIsOpen(true);
      setContent(item.topic_name);
      setMethod();
      setItem(item);
    } else if (action === "EDIT") {
      setItem(item);
      setAction(action);
      setOpenEdit(true);
    } else {
      setOpenDetail(true);
      setAction(action);
      setItem(item);
    }
  };
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
  const handleChangeType = (event) => {
    const {
      target: { value },
    } = event;
    setHasStudent(value);
  };
  const columns: GridColDef[] = [
    {
      field: "topic_name",
      headerName: "Tên bài nghiên cứu",
      minWidth: 320,
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
      valueGetter: (params) => {
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
        return params.value.map((author) => {
          return author.name + " ";
        });
      },
    },
    {
      field: "action",
      headerAlign: "center",
      align: "center",
      headerName: "",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => handleAction("VIEW", params.row)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              disableElevation={true}
              variant='outlined'
            >
              <VisibilityIcon color='primary' />
            </Button>

            {permission.map((itemPermission) => {
              if (itemPermission.permission === "DELETE DOCUMENT") {
                return (
                  <Button
                    onClick={() => handleAction("DELETE", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                    }}
                    disableElevation={true}
                    variant='outlined'
                  >
                    <DeleteIcon color='primary' />
                  </Button>
                );
              } else {
                return;
              }
            })}
            {permission?.map((itemPermission) => {
              if (itemPermission.permission === "APPROVE DOCUMENT") {
                return (
                  <Button
                    onClick={() => handleAction("APPROVE", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                    disableElevation={true}
                    variant='outlined'
                  >
                    <CheckIcon color='primary' />
                  </Button>
                );
              } else {
                return;
              }
            })}
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "EDIT DOCUMENT") {
                return (
                  <Button
                    onClick={() => handleAction("EDIT", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                    disableElevation={true}
                    variant='outlined'
                  >
                    <EditIcon color='primary' />
                  </Button>
                );
              } else {
                return;
              }
            })}
          </>
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
          Danh sách bài nghiên cứu đang chờ duyệt
        </Typography>
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
                  return <small>Lựa chọn năm học</small>;
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
      <Box>
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
        <AccessModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          action={action}
          item={item}
          title={"duyệt bài nghiên cứu"}
          content={content}
          method={method}
          putAction={researchApproveAction}
        />
      )}
      <ConfirmModal
        item={item}
        deleteAction={deleteResearchAction}
        setIsOpen={setOpenDelete}
        isOpen={openDelete}
        setAction={setAction}
        action={action}
      />
      {openEdit && (
        <ManageResearchModal
          isOpen={openEdit}
          action={action}
          item={item}
          setIsOpen={setOpenEdit}
        />
      )}
    </Box>
  );
}

export default ApproveResearch;
