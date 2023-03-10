import React, { forwardRef, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Avatar, Grid, Link, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { formatDate, formatMoney } from "../../Common/FormatDate/FormatDate";
import { getAllLecturerAction } from "../../redux/action/LecturersAction";
import { getALLRankAction } from "../../redux/action/RankAction";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ApproveResearchDetail({
  openDetail,
  setOpenDetail,
  item,
  action,
  report,
}) {
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState();
  const tableRef = useRef();
  const dispatch = useDispatch();
  const lecturers = useSelector((state) => state.LectureReducer);

  const auth = useSelector((state) => state.AuthReducer);
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    setData(item);
  }, [item]);

  useEffect(() => {
    dispatch(getAllLecturerAction("", "", auth.accessToken));
    dispatch(getALLRankAction(auth.accessToken));
  }, []);
  useEffect(() => {
    getInfoAuthor(item.auth_lecture, item.auth_student);
  }, [lecturers]);

  const getInfoAuthor = (idLecture, idStudent) => {
    let Lecture = [];
    let Students = [];
    idLecture?.map((item) => {
      lecturers?.filter((lecturer) => {
        if (item.lecture === lecturer._id) {
          Lecture.push(lecturer);
        }
      });
    });
    if (idStudent?.length > 0) {
      idStudent?.map((student, index) => {
        let item = {
          _id: index,
          gmail: "",
          password:
            "$2b$10$pE2hn8jFem71IRN9YKuC6e6GlWL6YDPjkPfOjn6mDhEq8ZERFZBMi",
          name: student.name,
          avatar:
            "https://res.cloudinary.com/truongdev/image/upload/v1642950079/KLTN/i4eqyenirxpgp8zexcxv.jpg",
          is_active: false,
          createdAt: "2022-05-06T11:20:13.800Z",
          id: student.id,
          rank_id: "",
        };
        Students.push(item);
      });
    }
    setAuthor(Lecture.concat(Students));
  };
  const itemUnit = (title) => {
    return (
      <Grid item md={4} sm={6} xs={12}>
        <Typography> {title + data.unit}</Typography>
      </Grid>
    );
  };
  const renderUnit = () => {
    if (data.research_detail_id?.id === "BC04") {
      return itemUnit("S??? gi??? tr??nh b??y: ");
    }
    if (data.research_detail_id?.id === "BC05") {
      return itemUnit("S??? gi??? tham d???: ");
    }
    if (data.research_detail_id?.id === "BC06") {
      return itemUnit("S??? t??n ch???:");
    }
    if (data.research_detail_id?.id === "VS01") {
      return itemUnit("S??? trang: ");
    }
    if (data.research_detail_id?.id === "VS02") {
      return itemUnit("S??? t??n ch???: ");
    }
    if (data.research_detail_id?.id === "VS03") {
      return itemUnit("S??? t??n ch???: ");
    } else {
      return "";
    }
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "user",
      headerName: "Gi???ng vi??n / Sinh vi??n",
      flex: 1,
      minWidth: 200,
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
      flex: 1,
      minWidth: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rank_id",
      headerName: "Tr??nh ?????",
      flex: 1,
      minWidth: 220,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        return params.value.rank_name || "Sinh vi??n";
      },
    },
    {
      field: "createdAt",
      headerName: "Ng??y t???o",
      flex: 1,
      minWidth: 220,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => formatDate(params.row),
    },
  ];
  return (
    <div>
      {data ? (
        <Dialog fullScreen open={openDetail} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                Th??ng tin b??i nghi??n c???u{" "}
                {data.topic_name ? data.topic_name : ""}
              </Typography>
              <IconButton
                edge='start'
                color='inherit'
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
              <Typography>
                T??m b??i nghi??n c???u: {data.topic_name ? data.topic_name : ""}
              </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Typography>
                Danh m???c b??i nghi??n c???u:{" "}
                {data.category_research_id?.name
                  ? data.category_research_id?.name
                  : ""}
              </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Stack direction='row' spacing={1}>
                <Typography>C??ng vi???c :</Typography>
                <Typography>
                  {data.research_detail_id?.research_detail_name
                    ? data.research_detail_id?.research_detail_name
                    : ""}
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Stack direction='row' spacing={1}>
                <Typography>???????ng d???n : </Typography>
                {data.link ? (
                  <a
                    href={`${data.link}`}
                    target='_blank'
                    style={{
                      textDecoration: "underline",
                      textDecorationColor: "mediumblue",
                      color: "mediumblue",
                    }}
                  >
                    {data.topic_name}
                  </a>
                ) : (
                  <></>
                )}
              </Stack>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Typography>
                K??? h???c:
                {report === true
                  ? data.semester
                  : data.semester_id?.semester_name +
                    " n??m h???c " +
                    data.semester_id?.year}
              </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Typography>
                S??? ng?????i tham gia:{" "}
                {data.member_number ? data.member_number : ""}
              </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Stack direction='row' spacing={1}>
                <Typography>File: </Typography>
                <Stack direction='row' spacing={1}>
                  {data.file !== "" ? (
                    <>
                      <InsertDriveFileIcon />
                      <Link
                        href={`${data.file}`}
                        target={"_blank"}
                        style={{
                          textDecoration: "underline",
                          textDecorationColor: "mediumblue",
                          color: "mediumblue",
                        }}
                      >
                        T???i file ????nh k??m
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Stack>
            </Grid>
            {data.reward_id ? (
              <>
                <Grid item md={4} sm={6} xs={12}>
                  <Stack direction='row' spacing={1}>
                    <Typography>
                      Lo???i th?????ng : {data.reward_id.reward_name}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Stack direction='row' spacing={1}>
                    <Typography>
                      M???c th?????ng : {formatMoney(data.reward_id.amount)} VND
                    </Typography>
                  </Stack>
                </Grid>
              </>
            ) : (
              <></>
            )}
            <Grid item md={4} sm={6} xs={12}>
              <Stack direction='row' spacing={1}>
                <Typography>Ng??y l??u : {formatDate(data.save_date)}</Typography>
              </Stack>
            </Grid>
            {data.approver ? (
              <Grid item md={4} sm={6} xs={12}>
                <Stack direction='row' spacing={1}>
                  <Typography>Ng?????i duy???t : {data.approver?.name}</Typography>
                </Stack>
              </Grid>
            ) : (
              <></>
            )}
            {renderUnit()}
          </Grid>
          <Divider variant='middle' />

          <div style={{ flex: 1, padding: 10 }}>
            <DataGrid
              ref={tableRef}
              rows={author}
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
      ) : (
        <></>
      )}
    </div>
  );
}
