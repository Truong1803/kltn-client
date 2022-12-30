import React, { forwardRef, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Typography, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import LectureDetail from "../../Lecturers/LectureDetail";
import { formatDate } from "../../../Common/FormatDate/FormatDate";
import { getResearchByCaseAction } from "../../../redux/action/ResearchAction";
import { StyledDataGrid } from "../../../Common/DataGridCustom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ResearchSubject({
  openResearch,
  setOpenResearch,
  subjectId,
  year,
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
  const researchs = useSelector((state) => state.ResearchReducer);
  const getDataResearch = () => {
    dispatch(
      getResearchByCaseAction(
        "",
        subjectId._id,
        "",
        year,
        "",
        "",
        "",
        auth.accessToken
      )
    );
  };
  useEffect(() => {
    getDataResearch();
  }, [year]);

  const handleAction = (action, item) => {
    setItem(item);
    setAction(action);
    setIsOpen(false);
    setOpenDetail(true);
  };

  const renderChip = (item) => {
    if (item.status === true) {
      if (item.offer === "nomal") {
        return <Chip color='warning' label='Đã duyệt' />;
      } else if (item.offer === "offer") {
        return <Chip color='info' label='Đang đề xuất thưởng' />;
      } else if (item.offer === "pendding") {
        return <Chip color='primary' label='Đang chờ thanh toán' />;
      } else {
        return <Chip color='success' label='Đã thanh toán' />;
      }
    } else {
      return <Chip color='error' label='Chưa duyệt' />;
    }
  };
  const columns: GridColDef[] = [
    {
      field: "topic_name",
      headerName: "Tên bài nghiên cứu",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category_research_id",
      headerName: "Danh mục",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.name;
      },
    },
    {
      field: "department_id",
      headerName: "Khoa",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.name;
      },
    },
    {
      field: "subject_id",
      headerName: "Bộ môn",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.name;
      },
    },
    {
      field: "semester_id",
      headerName: " Kỳ học ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value.semester_name + " / " + params.value.year;
      },
    },
    {
      field: "approver",
      headerName: " Người duyệt ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.value?.name;
      },
    },

    {
      field: "author",
      headerName: "Tác giả",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        if (params.value.length <= 4) {
          return params.value.map((student) => {
            return student.name + " ";
          });
        }
        return `${params.value[0].name}...`;
      },
    },
    {
      field: "offer",
      headerName: "Trạng thái",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return renderChip(params.row);
      },
    },
    {
      field: "save_date",
      headerName: " Ngày lưu ",
      minWidth: 190,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return formatDate(params.value);
      },
    },
  ];
  return (
    <div>
      {data ? (
        <Dialog fullScreen open={openResearch} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                Danh sách bài nghiên cứu bộ môn{" "}
                {subjectId.name ? subjectId.name : ""}
              </Typography>
              <IconButton
                edge='start'
                color='inherit'
                onClick={() => {
                  setOpenResearch(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box>
            <div style={{ flex: 1 }}>
              <StyledDataGrid
                ref={tableRef}
                rows={researchs}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                autoHeight={true}
                rowsPerPageOptions={[5, 10, 50]}
                pagination
                rowHeight={100}
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
