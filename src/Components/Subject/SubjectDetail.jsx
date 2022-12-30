import React, { forwardRef, useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";

import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Grid, Stack } from "@mui/material";
import { formatDate } from "../../Common/FormatDate/FormatDate";
import { useDispatch, useSelector } from "react-redux";
import { getAllLecturerAction } from "../../redux/action/LecturersAction";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function SubjectDetail({ openDetail, setOpenDetail, item }) {
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState();
  const tableRef = useRef();
  const dispatch = useDispatch();
  const lecturers = useSelector((state) => state.LectureReducer);
  const auth = useSelector((state) => state.AuthReducer);
  const ranks = useSelector((state) => state.RankReducer);
  useEffect(() => {
    setData(item);
  }, [item]);
  useEffect(() => {
    if (data) {
      dispatch(
        getAllLecturerAction(data.department_id._id, data._id, auth.accessToken)
      );
    }
  }, [data]);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex:1,minWidth: 100,
      headerAlign: "center",
      align: "center",
      hide: true,
    },
    {
      field: "user",
      headerName: "Tài khoản",
      flex:1,minWidth: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} />
            <Typography>{params.row.name}</Typography>
          </>
        );
      },
    },
    {
      field: "gmail",
      headerName: "Email",
      flex:1,minWidth: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rank_id",
      headerName: "Trình độ",
      flex:1,minWidth: 220,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.rank_name;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      flex:1,minWidth: 220,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => formatDate(params.row),
    },
  ];
  return (
    <div>
      <Dialog fullScreen open={openDetail} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Thông Tin Bộ Môn {item.name}
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => {
                dispatch(getAllLecturerAction("", "", auth.accessToken));
                setOpenDetail(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} sx={{ padding: 5 }}>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Mã Bộ Môn: {item.id}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Tên Bộ Môn: {item.name}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Stack direction='row' spacing={1}>
              <Typography>Trưởng Bộ Môn:</Typography>
              <Avatar
                sx={{ width: 23, height: 23 }}
                src={item.manager_id?.avatar}
              />
              <Typography>{item.manager_id?.name}</Typography>
            </Stack>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Số giảng viên quản lý: {lecturers.length}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Khoa quản lý: {item.department_id?.name}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Ngày tạo: {formatDate(item.createdAt)}</Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <div style={{ flex: 1, padding: 10 }}>
          <DataGrid
            ref={tableRef}
            rows={lecturers}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            autoHeight={true}
            rowsPerPageOptions={[5, 10, 50]}
            pagination
          />
        </div>
      </Dialog>
    </div>
  );
}
