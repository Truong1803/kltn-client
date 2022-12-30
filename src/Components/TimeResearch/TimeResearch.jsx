import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TimeResearchModal from "./TimeReseachModal";
import {
  deleteRankAction,
  getALLRankAction,
} from "../../redux/action/RankAction";
import ConfirmModal from "../../Common/Alert/Confirm";

function TimeResearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const ranks = useSelector((state) => state.RankReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);

  const getDataRank = () => {
    dispatch(getALLRankAction(auth.accessToken));
  };
  useEffect(() => {
    getDataRank();
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

  const columns: GridColDef[] = [
    {
      field: "_id",
      hide: true,
    },
    {
      field: "rank_name",
      headerName: "Chức danh",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "time_research",
      headerName: "Thời gian nghiên cứu ",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.value + " giờ";
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
              if (itemPermission.permission === "EDIT RANK") {
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
              if (itemPermission.permission === "DELETE RANK") {
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
          if (itemPermission.permission === "CREATE RANK") {
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
        rows={ranks}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        autoHeight={true}
        rowsPerPageOptions={[5, 10, 50]}
        pagination
      />
      <TimeResearchModal
        handleAction={handleAction}
        isOpen={isOpen}
        action={action}
        item={item}
        setIsOpen={setIsOpen}
      />
      <ConfirmModal
        item={item}
        deleteAction={deleteRankAction}
        isOpen={openDelete}
        setAction={setAction}
        setIsOpen={setOpenDelete}
      />
    </Box>
  );
}

export default TimeResearch;
