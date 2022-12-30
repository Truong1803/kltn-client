import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from 'docx';
import saveAs from 'file-saver';

export const createDocument = (data) => {
  const createRows = (data) => {
    const dataRows = [];
    dataRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.DXA },
            children: [
              new Paragraph({ text: "STT", alignment: AlignmentType.CENTER }),
            ],
          }),
          new TableCell({
            width: { size: 3000, type: WidthType.DXA },
            children: [
              new Paragraph({
                text: "Tên bài nghiên cứu",
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          //   new TableCell({
          //     width: { size: 300,type: WidthType.DXA },
          //     children: [
          //       new Paragraph({ text: "Khoa", alignment: AlignmentType.CENTER }),
          //     ],
          //   }),
          //   new TableCell({
          //     width: { size: 800,type: WidthType.DXA },
          //     children: [
          //       new Paragraph({
          //         text: "Bộ môn",
          //         alignment: AlignmentType.CENTER,
          //       }),
          //     ],
          //   }),
          new TableCell({
            width: { size: 3000, type: WidthType.DXA },
            children: [
              new Paragraph({
                text: "Tác giả",
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          new TableCell({
            width: { size: 4000, type: WidthType.DXA },
            children: [
              new Paragraph({
                text: `${
                  data[0].category_id === "VB"
                    ? "Tên tạp chí"
                    : data[0].category_id === "BC"
                    ? "Tên hội thảo"
                    : "Tên"
                }`,
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        ],
      })
    );
    for (const item of data) {
      dataRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 100 },
              children: [
                new Paragraph({
                  text: item.stt.toString(),
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
            new TableCell({
              width: { size: 3000 },
              children: [new Paragraph({ text: ` ${item.topic_name}` })],
            }),
            // new TableCell({
            //   width: { size: 100 },
            //   children: [new Paragraph({ text: item.department })],
            // }),
            // new TableCell({
            //   width: { size: 100 },
            //   children: [new Paragraph({ text: item.subject })],
            // }),
            new TableCell({
              width: { size: 3000 },
              children: [new Paragraph({ text: item.auth })],
            }),
            new TableCell({
              width: { size: 3000 },
              children: [new Paragraph({ text: item.link })],
            }),
          ],
        })
      );
    }
    return dataRows;
  };
  const table = new Table({
    rows: createRows(data),
  });

  const doc = new Document({
    title: "Danh sách bài nghiên cứu",
    styles: {
      default: {
        title: {
          run: {
            size: 26,
            bold: true,
          },
        },
      },
    },

    sections: [
      {
        children: [
          new Paragraph({
            text: `      BỘ GIÁO DỤC VÀ ĐÀO TẠO`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.START,
          }),
          new Paragraph({
            text: `TRƯỜNG ĐẠI HỌC THĂNG LONG`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.START,
            spacing: {
              after: 1000,
            },
          }),
          new Paragraph({
            text: `Danh mục ${data[0].category} năm ${data[0].semester}`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `bộ môn ${data[0].subject}`,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            text: `Ngày xuất file: ${new Date().toISOString().slice(0, 10)}`,
            alignment: AlignmentType.START,
            spacing: {
              after: 100,
            },
          }),
          new Paragraph({
            text: `Danh mục: ${data[0].category}`,
            alignment: AlignmentType.START,
            spacing: {
              after: 100,
            },
          }),
          new Paragraph({
            text: `Năm học: ${data[0].semester}`,
            alignment: AlignmentType.START,
            spacing: {
              after: 400,
            },
          }),
          table,
        ],
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "DL_NCKH.docx");
  });
};
