import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { forgotPasswordAction } from "../../../redux/action/AuthAction";

const theme = createTheme();

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get("email");

    dispatch(forgotPasswordAction(email));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component='main'
        sx={{ height: "70vh", justifyContent: "center" }}
      >
        <Grid
          item
          xs={false}
          sm={5}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundImage:
              "url(https://www.easyuni.vn/media/institution/photo/2016/06/03/DSC_0606-771c6.jpg.600x400_q85.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        />
        <Grid
          item
          xs={12}
          sm={5}
          md={4}
          component={Paper}
          elevation={6}
          square
          sx={{ borderTopRightRadius: 5, borderBottomRightRadius: 10 }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src='https://i1.sndcdn.com/avatars-000069362409-098ike-t500x500.jpg'
              sx={{ width: 72, height: 72, m: 1 }}
            />
            <Typography component='h1' variant='h5'>
              Qu??n m???t kh???u
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email '
                name='email'
                autoComplete='email'
                type={"email"}
                autoFocus
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                C???p l???i m???t kh???u
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
