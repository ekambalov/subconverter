//conecting libraryes

const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = process;
const { readdir, stat } = require("fs/promises");

// finding our .ass directory
const assPath = path.join(__dirname, "../ass");

//function that get string and file directory and write string to file
const writeTofile = (text, dir) => {
  const writeStream = fs.createWriteStream(path.join(__dirname, `${dir}`), "utf-8");
  writeStream.write(text);
};

//getting all .ass filenames
const getFiles = async (dirPath) => {
  const files = await readdir(dirPath, { withFileTypes: true });
  const assNames = [];
  for (const file of files) {
    if (file.isFile()) {
      const stats = await stat(path.join(dirPath, file.name));
      const fileParse = path.parse(path.join(dirPath, file.name));
      if (fileParse.ext === ".ass") assNames.push(`${fileParse.name}`); //check if file is .ass
    }
  }
  return assNames;
};

//convert ass to srt
const srtConverter = (assSubs) => {
  //convert time from ass format to srt format
  const timeConverter = (oldTime) => {
    return oldTime.slice(0, 7) + "," + oldTime.slice(8, 10) + "0";
  };

  //split ass file by rows, and return only rows with dialogue
  const assRows = assSubs.split("\n").filter((row) => row.slice(0, 8) === "Dialogue");

  let strRow = [];
  for (let i = 0; i < assRows.length; i++) {
    const rowParam = assRows[i].split(",");
    let startTime = timeConverter(rowParam[1]);
    let endTime = timeConverter(rowParam[2]);
    let text = `[${rowParam[4]}]:\n` + rowParam.slice(9).join(",");
    //changing \N to \n to separrate rows
    if (text.indexOf("\\N") !== -1) {
      text = text.slice(0, text.indexOf("\\N")) + "\n" + text.slice(text.indexOf("\\N") + 2);
    }
    strRow.push(`${i + 1}\n${startTime} --> ${endTime}\n${text}\n`);
  }
  return strRow.join("\n");
};

//main code program

(async () => {
  const subNames = await getFiles(assPath); //getting all .ass filenames in array

  //starting script for all .ass files
  subNames.forEach((subName) => {
    const stream = fs.createReadStream(path.join(__dirname, "../ass", `${subName}.ass`), "utf-8");
    let data = "";
    stream.on("data", (chunk) => (data += chunk));
    stream.on("end", () => {
      const subWithRoles = data;
      writeTofile(srtConverter(subWithRoles), `../srt/[With Roles] ${subName}.srt`);
    });
  });
})();
