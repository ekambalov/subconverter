const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = process;
const { readdir, stat } = require("fs/promises");

const assPath = path.join(__dirname, "../ass");

const getFiles = async (dirPath) => {
  const files = await readdir(dirPath, { withFileTypes: true });
  const assNames = [];
  for (const file of files) {
    if (file.isFile()) {
      const stats = await stat(path.join(dirPath, file.name));
      const fileParse = path.parse(path.join(dirPath, file.name));
      assNames.push(`${fileParse.name}`);
    }
  }
  return assNames;
};

const rowCleaner = (arr) => {
  let newArr = [...arr];
  let emptyRows = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].trim() === "") {
      newArr.splice(i - emptyRows, 1);
      emptyRows += 1;
    }
  }
  return newArr;
};

const getAssRoles = (sub, ...role) => {
  if (!role[0]) return sub;
  const subStr = sub.toString();
  const newSubs = rowCleaner(
    subStr.split("\n").map((row) => {
      if (row.slice(0, 8) === "Dialogue") {
        const newRow = row.split(",");
        if (role.includes(newRow[4])) {
          return row;
        } else {
          return "";
        }
      } else {
        return row;
      }
    }),
  )
    .join("\n")
    .trim();

  return newSubs;
};

const srtConverter = (assSubs) => {
  const timeConverter = (oldTime) => {
    return oldTime.slice(0, 7) + "," + oldTime.slice(8, 10) + "0";
  };

  const assRows = assSubs.split("\n").filter((row) => row.slice(0, 8) === "Dialogue");
  let strRow = [`1\n00:00:00,000 --> 00:00:00,600\ntest\n`];
  for (let i = 0; i < assRows.length; i++) {
    const rowParam = assRows[i].split(",");
    let startTime = timeConverter(rowParam[1]);
    let endTime = timeConverter(rowParam[2]);

    let text = rowParam.slice(9).join(",");
    if (text.indexOf("\\N") !== -1) {
      text = text.slice(0, text.indexOf("\\N")) + "\n" + text.slice(text.indexOf("\\N") + 2);
    }
    strRow.push(`${i + 2}\n${startTime} --> ${endTime}\n${text}\n`);
  }
  return strRow.join("\n");
};

const getRoles = async () => {
  const stream = fs.createReadStream(path.join(__dirname, "../", `roles.txt`), "utf-8");

  let data = "";
  stream.on("data", (chunk) => (data += chunk));
  stream.on("end", () => {
    const roles = data
      .trim()
      .split("\n")
      .map((item) => item.trim());

    (async () => {
      const subNames = await getFiles(assPath);
      subNames.forEach((subName) => {
        const stream = fs.createReadStream(path.join(__dirname, "../ass", `${subName}.ass`), "utf-8");
        const writeTofile = (text, dir) => {
          const writeStream = fs.createWriteStream(path.join(__dirname, `${dir}`), "utf-8");
          writeStream.write(text);
        };
        let data = "";
        stream.on("data", (chunk) => (data += chunk));
        stream.on("end", () => {
          const subWithRoles = getAssRoles(data, ...roles);
          writeTofile(srtConverter(subWithRoles), `../srt/${subName}.srt`);
        });
      });
    })();
  });
};
getRoles();
