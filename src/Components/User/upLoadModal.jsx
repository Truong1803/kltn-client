import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Grid, Stack, Typography, Chip } from "@mui/material";

import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { uploadUserAuthAction } from "../../redux/action/UserAuthAction";
export default function UploadModal({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const auth = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (file) {
      dispatch(uploadUserAuthAction(file, auth.accessToken));
      setIsOpen(!isOpen);
    }
  };
  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0]);
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setFile(formData);
    }
  };
  const Input = styled("input")({
    display: "none",
  });

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"md"}
        fullWidth={true}
        open={isOpen}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className=''>
            <Typography variant='h5' component={"h2"} fontWeight={"bold"}>
              Thêm tài khoản người dùng
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography
                  variant='h5'
                  component={"h5"}
                  fontWeight={"medium"}
                  marginBottom={6}
                  textAlign={"center"}
                >
                  File upload
                </Typography>
                <Box>
                  {fileName ? (
                    <Chip
                      label={fileName.name}
                      sx={{ mr: 2, mb: 2 }}
                      onDelete={() => {
                        setFile(null);
                        setFileName(null);
                      }}
                      color='primary'
                      size='medium'
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <label htmlFor='contained-button-file'>
                  <Input
                    accept='xlxs'
                    id='contained-button-file'
                    type='file'
                    onChange={handleChangeFile}
                    fullWidth
                  />

                  <Button
                    variant='contained'
                    component='span'
                    color='success'
                    fullWidth
                  >
                    Tải lên
                  </Button>
                </label>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography
                  textAlign={"center"}
                  variant='h5'
                  component={"h5"}
                  fontWeight={"medium"}
                >
                  Hướng dẫn
                </Typography>
                <Typography>
                  Bước 1: Tải file mẫu và cập nhật dữ liệu
                </Typography>
                <Stack>
                  <Typography>
                    Bước 2: Tải công cụ chuẩn hoá dữ liệu trên file mẫu
                  </Typography>
                  <Button variant='contained' color='primary'>
                    <Link
                      target='_blank'
                      to='/Mau_dang_ky_tai_khoan.xlsx'
                      download
                      style={{ color: "#fff" }}
                    >
                      Tải xuống
                    </Link>
                  </Button>
                </Stack>
                <Typography>Bước 3: Tải file lên hệ thống</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setIsOpen(false);
            }}
            variant='contained'
            color='error'
          >
            Huỷ
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant='contained'
            color='primary'
          >
            upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
