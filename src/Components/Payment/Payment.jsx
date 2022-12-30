import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../../Common/Alert/Confirm";
import PaymentModal from "./PaymentModal";
import {
  deletePaymentAction,
  getALLPaymentAction,
} from "../../redux/action/PaymentAction";
import { formatDate, formatMoney } from "../../Common/FormatDate/FormatDate";
import { StyledDataGrid } from "../../Common/DataGridCustom";

function Payment() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [hideCol, setHideCol] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const rewards = useSelector((state) => state.PaymentReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);
  const getDataRank = () => {
    dispatch(getALLPaymentAction(auth.accessToken));
  };
  useEffect(() => {
    getDataRank();
  }, []);
  useEffect(() => {
    checkHideCol();
  }, [permission]);

  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
    } else if (action === "VIEW") {
      setItem(item);
      setAction(action);
      setIsOpen(false);
      setOpenDetail(!openDetail);
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
          itemPermission.permission === "EDIT REWARD" ||
          itemPermission.permission === "DELETE REWARD"
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
      field: "reward_name",
      headerName: "Loại danh mục",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Mức thưởng ",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return formatMoney(params.value) + " VND";
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "updatedAt",
      headerName: "Ngày thay đổi ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "action",
      headerAlign: "center",
      align: "center",
      headerName: "",
      hide: hideCol,
      minWidth: 320,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {permission.map((itemPermission) => {
              if (itemPermission.permission === "EDIT REWARD") {
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
              if (itemPermission.permission === "DELETE REWARD") {
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
          Danh sách mức thưởng nghiên cứu
        </Typography>
        {permission.map((itemPermission) => {
          if (itemPermission.permission === "CREATE REWARD") {
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
        rows={rewards}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        autoHeight={true}
        rowsPerPageOptions={[5, 10, 50]}
        pagination
      />
      <PaymentModal
        handleAction={handleAction}
        isOpen={isOpen}
        action={action}
        item={item}
        setIsOpen={setIsOpen}
      />
      <ConfirmModal
        item={item}
        deleteAction={deletePaymentAction}
        isOpen={openDelete}
        setAction={setAction}
        setIsOpen={setOpenDelete}
      />
    </Box>
  );
}

export default Payment;
