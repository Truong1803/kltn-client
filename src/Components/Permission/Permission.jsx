import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import ConfirmModal from "../../Common/Alert/Confirm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deletePermissionAction,
  getAllPermissionAction,
} from "../../redux/action/PermissionAction";
import PermissionModal from "./PermissionModal";

function Permission() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const permissions = useSelector((state) => state.PermissionReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);

  const getDataPermission = () => {
    dispatch(getAllPermissionAction(auth.accessToken));
  };
  useEffect(() => {
    getDataPermission();
  }, []);

  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
      setContent(
        `Bạn có chắc muốn xoá quyền ${item.permission}. Khi xoá tất cả các tài khoản sẽ mất quyền này `
      );
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
      field: "permission",
      headerName: "Tên quyền",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "desc",
      headerName: "Mô tả",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.value;
      },
    },
    {
      field: "action",
      headerAlign: "center",
      align: "center",
      headerName: "",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "EDIT PERMISSION") {
                return (
                  <Button
                    variant='outlined'
                    onClick={() => handleAction("EDIT", params.row)}
                    color='primary'
                    sx={{
                      borderRadius: 0,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    }}
                  >
                    <Typography
                      variant='body2'
                      sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: { display: "none" },
                      })}
                    >
                      <EditIcon color='primary' />
                    </Typography>
                  </Button>
                );
              } else {
                return;
              }
            })}
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "DELETE PERMISSION") {
                return (
                  <Button
                    variant='outlined'
                    onClick={() => handleAction("DELETE", params.row)}
                    color='primary'
                    sx={{
                      borderRadius: 0,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    }}
                  >
                    <Typography
                      variant='body2'
                      sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: { display: "none" },
                      })}
                    >
                      <DeleteIcon color='primary' />
                    </Typography>
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
          Danh sách quyền
        </Typography>
        {permission.map((itemPermission) => {
          if (itemPermission.permission === "CREATE PERMISSION") {
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
      <DataGrid
        ref={tableRef}
        rows={permissions}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        autoHeight={true}
        rowsPerPageOptions={[5, 10, 50]}
        pagination
      />
      <PermissionModal
        isOpen={isOpen}
        action={action}
        item={item}
        setIsOpen={setIsOpen}
      />
      <ConfirmModal
        item={item}
        deleteAction={deletePermissionAction}
        setIsOpen={setOpenDelete}
        isOpen={openDelete}
        setAction={setAction}
        action={action}
        content={content}
      />
    </Box>
  );
}

export default Permission;
