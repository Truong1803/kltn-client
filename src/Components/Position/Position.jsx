import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PositionModal from "./PositionModal";
import ConfirmModal from "../../Common/Alert/Confirm";
import {
  deletePositionAction,
  getALLPositionAction,
} from "../../redux/action/PositionAction";

function Position() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [hideCol, setHideCol] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const positions = useSelector((state) => state.PositionReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);

  const getDataPositions = () => {
    dispatch(getALLPositionAction(auth.accessToken));
  };
  useEffect(() => {
    getDataPositions();
    checkHideCol();
  }, []);

  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
      setAction(action);
      setItem(item);
    }
  };
  const checkHideCol = () => {
    if (permission && permission.length > 0) {
      permission.filter((itemPermission) => {
        if (
          itemPermission.permission === "EDIT POSITION" ||
          itemPermission.permission === "DELETE POSITION"
        ) {
          setHideCol(true);
        } else {
          setHideCol(false);
        }
      });
    }
  };
  const columns: GridColDef[] = [
    {
      field: "_id",
      hide: true,
    },
    {
      field: "position_name",
      headerName: "Tên chức vụ",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "reduced",
      headerName: " Số giờ nghiên cứu được giảm ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (params.value || 0) + " %";
      },
    },
    {
      field: "action",
      headerAlign: "center",
      align: "center",
      headerName: "",
      hide: hideCol,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "EDIT POSITION") {
                return (
                  <Button
                    onClick={() => handleAction("EDIT", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
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
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "DELETE POSITION") {
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
          Danh sách định mức nghiên cứu
        </Typography>

        {permission.map((itemPermission) => {
          if (itemPermission.permission === "CREATE POSITION") {
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
        rows={positions}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        autoHeight={true}
        rowsPerPageOptions={[5, 10, 50]}
        pagination
      />
      <PositionModal
        handleAction={handleAction}
        isOpen={isOpen}
        action={action}
        item={item}
        setIsOpen={setIsOpen}
      />
      <ConfirmModal
        item={item}
        deleteAction={deletePositionAction}
        isOpen={openDelete}
        setAction={setAction}
        setIsOpen={setOpenDelete}
      />
    </Box>
  );
}

export default Position;
