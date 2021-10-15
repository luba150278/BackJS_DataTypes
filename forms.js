const fs = require("fs"); //use for read file with passwords
//=====Constants================
const protocol = "HTTP/1.1";
const URI = "/api/checkLoginAndPassword";
const ContentType = "application/x-www-form-urlencoded";
/**
 * Form output server text
 * @param {*} firstRow - protocol + status code + stsatus message
 * @param {*} body - a special text for each codes
 * @returns full text
 */
function outputText(firstRow, body) {
  const date = Date.now();
  //set option for date
  options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  };
  const dateStr = new Date(date).toLocaleString("en-GB", options);
  const result = `${firstRow}\nDate: ${dateStr}\nServer: Apache/2.2.14 (Win32)\nContent - Length: ${
    (body + "").length
  }\nConnection: Closed\nContent-Type: text/html; charset=utf-8\n\n${body}`;
  return result;
}
/**
 * Create output server response
 * @param {*} statusCode - 200, 400,404,500
 * @param {*} statusMessage - OK, Not Found, Bad Request, Internal Server Error
 * @param {*} body
 */
function outputHttpResponse(statusCode, statusMessage, body) {
  let firstRow = `${protocol} ${statusCode}` + " " + statusMessage;
  console.log(
    statusCode === 200
      ? outputText(firstRow, body)
      : outputText(firstRow, statusMessage.toLowerCase())
  );
}
/**
 * Check http object method, uri, body, headers and form response
 * @param {*} $http  object with http data
 */
function processHttpRequest($http) {
  if ($http.method !== "POST") {
    outputHttpResponse(400, "Bad Request", "");
    return;
  }

  if (
    $http.method === "POST" &&
    ($http.uri !== URI || $http.headers[1][1] !== ContentType)
  ) {
    outputHttpResponse(404, "Not Found", "");
    return;
  }
  const bodySplit = $http.body.split("&");
  const login = bodySplit[0].split("=")[1];
  const pass = bodySplit[1].split("=")[1];
  const searchText = `${login}:${pass}`;
  try {
    const file = fs.readFileSync("./tests/password.txt", "utf8"); //read file
    const fileRows = file.split("\r\n"); //Convert text to rows array. ATTENTION: for linux we use const fileRows = file.split("\n")
    const check = fileRows.filter((item) => item.trim() === searchText);
    check.length === 1
      ? outputHttpResponse(200, "OK", '<h1 style="color:green">FOUND</h1>') //user:password found
      : outputHttpResponse(
          401,
          "Unauthorized",
          '<h1 style="color:green">User didn\'t find</h1>'
        );  //user:password did't find
  } catch {
    outputHttpResponse(500, "Internal Server Error", ""); //if file with passwords 
  }
}
/**
 *  Parse request and find method, uri, headers and body
 * @param {*} string
 * @returns http object
 */
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
const contents = process.argv[2];
http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http);
