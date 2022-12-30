import React from "react";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { utils as XLSXUtils, writeFile } from "xlsx";
import { createDocument } from "../../Components/ReportBySubject/CreateDocument";

function ExportButton({ data, fileName, type }) {
  const buttonExport = (fileName, data, type) => {
    if (type) {
      const header = Object.keys(data[0]);
      const ws = XLSXUtils.json_to_sheet(data);
      let wscols = [];
      let wsrows = [];
      header.map((_) => wscols.push({ wch: 20 }));
      data.map((_) => wsrows.push({ hpx: 60 }));
      ws["!cols"] = wscols;
      ws["!rows"] = wsrows;
      const wb = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(wb, ws, fileName);
      writeFile(wb, `${fileName}.xlsx`);
    } else {
      createDocument(data);
    }
  };
  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          buttonExport(fileName, data, type);
        }}
      >
        <FileDownloadIcon />
      </Button>
    </div>
  );
}

export default ExportButton;
