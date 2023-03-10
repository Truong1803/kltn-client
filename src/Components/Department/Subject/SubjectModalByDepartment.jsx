import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';

import String from '../../../Common/String/String';
import {
  createSubjectAction,
  editSubjectAction,
} from '../../../redux/action/SubjectAction';

export default function SubjectModalByDepartment({
  isOpen,
  action,
  item,
  setIsOpen,
  lecturers,
  departments,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState(item);
  const [isValid, setIsValid] = useState(false);
  const [lecturer, setLecturer] = useState(lecturers);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (action === "EDIT") {
      setData(item);
    } else if (action === "ADD") {
      setData("");
    }
    setLecturer(lecturers);
  }, [action, item, lecturers]);

  const handleSubmit = () => {
    if (action === "ADD") {
      if (data.id && data.name && data.manager_id) {
        data.department_id = departments._id;
        dispatch(createSubjectAction({ ...data }, auth.accessToken));
        setIsOpen(!isOpen);
        setData("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      dispatch(editSubjectAction({ ...data }, auth.accessToken));
      setIsOpen(!isOpen);
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
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div className="">
            <Typography variant="h5" component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " b??? m??n: "
                : String.actionEdit + item.name}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box autoComplete="on">
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                  >
                    M?? b??? m??n:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    id="outlined-name fullWidth id"
                    fullWidth
                    name="id"
                    value={data.id}
                    onChange={handleOnchange}
                    disabled={action !== "ADD" ? true : false}
                    placeholder="Nh???p m?? b??? m??n"
                    error={isValid}
                  />
                </div>
              </Box>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    component={"div"}
                    mt={2}
                  >
                    T??n b??? m??n:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    id="outlined-name fullWidth name"
                    fullWidth
                    name="name"
                    value={data.name}
                    onChange={handleOnchange}
                    placeholder="Nh???p t??n b??? m??n"
                    error={isValid}
                  />
                </div>
              </Box>
              <Box>
                <div className="">
                  <Typography
                    fontWeight={"bold"}
                    color={"#333"}
                    mt={2}
                    component={"div"}
                  >
                    Tr?????ng b??? m??n:
                  </Typography>
                </div>
                <div className="">
                  <TextField
                    id="outlined-name fullWidth leader"
                    fullWidth
                    select
                    value={data.manager_id?._id || data.manager_id}
                    name="manager_id"
                    onChange={handleOnchange}
                    error={isValid}
                    SelectProps={{
                      displayEmpty: true,
                    }}
                  >
                    <MenuItem selected disabled>
                      Ch???n gi???ng vi??n
                    </MenuItem>
                    {lecturer?.map((lecturer, index) => {
                      return (
                        <MenuItem key={index} value={lecturer._id}>
                          {lecturer.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setIsOpen(false)}
            variant="contained"
            color="error"
          >
            Hu???
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant="contained"
            color="primary"
          >
            {action === "ADD" ? "Th??m m???i" : "L??u l???i"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
