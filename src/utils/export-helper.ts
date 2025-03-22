import { saveAs } from "file-saver";
import { unparse, parse } from "papaparse";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { normalizeName } from "./string-helper";

export const exportToCSV = (data: any[], filename: string) => {
  const csv = unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${filename}.csv`);
};

export const exportToExcel = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${filename}.xlsx`);
};

export const exportToPDF = (data: any[], filename: string) => {
  const doc = new jsPDF();

  // Đặt tiêu đề
  doc.setFontSize(16);
  doc.text("Danh sách sinh viên", 10, 10);

  // Xuất dữ liệu dạng bảng
  let y = 20;
  data.forEach((item, index) => {
    doc.text(`${index + 1}. ${item["Họ và tên"]} - ${item["Email"]}`, 10, y);
    y += 10;
  });

  // Lưu file PDF
  doc.save(`${filename}.pdf`);
};

export const importFromCSV = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    parse(file, {
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error);
      },
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => normalizeName(header),
    });
  });
};

export const importFromExcel = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Lấy sheet đầu tiên
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Chuyển dữ liệu từ sheet sang JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Lấy header (dòng đầu tiên)
        const headers = jsonData[0] as string[];

        // Chuyển dữ liệu thành object (loại bỏ dòng header)
        const result = (jsonData.slice(1) as any[][]).map((row: any[]) =>
          headers.reduce((acc, header, index) => {
            acc[header] = row[index] || ""; // Gán giá trị hoặc để rỗng nếu thiếu
            return acc;
          }, {} as Record<string, any>)
        );

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
