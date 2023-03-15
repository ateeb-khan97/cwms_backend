import fs from "fs";
import moment from "moment";
import { parse } from "papaparse";
import * as path from "path";
//
export default function base64ToCsv(
  base64String: string,
  fileName: string
): string[] {
  base64String = base64String.substring(base64String.indexOf(","));

  const date = moment().format("DD-MM-YYYY");
  const time = moment().format("HH-mm-ss");
  //
  const buffer = Buffer.from(base64String, "base64");

  // Parse CSV from buffer
  const { data } = parse(buffer.toString(), { header: true });

  // Convert CSV data to string
  const csvString: string = data.reduce((acc, row) => {
    const values = Object.values(row);
    return acc + values.join("#$#") + "#$#";
  }, "");
  //
  const csvArray: any[] = csvString.split("#$#");
  //
  const outputDirectory = path.join("uploads/csv/");
  const outputFilePath = path.join(
    outputDirectory,
    fileName.toUpperCase() + "_" + time + "_" + date + ".csv"
  );
  // Save CSV string as file
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }
  //
  if (!fs.existsSync(outputFilePath)) {
    fs.writeFileSync(outputFilePath, "");
  }
  //
  fs.writeFileSync(outputFilePath, csvString);
  console.log("CSV uploaded successfully!");

  return csvArray;
}
