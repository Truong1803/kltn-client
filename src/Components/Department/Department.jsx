import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import ConfirmModal from "../../Common/Alert/Confirm";
import { formatDate } from "../../Common/FormatDate/FormatDate";
import {
  deleteDepartmentAction,
  getAllDepartmentAction,
} from "../../redux/action/DepartmentAction";
import { getAllLecturerAction } from "../../redux/action/LecturersAction";
import { getRoleByPositionAction } from "../../redux/action/RoleAction";
import DepartmentDetail from "./DepartmentDetail";
import DepartmentModal from "./DepartmentModal";

function Department() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const departments = useSelector((state) => state.DepartmentReducer);
  const lecturers = useSelector((state) => state.LectureReducer);
  const auth = useSelector((state) => state.AuthReducer);
  const info = useSelector((state) => state.UserAuthReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);
  const [dataDepartment, setDataDepartment] = useState();
  const [hideCol, setHideCol] = useState(false);

  const getDataLecturer = () => {
    dispatch(getAllLecturerAction("", "", auth.accessToken));
  };
  const getDataDepartment = () => {
    dispatch(getAllDepartmentAction(auth.accessToken));
    dispatch(getRoleByPositionAction(info.role, auth.accessToken));
  };
  useEffect(() => {
    getDataDepartment();
    getDataLecturer();
  }, []);
  useEffect(() => {
    setDataDepartment(departments);
  }, [departments]);

  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
      setOpenDetail(false);
    } else if (action === "VIEW") {
      setItem(item);
      setAction(action);
      setIsOpen(false);
      setOpenDetail(true);
    } else {
      setIsOpen(!isOpen);
      setAction(action);
      setItem(item);
      setOpenDetail(false);
    }
  };
  const renderNameLeader = (item) => {
    let lectureName = "";
    if (lecturers?.length > 0) {
      lecturers?.map((lecturer) => {
        if (lecturer._id === item) {
          lectureName = lecturer.name;
        }
      });
    }
    return lectureName;
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã khoa",
      minWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên khoa",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "number_subject",
      headerName: "Số bộ môn ",
      minWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => formatDate(params.row),
    },
    {
      field: "manager_id",
      headerName: "Trưởng khoa",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return renderNameLeader(params.value._id);
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
            {permission?.map((itemPermission) => {
              if (itemPermission.permission === "EDIT DEPARTMENT") {
                return (
                  <Button
                    onClick={() => handleAction("EDIT", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
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
            {permission?.map((itemPermission) => {
              if (itemPermission.permission === "DELETE DEPARTMENT") {
                return (
                  <Button
                    onClick={() => handleAction("DELETE", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
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
          Danh sách khoa
        </Typography>
        {permission?.map((itemPermission) => {
          if (itemPermission.permission === "CREATE DEPARTMENT") {
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
      <div style={{ flex: 1 }}>
        <DataGrid
          ref={tableRef}
          rows={dataDepartment}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          autoHeight={true}
          rowsPerPageOptions={[5, 10, 50]}
          pagination
        />
      </div>
      {isOpen && (
        <DepartmentModal
          handleAction={handleAction}
          isOpen={isOpen}
          action={action}
          item={item}
          lecturers={lecturers}
          setIsOpen={setIsOpen}
        />
      )}
      {openDetail && (
        <DepartmentDetail
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
          item={item}
          renderNameLeader={renderNameLeader}
          lecturers={lecturers}
          departments={departments}
        />
      )}
      {openDelete && (
        <ConfirmModal
          item={item}
          deleteAction={deleteDepartmentAction}
          isOpen={openDelete}
          setAction={setAction}
          setIsOpen={setOpenDelete}
        />
      )}
    </Box>
  );
}

export default Department;
