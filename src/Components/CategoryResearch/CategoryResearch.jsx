import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

import ConfirmModal from '../../Common/Alert/Confirm';
import { formatDate } from '../../Common/FormatDate/FormatDate';
import {
  deleteCategoryResearchAction,
  getALLCategoryResearchAction,
} from '../../redux/action/CategoryAction';
import CategoryResearchDetail from './CategoryDetail';
import CategoryResearchModal from './CategoryResearchModal';

function CategoryResearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const auth = useSelector((state) => state.AuthReducer);
  const category = useSelector((state) => state.CategoryReducer);
  const permission = useSelector((state) => state.CheckPermissionReducer);

  const getDataCategory = () => {
    dispatch(getALLCategoryResearchAction(auth.accessToken));
  };

  useEffect(() => {
    getDataCategory();
  }, []);
  const handleAction = (action, item) => {
    if (action === "DELETE") {
      setItem(item);
      setOpenDelete(true);
      setIsOpen(false);
      setOpenDetail(false);
    } else if (action === "VIEW") {
      setItem(item);
      setAction(action);
      setIsOpen(false);
      setOpenDetail(true);
    } else {
      setIsOpen(!isOpen);
      setAction(action);
      setItem(item);
      setOpenDetail(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Tên danh mục",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      minWidth: 180,
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => formatDate(params.row),
    },

    {
      field: "action",
      headerAlign: "center",
      align: "center",
      headerName: "",
      minWidth: 300,
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
              variant="outlined"
            >
              <VisibilityIcon color="primary" />
            </Button>
            {permission?.map((itemPermission) => {
              if (itemPermission.permission === "EDIT CATEGORY") {
                return (
                  <Button
                    onClick={() => handleAction("EDIT", params.row)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: 0,
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
              if (itemPermission.permission === "DELETE CATEGORY") {
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
    <Box>
      <Stack
        direction={{ sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        mb={5}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: { fontSize: "1.25rem" },
          })}
        >
          Danh sách danh mục nghiên cứu
        </Typography>
        {permission?.map((itemPermission) => {
          if (itemPermission.permission === "CREATE CATEGORY") {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAction("ADD", "");
                }}
              >
                <AddIcon />
              </Button>
            );
          } else {
            return;
          }
        })}
      </Stack>
      <div style={{ flex: 1 }}>
        <DataGrid
          ref={tableRef}
          rows={category}
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
      <CategoryResearchModal
        isOpen={isOpen}
        action={action}
        item={item}
        setIsOpen={setIsOpen}
      />
      <CategoryResearchDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        item={item}
      />
      <ConfirmModal
        item={item}
        deleteAction={deleteCategoryResearchAction}
        isOpen={openDelete}
        setAction={setAction}
        setIsOpen={setOpenDelete}
      />
    </Box>
  );
}

export default CategoryResearch;
