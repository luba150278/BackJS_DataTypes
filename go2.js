// не обращайте на эту функцию внимания
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (;;) {
    try {
      fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
    } catch (e) {
      break; /* windows */
    }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10) break;
      was10++;
    } else was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) {
  const stringParts = string.split(" ");
  const stringRows = string.split("\n");
  const stringLastRow = stringParts[stringParts.length - 1].trim().split("\n");
  const headers = [];
  stringRows.map((item) => {
    const rowParts = item.split(":");
    const headersItem = [];
    if (rowParts[0] && rowParts[1]) {
      headersItem[0] = rowParts[0];
      headersItem[1] = rowParts[1].trim();
      if (headersItem.length > 0) headers.push(headersItem);
    }
  });

  return {
    method: stringParts[0],
    uri: stringParts[1],
    headers: headers,
    body: stringLastRow[stringLastRow.length - 1],
  };
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));
