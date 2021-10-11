const protocol = "HTTP/1.1";
/**
 * Form output server text
 * @param {*} firstRow - protocol + status code + stsatus message
 * @param {*} body - sum for 200-code and special phrase for other codes
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
  const result = `${firstRow}\nDate: ${dateStr}\nServer: Apache/2.2.14 (Win32)\nContent - Length: ${(body + "").length
    }\nConnection: Closed\nContent-Type: text/html; charset=utf-8\n\n${body}`;
  return result;
}
/**
 * Form output server response
 * @param {*} statusCode - 200, 400,404
 * @param {*} statusMessage - OK, Not Found, Bad Request
 * @param {*} body - sum result if is it
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
 * 
 * @param {*} $method - POST/GET
 * @param {*} $uri - string with number param 
 * @param {*} $body - request body
 */
function processHttpRequest($method, $uri, $body) {
  const regexp = /^(\/)(sum)(\?)(nums)(=)(\d,?)+$/;

  if ($method !== "GET") {
    outputHttpResponse(400, "Bad Request", $body);
  }
  if ($method === "GET" && !regexp.test($uri)) {
    outputHttpResponse(404, "Not Found", $body);
  }

  if ($method === "GET" && regexp.test($uri)) {
    const index = $uri.indexOf("=") + 1;
    const nums = $uri.substring(index).split(",");
    const result = nums.reduce(function (a, b) {
      return +a + +b;
    });
    outputHttpResponse(200, "OK", result);
  }
}
/**
 * Parse request and find method, uri, headers and body
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
processHttpRequest(http.method, http.uri, http.headers, http.body);
