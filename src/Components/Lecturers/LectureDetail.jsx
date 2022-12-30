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
import { Avatar, Grid, Stack, Button } from "@mui/material";
import { formatDate } from "../../Common/FormatDate/FormatDate";
import { useDispatch, useSelector } from "react-redux";
import { getRoleByPositionAction } from "../../redux/action/RoleAction";
import { getResearchByUserIdAction } from "../../redux/action/ResearchAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ApproveResearchDetail from "../ApproveResearch/ApproveResearchDetail";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function LectureDetail({
  openDetail,
  setOpenDetail,
  item,
  action,
  view,
}) {
  const [pageSize, setPageSize] = useState(5);
  const [pageSizePer, setPageSizePer] = useState(5);
  const [permissionsId, setPermissionsId] = useState("");
  const [permission, setPermission] = useState([]);
  const [openD, setOpenD] = useState(false);
  const [actionD, setActionD] = useState("");
  const [data, setData] = useState("");
  const tableRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const listResearch = useSelector((state) => state.ResearchReducer);
  const listPermission = useSelector((state) => state.CheckPermissionReducer);
  const info = useSelector((state) => state.UserAuthReducer);
  const roles = useSelector((state) => state.RoleReducer);
  const getDataResearchById = (userId) => {
    dispatch(getResearchByUserIdAction(userId, auth.accessToken));
  };
  useEffect(() => {
    if (item) {
      getDataResearchById(item._id);
      setPermissionsId(item.role);
    }
  }, [item]);
  useEffect(() => {
    if (permissionsId && action === "VIEW") {
      dispatch(getRoleByPositionAction(permissionsId, auth.accessToken));
    }
  }, [item, action, permissionsId]);
  useEffect(() => {
    if (listPermission) {
      setPermission(listPermission);
    }
  }, [item, listPermission]);

  const getYourPermission = () => {
    if (info.role) {
      dispatch(getRoleByPositionAction(info.role, auth.accessToken));
    }
  };
  const handleAction = (action, item) => {
    setData(item);
    setActionD(action);
    setOpenD(true);
  };
  const columns: GridColDef[] = [
    {
      field: "topic_name",
      headerName: "Tên bài nghiên cứu",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category_research_id",
      headerName: "Loại danh mục",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.value.name,
    },
    {
      field: "semester_id",
      headerName: "Học kỳ",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.value.semester_name + " năm học " + params.value.year,
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
        );
      },
    },
  ];
  const columnsPermission: GridColDef[] = [
    {
      field: "permission",
      headerName: "Tên quyền",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.value,
    },
    {
      field: "desc",
      headerName: "Mô tả",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.value,
    },
  ];
  return (
    <div>
      <Dialog fullScreen open={openDetail} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Thông Tin Giảng Viên {item.name}
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => {
                setOpenDetail(false);
                getYourPermission();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} sx={{ padding: 5 }}>
          <Grid item md={4} sm={6} xs={12}>
            <Stack direction='row' spacing={1}>
              <Typography>Họ tên:</Typography>
              <Avatar sx={{ width: 23, height: 23 }} src={item.avatar} />
              <Typography>{item.name}</Typography>
            </Stack>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Ngày sinh: {formatDate(item.dob)}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Email: {item.gmail}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Giới tính: {item.gender}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>
              Khoa / bộ môn quản lý:
              {item.department_id?.name + "/ " + item.subject_id?.name}
            </Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Trình độ: {item.rank_id?.rank_name}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Chức vụ: {item.position_id?.position_name}</Typography>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <div style={{ flex: 1, padding: 10 }}>
          <DataGrid
            ref={tableRef}
            rows={listResearch}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            autoHeight={true}
            rowsPerPageOptions={[5, 10, 50]}
            pagination
          />
          {view && view === "admin" ? (
            <>
              <Typography
                sx={{ mt: 5, mb: 3, flex: 1 }}
                variant='h6'
                component='div'
              >
                Danh sách các quyền sở hữu
              </Typography>
              <DataGrid
                ref={tableRef}
                rows={permission}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                columns={columnsPermission}
                pageSize={pageSizePer}
                onPageSizeChange={(newPage) => setPageSizePer(newPage)}
                autoHeight={true}
                rowsPerPageOptions={[5, 10, 50]}
                pagination
              />
            </>
          ) : (
            <></>
          )}
          {openD && (
            <ApproveResearchDetail
              openDetail={openD}
              setOpenDetail={setOpenD}
              item={data}
              action={actionD}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
}
