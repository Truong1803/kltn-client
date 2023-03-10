import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import String from "../../Common/String/String";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
// date-fns
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  createSemesterAction,
  editSemesterAction,
  getALLSemesterAction,
} from "../../redux/action/SemesterAction";
import { formatDate } from "../../Common/FormatDate/FormatDate";
import moment from "moment";
import { SHOW_NOTIFICATION } from "../../redux/type/Alert";
export default function SemesterModal({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});
  const [startYear, setStartYear] = useState(new Date());
  const [endYear, setEndYear] = useState(new Date());
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (action === "EDIT") {
      setData(item);
      const splitYear = item.year.split("-");
      setStartYear(new Date(splitYear[0]));
      setEndYear(new Date(splitYear[1]));
    } else if (action === "ADD") {
      setData("");
    }
  }, [action, item]);

  const handleSubmit = () => {
    if (action === "ADD") {
      if (data.semester_name) {
        let checkYear = endYear - startYear;
        if (checkYear > 0) {
          let year;
          let starDate = moment(startYear).format("YYYY-MM-DD");
          let endDate = moment(endYear).format("YYYY-MM-DD");
          if (data.semester_name === "H???c k??? I") {
            year = `${startYear.getFullYear()}-${endYear.getFullYear() + 1}`;
            console.log("year H???c k??? I", year);
          } else {
            year = `${startYear.getFullYear() - 1}-${endYear.getFullYear()}`;
            console.log("year H???c k??? !I", year);
          }
          let newData = {
            ...data,
            ["year"]: year,
            ["startDate"]: starDate,
            ["endDate"]: endDate,
          };
          dispatch(createSemesterAction(newData, auth.accessToken));
          dispatch(getALLSemesterAction(auth.accessToken));
          setIsOpen(!isOpen);
          setIsValid(false);
          setData("");
        } else {
          dispatch({
            type: SHOW_NOTIFICATION,
            payload: {
              status: "error",
              message: "Ng??y b???t ?????u ph???i nh??? h??n ng??y k???t th??c!!",
            },
          });
        }
      } else {
        setIsValid(true);
      }
    }
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"sm"}
        fullWidth={true}
        open={isOpen}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className=''>
            <Typography variant='h5' component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + "k??? h???c: "
                : String.actionEdit}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box autoComplete='on'>
            <Box>
              <div className=''>
                <Typography
                  fontWeight={"bold"}
                  color={"#333"}
                  component={"div"}
                >
                  T??n h???c k???
                </Typography>
              </div>
              <div className=''>
                <Select
                  labelId='semester-name-label'
                  id='list-semester'
                  fullWidth
                  displayEmpty
                  name='semester_name'
                  value={data.semester_name}
                  onChange={handleOnchange}
                  disabled={action !== "ADD" ? true : false}
                  error={isValid}
                  renderValue={(semester) => {
                    if (!semester) {
                      return <small>L???a ch???n h???c k???</small>;
                    }
                    return semester;
                  }}
                >
                  <MenuItem value='H???c k??? I'>H???c k??? I</MenuItem>
                  <MenuItem value='H???c k??? II'>H???c k??? II</MenuItem>
                  <MenuItem value='H???c k??? III'>H???c k??? III</MenuItem>
                </Select>
              </div>
            </Box>
            <Box>
              <div className=''>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <Stack direction={"row"}>
                    <Box>
                      <Typography
                        fontWeight={"bold"}
                        color={"#333"}
                        component={"div"}
                        mt={2}
                      >
                        Ng??y b???t ?????u:
                      </Typography>
                      <DatePicker
                        views={["year", "month", "day"]}
                        value={startYear}
                        onChange={setStartYear}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={null}
                            sx={{ m: 1 }}
                          />
                        )}
                      />
                    </Box>

                    <Box>
                      <Typography
                        fontWeight={"bold"}
                        color={"#333"}
                        component={"div"}
                        mt={2}
                      >
                        Ng??y k???t th??c:
                      </Typography>
                      <DatePicker
                        views={["year", "month", "day"]}
                        value={endYear}
                        onChange={setEndYear}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={null}
                            sx={{ m: 1 }}
                          />
                        )}
                      />
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </div>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setIsOpen(false);
              setIsValid(false);
            }}
            variant='contained'
            color='error'
          >
            Hu???
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant='contained'
            color='primary'
          >
            {action === "ADD" ? "Th??m m???i" : "L??u l???i"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
