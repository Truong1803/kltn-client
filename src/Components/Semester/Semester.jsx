import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import ConfirmModal from "../../Common/Alert/Confirm";
import SemesterModal from "./SemesterModal";
import {
  deleteSemesterAction,
  getALLSemesterAction,
} from "../../redux/action/SemesterAction";
import { formatDate } from "../../Common/FormatDate/FormatDate";
function Semester() {
  const [isOpen, setIsOpen] = useState(false);
  const [preSemester, setPreSemester] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const semesters = useSelector((state) => state.SemesterReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);
  useEffect(() => {
    setPreSemester(semesters);
  }, [semesters]);

  const getDataRank = () => {
    dispatch(getALLSemesterAction(auth.accessToken));
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
  const renderStatus = (myValue) => {
    if (myValue === 1) {
      return <Chip label={"chưa diễn ra"} variant='outlined' />;
    } else if (myValue === 2) {
      return (
        <Chip label={"đang diễn ra"} variant='outlined' color={"success"} />
      );
    } else {
      return <Chip label={"đã kết thúc"} variant='outlined' color={"error"} />;
    }
  };
  const columns: GridColDef[] = [
    {
      field: "_id",
      hide: true,
    },
    {
      field: "semester_name",
      headerName: "Tên học kỳ",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "year",
      headerName: "Năm học ",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.value;
      },
    },
    {
      field: "startDate",
      headerName: "Ngày bắt đầu",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "endDate",
      headerName: "Ngày kết thúc",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return formatDate(params.value);
      },
    },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return renderStatus(params.value);
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
          Danh sách học kỳ
        </Typography>
        {permission.map((itemPermission) => {
          if (itemPermission.permission === "CREATE SEMESTER") {
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
        rows={preSemester}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        autoHeight={true}
        rowsPerPageOptions={[5, 10, 50]}
        pagination
      />
      <SemesterModal
        isOpen={isOpen}
        action={action}
        item={item}
        setIsOpen={setIsOpen}
      />
      <ConfirmModal
        item={item}
        deleteAction={deleteSemesterAction}
        isOpen={openDelete}
        setAction={setAction}
        setIsOpen={setOpenDelete}
      />
    </Box>
  );
}

export default Semester;
