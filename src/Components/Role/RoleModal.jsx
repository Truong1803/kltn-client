import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useTheme } from "@mui/material/styles";
import String from "../../Common/String/String";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Grid, TextField, Typography } from "@mui/material";
import { getAllPermissionAction } from "../../redux/action/PermissionAction";
import {
  createRoleAction,
  editRoleAction,
  getRoleByPositionAction,
  getAllRoleAction,
} from "../../redux/action/RoleAction";
import { StyledDataGrid } from "../../Common/DataGridCustom";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function RoleModal({ isOpen, action, item, setIsOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});
  const [dataPer, setDataPer] = useState([]);
  const [hasPermission, setHasPermission] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const auth = useSelector((state) => state.AuthReducer);
  const permissions = useSelector((state) => state.PermissionReducer);
  const info = useSelector((state) => state.UserAuthReducer);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const getDataPermission = () => {
    dispatch(getAllPermissionAction(auth.accessToken));
  };

  useEffect(() => {
    if (action === "EDIT" || action === "VIEW") {
      setData(item);
      setHasPermission(item.permissions);
    } else if (action === "ADD") {
      setData("");
      setHasPermission([]);
    }
  }, [action, item]);
  useEffect(() => {
    getDataPermission();
  }, []);
  useEffect(() => {
    if (permissions) {
      setDataPer(permissions);
    }
  }, [permissions]);
  useEffect(() => {
    if (permissions) {
      filterData(permissions, hasPermission);
    }
  }, [hasPermission]);
  const filterData = (arr1, arr2) => {
    if (arr1.length > 0) {
      const finalArr = arr1.filter((a) => {
        return !arr2.some((b) => {
          return a["_id"] === b["_id"];
        });
      });
      setDataPer(finalArr);
      return finalArr;
    }
  };
  const getDataUser = () => {
    dispatch(getRoleByPositionAction(info.role, auth.accessToken));
    dispatch(getAllRoleAction(auth.accessToken));
  };

  const handleSubmit = () => {
    if (action === "ADD") {
      if (data) {
        data["permissions"] = hasPermission;
        dispatch(createRoleAction(data, auth.accessToken));
        setIsOpen(!isOpen);
        setData("");
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      if (data) {
        data["permissions"] = Array.from(new Set(hasPermission));
        dispatch(editRoleAction(data, auth.accessToken));
        setIsOpen(!isOpen);
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
    getDataUser();
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleChangePermission = (e, v, r) => {
    setHasPermission(v);
  };
  const columns: GridColDef[] = [
    {
      field: "permission",
      headerName: "Tên quyền ",
      minWidth: 350,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "desc",
      headerName: "Mô tả",
      minWidth: 350,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"lg"}
        fullWidth={true}
        open={isOpen}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          <div className=''>
            <Typography variant='h5' component={"h2"} fontWeight={"bold"}>
              {action === "ADD"
                ? String.actionAdd + " nhóm quyền: "
                : action === "EDIT"
                ? String.actionEdit
                : String.actionView}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box autoComplete='on'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Box>
                  <div className=''>
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                    >
                      Mã nhóm quyền:
                    </Typography>
                  </div>
                  <div className=''>
                    <TextField
                      id='outlined-name fullWidth id'
                      fullWidth
                      name='id_role'
                      value={data.id_role}
                      onChange={handleOnchange}
                      disabled={action !== "ADD" ? true : false}
                      placeholder='Nhập mã nhóm quyền'
                      error={isValid}
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box>
                  <div className=''>
                    <Typography
                      fontWeight={"bold"}
                      color={"#333"}
                      component={"div"}
                    >
                      Tên nhóm quyền:
                    </Typography>
                  </div>
                  <div className=''>
                    <TextField
                      id='outlined-name fullWidth name'
                      fullWidth
                      name='role'
                      value={data.role}
                      onChange={handleOnchange}
                      placeholder='Nhập tên nhóm quyền'
                      error={isValid}
                      disabled={action === "VIEW" ? true : false}
                    />
                  </div>
                </Box>
              </Grid>
              {action !== "VIEW" ? (
                <Grid item xs={12} sm={12} md={12}>
                  <Box>
                    <div className=''>
                      <Typography
                        fontWeight={"bold"}
                        color={"#333"}
                        component={"div"}
                      >
                        Cấp quyền:
                      </Typography>
                    </div>
                    <div className=''>
                      <Autocomplete
                        multiple
                        value={hasPermission}
                        onChange={handleChangePermission}
                        id='checkboxes-data-role'
                        options={dataPer}
                        limitTags={4}
                        disableCloseOnSelect
                        filterSelectedOptions={true}
                        getOptionLabel={(option) => option.permission}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.permission}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} placeholder='Chọn quyền' />
                        )}
                      />
                    </div>
                  </Box>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
            {action !== "ADD" ? (
              <div style={{ minHeight: 400, padding: 10 }}>
                <StyledDataGrid
                  ref={tableRef}
                  rows={hasPermission}
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
            ) : (
              <></>
            )}
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
            {action === "VIEW" ? "Quay lại" : "Huỷ"}
          </Button>
          {action !== "VIEW" ? (
            <Button
              onClick={handleSubmit}
              autoFocus
              variant='contained'
              color='primary'
            >
              {action === "ADD" ? "Thêm mới" : "Lưu lại"}
            </Button>
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
