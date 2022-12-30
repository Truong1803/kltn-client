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
import {
  Button,
  Grid,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';

import ConfirmModal from '../../Common/Alert/Confirm';
import { StyledDataGrid } from '../../Common/DataGridCustom';
import { formatDate } from '../../Common/FormatDate/FormatDate';
import {
  deleteTaskAction,
  getTaskByCategoryAction,
} from '../../redux/action/TaskAction';
import TaskModal from './TaskModal';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CategoryResearchDetail({
  openDetail,
  setOpenDetail,
  item,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [actionTask, setActionTask] = useState("");
  const [itemTask, setItemTask] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState();
  const tableRef = useRef();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.TaskReducer);
  const auth = useSelector((state) => state.AuthReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);

  useEffect(() => {
    setData(item);
  }, [item]);
  useEffect(() => {
    if (data) {
      dispatch(getTaskByCategoryAction(data._id, auth.accessToken));
    }
  }, [data]);
  const handleAction = (actionTask, item) => {
    if (actionTask === "DELETE") {
      setItemTask(item);
      setOpenDelete(true);
      setIsOpen(false);
    } else if (actionTask === "VIEW") {
      setItemTask(item);
      setActionTask(actionTask);
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
      setActionTask(actionTask);
      setItemTask(item);
    }
  };
  const columns: GridColDef[] = [
    {
      field: "research_detail_name",
      headerName: "Mô tả",
      minWidth: 350,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "standard_time",
      headerName: "Thời gian nghiên cứu",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => params.value + " giờ",
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => formatDate(params.row),
    },
    {
      field: "action",
      headerAlign: "center",
      align: "center",
      headerName: "",
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {
        return (
          <>
            {permission?.map((itemPermission) => {
              if (itemPermission.permission === "EDIT TASK") {
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
              if (itemPermission.permission === "DELETE TASK") {
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
  return (
    <div>
      <Dialog fullScreen open={openDetail} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Thông Tin Danh mục {item.name}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpenDetail(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} sx={{ padding: 5 }}>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Tên đề tài: {item.name}</Typography>
          </Grid>

          <Grid item md={4} sm={6} xs={12}>
            <Typography>Số công việc thực hiện: {tasks.length}</Typography>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Typography>Ngày tạo: {formatDate(item.createdAt)}</Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        {permission?.map((itemPermission) => {
          if (itemPermission.permission === "CREATE TASK") {
            return (
              <Button
                variant="contained"
                color="primary"
                sx={(theme) => ({
                  width: "10%",
                  m: 2,
                  [theme.breakpoints.down("sm")]: {
                    width: "80%",
                  },
                })}
                size="medium"
                onClick={() => {
                  handleAction("ADD", item);
                }}
              >
                <AddIcon />
              </Button>
            );
          } else {
            return;
          }
        })}

        <div style={{ minHeight: 400, padding: 10 }}>
          <StyledDataGrid
            ref={tableRef}
            rows={tasks}
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
        <TaskModal
          isOpen={isOpen}
          action={actionTask}
          item={itemTask}
          setIsOpen={setIsOpen}
        />
        <ConfirmModal
          item={itemTask}
          deleteAction={deleteTaskAction}
          isOpen={openDelete}
          setAction={setActionTask}
          setIsOpen={setOpenDelete}
        />
      </Dialog>
    </div>
  );
}
