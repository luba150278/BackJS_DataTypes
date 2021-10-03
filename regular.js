/**
 * Main constructor-function for check email/phone/password using "the regular expressions"
 */
function Validator() {
  /**
   * format: firstpart@secondpart.end
   * first part: letters, digits, .+-. First symbol just letter/digit. Length 2-20
   * secondpart: letters, digits, .!$%&’*+/=?^_- Length 1-15
   * end - domain: just letters, Length 1-5
   * @param {*} email string expression
   * @returns true/false
   */
  this.validateEmail = function (email) {
    const regexp =
      /^([\da-z]){1}([\da-z-\.\+]){1,19}(@){1}([\da-z\.!$%&'\*+\/=\?\^_-]{1,14})(\.){1}([a-z]{1,5})$/i;
    return regexp.test(email);
  };
  /**
   * format: +38 (099) 567 8901
   * +38 - the country code is optional
   * () - optional
   * expression can contain any number of "-" and spaces
   * the max expression length is 25 symbols
   * @param {*} phone string expression
   * @returns true/false
   */
  this.validatePhone = function (phone) {
    const regexp =
      /^(?=.{1,25}$)(\+?(\d[\- ]*){2})?[\- ]*(\(?(\d[\- ]*){3}\)?)([\- ]*\d[\- ]*){7}$/;
    return regexp.test(phone);
  };
  /**
   * the min expression length is 8 symbols. Password can contains just letters, digits and "_"
   * the password must contain at least one capital letter, one small letter and one number;
   * @param {*} pass string expression
   * @returns true/false
   */
  this.validatePassword = function (pass) {
    const regexp = /^[\p{Lu}+\p{Ll}+\d+_*]{8,}$/u;
    return regexp.test(pass);
  };
}
const colors = require("colors/safe"); //Use for create color text in console
const val = new Validator();
//-------TestData---------------
const validEmailsArr = [
  "fi@secondpart.end",
  "first-part@.se=cond%p.art.end",
  "first.part@se=cond%part.r",
  "first.part@.!$%&'*+/=?^_-.r",
  "first.part@a!$%&'*+/=?^_b.gmail",
];
const unValidEmailsArr = [
  "f@secondart.end",
  "first-part@.se=cond@part.end",
  "-firstpart@.se=cond%.enddeded",
  "firs_tpart@.se.en",
  "firstpart@.se.enddeded",
];
const validPhonesArr = [
  "+38 (099) 567 8901",
  "+38 099 5 6 7 8 9  01",
  "0501111111",
  "050-111-11-11",
  "050 111 11 11",
  "(09-9) 567-890-1",
  "--  (099) 567 890-1",
  "+421949111111",
];
const unValidPhonesArr = [
  "+38",
  "+38050",
  "38050",
  "+38+380501111111",
  "+38((050)5893436",
  "+381111111111111111111111111111111111111111111111111111111111111111111",
];
const validPasswordsArr = [
  "Kv_3LkKD",
  "Pq4T_3v2",
  "ERbA_jr9Q",
  "BygoA_54k",
  "k8aem_8CUft3Aq6D",
];
const unValidPasswordsArr = [
  "_Xxu8R2",
  "qLfcbZ65#7d",
  "7hfSzFB3_%mz",
  "T#(6T6su(i7A",
  "v8A8pei&#sF4rpe_",
];
//===================================EMAILS===================================
console.log(
  `${colors.yellow("===================TEST EMAILS==================")}`
);
console.log(
  `${colors.magenta("-------------------Valid emails---------------------")}`
);
validEmailsArr.map((item) =>
  console.log(
    `check: ${colors.cyan(item)} -> ${colors.green(val.validateEmail(item))}`
  )
);
console.log(
  `${colors.magenta("-------------------Unvalid emails---------------------")}`
);
unValidEmailsArr.map((item) =>
  console.log(
    `check: ${colors.cyan(item)} -> ${colors.red(val.validateEmail(item))}`
  )
);

//===================================PHONES===================================
console.log(
  `${colors.yellow("===================TEST PHONES==================")}`
);
console.log(
  `${colors.magenta("-------------------Valid phones---------------------")}`
);
validPhonesArr.map((item) =>
  console.log(
    `check: ${colors.cyan(item)} -> ${colors.green(val.validatePhone(item))}`
  )
);
console.log(
  `${colors.magenta("-------------------Unvalid phones---------------------")}`
);
unValidPhonesArr.map((item) =>
  console.log(
    `check: ${colors.cyan(item)} -> ${colors.red(val.validatePhone(item))}`
  )
);

//===================================PASSWORDS===================================
console.log(
  `${colors.yellow("===================TEST PASSWORDS==================")}`
);

console.log(
  `${colors.magenta("-------------------Valid passwords---------------------")}`
);
validPasswordsArr.map((item) =>
  console.log(
    `check: ${colors.cyan(item)} -> ${colors.green(val.validatePassword(item))}`
  )
);
console.log(
  `${colors.magenta(
    "-------------------Unvalid passwords---------------------"
  )}`
);
unValidPasswordsArr.map((item) =>
  console.log(
    `check: ${colors.cyan(item)} -> ${colors.red(val.validatePassword(item))}`
  )
);