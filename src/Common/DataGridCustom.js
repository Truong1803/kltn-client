import { withStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
export const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
      // minHeight: "100vh",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      whiteSpace: "normal",
      minHeight: "100vh",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
      minHeight: "100vh",
    },
  },
})(DataGrid);
