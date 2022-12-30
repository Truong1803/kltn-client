import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Avatar,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

import ConfirmModal from '../../Common/Alert/Confirm';
import { formatDate } from '../../Common/FormatDate/FormatDate';
import { getAllDepartmentAction } from '../../redux/action/DepartmentAction';
import {
  deleteSubjectAction,
  getSubjectByDepartmentAction,
} from '../../redux/action/SubjectAction';
import SubjectDetail from '../Subject/SubjectDetail';
import SubjectModalByDepartment from './Subject/SubjectModalByDepartment';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DepartmentDetail({
  openDetail,
  setOpenDetail,
  item,
  renderNameLeader,
  lecturers,
  departments,
}) {
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState(item);
  const tableRef = useRef();
  const dispatch = useDispatch();
  const [openDetailSub, setOpenDetailSub] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState("");
  const [dataSub, setDataSub] = useState("");
  const subjects = useSelector((state) => state.SubjectReducer);
  const auth = useSelector((state) => state.AuthReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);
  const [hideCol, setHideCol] = useState(false);

  useEffect(() => {
    if (item._id) {
      dispatch(getSubjectByDepartmentAction(item._id, auth.accessToken));
    }
    setData(item);
  }, [item]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã bộ môn",
      minWidth: 120,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên bộ môn",
      minWidth: 220,
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
      headerName: "Trưởng bộ môn",
      minWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return renderNameLeader(params.value._id);
      },
    },
    {
      field: "action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerName: "",
      minWidth: 320,
      hide: hideCol,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => handleAction("VIEWSUB", params.row)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
              disableElevation={true}
              variant="outlined"
            >
              <VisibilityIcon color="primary" />
            </Button>
            {permission?.map((itemPermission) => {
              if (itemPermission.permission === "EDIT SUBJECT") {
                return (
                  <Button
                    onClick={() => handleAction("EDIT", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
                    }}
                    disableElevation={true}
                    variant="outlined"
                  >
                    <EditIcon color="primary" />
                  </Button>
                );
              } else {
                return;
              }
            })}
            {permission?.map((itemPermission) => {
              if (itemPermission.permission === "DELETE SUBJECT") {
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
                    variant="outlined"
                  >
                    <DeleteIcon color="primary" />
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
  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setDataSub(item);
      setOpenDelete(true);
      setIsOpen(false);
    } else if (action === "VIEWSUB") {
      setDataSub(item);
      setAction(action);
      setIsOpen(false);
      setOpenDetailSub(!openDetailSub);
    } else {
      setIsOpen(!isOpen);
      setAction(action);
      setDataSub(item);
    }
  };
  return (
    <div>
      <Dialog fullScreen open={openDetail} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thông Tin Khoa {item.name}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpenDetail(false);
                dispatch(getAllDepartmentAction(auth.accessToken));
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} sx={{ padding: 5 }}>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Mã Khoa: {item.id}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Tên Khoa: {item.name}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Stack direction="row" spacing={1}>
              <Typography>Trưởng Khoa:</Typography>
              <Avatar
                sx={{ minWidth: 23, minHeight: 23 }}
                src={item.manager_id?.avatar}
              />
              <Typography>{item.manager_id?.name}</Typography>
            </Stack>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Số bộ môn quản lý: {item.number_subject}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Ngày tạo: {formatDate(item.createdAt)}</Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Box m={2}>
          {permission?.map((itemPermission) => {
            if (itemPermission.permission === "CREATE SUBJECT") {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleAction("ADD", "");
                  }}
                >
                  <AddIcon />
                  <Typography
                    variant="p"
                    sx={(theme) => ({
                      [theme.breakpoints.down("sm")]: { display: "none" },
                    })}
                  >
                    Thêm mới
                  </Typography>
                </Button>
              );
            } else {
              return;
            }
          })}
        </Box>
        <div style={{ flex: 1, padding: 10 }}>
          <DataGrid
            ref={tableRef}
            rows={subjects}
            disableSelectionOnClick
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            autoHeight={true}
            rowsPerPageOptions={[5, 10, 50]}
            pagination
          />
        </div>
        <SubjectModalByDepartment
          handleAction={handleAction}
          isOpen={isOpen}
          action={action}
          item={dataSub}
          lecturers={lecturers}
          setIsOpen={setIsOpen}
          departments={item}
        />
        {action === "VIEWSUB" ? (
          <SubjectDetail
            openDetail={openDetailSub}
            setOpenDetail={setOpenDetailSub}
            item={dataSub}
          />
        ) : (
          <></>
        )}
        <ConfirmModal
          item={dataSub}
          deleteAction={deleteSubjectAction}
          isOpen={openDelete}
          setAction={setAction}
          setIsOpen={setOpenDelete}
        />
      </Dialog>
    </div>
  );
}
