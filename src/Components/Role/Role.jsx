import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmModal from "../../Common/Alert/Confirm";
import { withStyles } from "@mui/styles";

import {
  deleteRoleAction,
  getAllRoleAction,
} from "../../redux/action/RoleAction";
import RoleModal from "./RoleModal";
const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
      minHeight: "100vh",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      whiteSpace: "normal",
      minHeight: "100vh",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
      minHeight: "100vh",
    },
  },
})(DataGrid);
function Role() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [permission, setPermission] = useState([]);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const roles = useSelector((state) => state.RoleReducer);
  const permissions = useSelector((state) => state.CheckPermissionReducer);

  const getDataRole = () => {
    dispatch(getAllRoleAction(auth.accessToken));
  };
  useEffect(() => {
    getDataRole();
  }, []);
  useEffect(() => {
    setPermission(permissions);
  }, [permissions]);
  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
    } else if (action === "VIEW") {
      setIsOpen(!isOpen);
      setAction(action);
      setItem(item);
      setOpenDetail(!openDetail);
    } else {
      setIsOpen(!isOpen);
      setAction(action);
      setItem(item);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "_id",
      hide: true,
    },
    {
      field: "id_role",
      headerName: "Mã quyền",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "Tên quyền ",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "action",
      headerAlign: "center",
      align: "center",
      headerName: "",
      minWidth: 320,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant='outlined'
              onClick={() => handleAction("VIEW", params.row)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              disableElevation={true}
            >
              <VisibilityIcon color='primary' />
            </Button>
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "EDIT ROLE") {
                return (
                  <Button
                    variant='outlined'
                    onClick={() => handleAction("EDIT", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                    }}
                    disableElevation={true}
                  >
                    <EditIcon color='primary' />
                  </Button>
                );
              } else {
                return;
              }
            })}
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "DELETE ROLE") {
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
          Danh sách nhóm quyền
        </Typography>
        {permission.map((itemPermission) => {
          if (itemPermission.permission === "CREATE ROLE") {
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
      <StyledDataGrid
        ref={tableRef}
        rows={roles}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        autoHeight={true}
        rowsPerPageOptions={[5, 10, 50]}
        pagination
      />
      <RoleModal
        handleAction={handleAction}
        isOpen={isOpen}
        action={action}
        item={item}
        setIsOpen={setIsOpen}
      />
      <ConfirmModal
        item={item}
        deleteAction={deleteRoleAction}
        isOpen={openDelete}
        setAction={setAction}
        setIsOpen={setOpenDelete}
      />
    </Box>
  );
}

export default Role;
