import React, { forwardRef, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Grid,
  Link,
  Stack,
  Box,
  Button,
  Typography,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import LectureDetail from "../../Lecturers/LectureDetail";
import { getAllLecturerAction } from "../../../redux/action/LecturersAction";
import { getALLRankAction } from "../../../redux/action/RankAction";
import { getALLPositionAction } from "../../../redux/action/PositionAction";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function LecturerSubject({
  openLecturer,
  setOpenLecturer,
  subjectId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const lecturers = useSelector((state) => state.LectureReducer);
  const listSubject = useSelector((state) => state.SubjectReducer);
  const ranks = useSelector((state) => state.RankReducer);
  const positions = useSelector((state) => state.PositionReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);

  const handleDataLecturer = () => {
    if (subjectId._id) {
      dispatch(getAllLecturerAction("", subjectId._id, auth.accessToken));
    }
  };

  useEffect(() => {
    handleDataLecturer();
    dispatch(getALLPositionAction(auth.accessToken));
    dispatch(getALLRankAction(auth.accessToken));
  }, []);
  useEffect(() => {
    handleDataLecturer();
  }, []);

  const handleAction = (action, item) => {
    setItem(item);
    setAction(action);
    setIsOpen(false);
    setOpenDetail(true);
  };

  const renderPosition = (position_id) => {
    if (!position_id) {
      return " Chức vụ";
    }
    let position_name = "";
    if (positions.length > 0) {
      positions.map((position) => {
        if (position._id === position_id) {
          position_name = position.position_name;
        }
      });
    }
    return position_name;
  };
  const renderRank = (rank_id) => {
    if (!rank_id) {
      return "Trình độ";
    }
    let rank_name = "";
    if (ranks.length > 0) {
      ranks.map((rank) => {
        if (rank._id === rank_id) {
          rank_name = rank.rank_name;
        }
      });
    }
    return rank_name;
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      hide: true,
    },
    {
      field: "user",
      headerName: "Tài khoản",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.name;
      },
    },
    {
      field: "gmail",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "position_id",
      headerName: "Chức vụ",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return renderPosition(params.value._id);
      },
    },
    {
      field: "rank_id",
      headerName: "Trình độ",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return renderRank(params.value._id);
      },
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
          </>
        );
      },
    },
  ];
  return (
    <div>
      {data ? (
        <Dialog fullScreen open={openLecturer} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                Danh sách giảng viên bộ môn{" "}
                {subjectId.name ? subjectId.name : ""}
              </Typography>
              <IconButton
                edge='start'
                color='inherit'
                onClick={() => {
                  setOpenLecturer(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box>
            <div style={{ flex: 1 }}>
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
            <LectureDetail
              openDetail={openDetail}
              setOpenDetail={setOpenDetail}
              item={item}
              action={action}
            />
          </Box>
        </Dialog>
      ) : (
        <></>
      )}
    </div>
  );
}
