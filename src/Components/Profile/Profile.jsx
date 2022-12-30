import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import jwt_decode from "jwt-decode";
import {
  editUserAuthAction,
  getUserAuth,
} from "../../redux/action/UserAuthAction";

const initState = {
  name: "",
  dob: "",
  gender: "",
  avatar: "",
  gmail: "",
};

function Profile() {
  const dispatch = useDispatch();
  const [data, setData] = useState(initState);
  const auth = useSelector((state) => state.AuthReducer);

  const Input = styled("input")({
    display: "none",
  });

  const userAuth = useSelector((state) => state.UserAuthReducer);

  const getData = () => {
    if (auth.accessToken) {
      let userId = jwt_decode(auth.accessToken);
      dispatch(getUserAuth(userId.id, auth.accessToken));
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleOnchangeAvatar = (e) => {
    const target = e.target;
    const files = target.files;

    if (files) {
      const file = files[0];
      setData({ ...data, avatar: file });
    }
  };
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      _id: userAuth._id,
      name: "",
      dob: "",
      gender: "",
      avatar: "",
      gmail: "",
    };
    if (data.name === "") {
      user.name = userAuth.name;
    } else {
      user.name = data.name;
    }
    if (data.gender === "") {
      user.gender = userAuth.gender;
    } else {
      user.gender = data.gender;
    }
    if (data.dob === "") {
      user.dob = userAuth.dob;
    } else {
      user.dob = data.dob;
    }
    if (data.avatar === "") {
      user.avatar = userAuth.avatar;
    } else {
      user.avatar = data.avatar;
    }
    if (data.gmail === "") {
      user.gmail = userAuth.gmail;
    } else {
      user.gmail = data.gmail;
    }
    dispatch(editUserAuthAction(user, auth.accessToken));
  };

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
        sx={(theme) => ({
          m: 3,
          [theme.breakpoints.down("sm")]: { fontSize: "1.25rem" },
        })}
      >
        Thông tin chung
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }}>
        <Box
          sx={(theme) => ({
            m: 3,
            [theme.breakpoints.down("sm")]: {
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            },
          })}
        >
          <label htmlFor='icon-button-file'>
            <Input
              accept='image/*'
              id='icon-button-file'
              type='file'
              onChange={handleOnchangeAvatar}
            />
            <IconButton
              aria-label='upload picture'
              component='span'
              sx={{ color: "#fff" }}
            >
              <Badge
                overlap='circular'
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <PhotoCamera
                    sx={{
                      zIndex: 1000,
                      backgroundColor: "#3a3b3c",
                      width: 40,
                      height: 40,
                      padding: 1,
                      borderRadius: 50,
                    }}
                  />
                }
              >
                <Avatar
                  alt='Avatar'
                  src={
                    data.avatar
                      ? URL.createObjectURL(data.avatar)
                      : userAuth?.avatar
                  }
                  sx={{ width: 156, height: 156 }}
                />
              </Badge>
            </IconButton>
          </label>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              name='name'
              fullWidth
              onChange={handleOnchange}
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              defaultValue={userAuth?.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Họ và tên: </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              disabled={true}
              defaultValue={userAuth?.id}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    Mã giảng viên:{" "}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name='dob'
              onChange={handleOnchange}
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              defaultValue={userAuth?.dob}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Ngày sinh: </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name='gender'
              fullWidth
              id='outlined-start-adornment-gender'
              sx={{ m: 1 }}
              onChange={handleOnchange}
              defaultValue={userAuth?.gender}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Giới tính: </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name='gmail'
              id='outlined-start-adornment-gmail'
              sx={{ m: 1 }}
              defaultValue={userAuth?.gmail}
              onChange={handleOnchange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Email: </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              defaultValue={userAuth?.department_id[0]?.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Khoa: </InputAdornment>
                ),
              }}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              disabled={true}
              defaultValue={userAuth?.subject_id[0]?.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Bộ môn: </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Box sx={{ float: "right", mt: 4 }}>
        <Stack direction={"row"} spacing={5}>
          {/* <Button variant='contained' color='error' >
            <Typography>Huỷ</Typography>
          </Button> */}
          <Button variant='contained' onClick={handleSubmit}>
            <Typography>Lưu</Typography>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Profile;
