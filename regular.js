function Validator() {
  this.validateEmail = function (email) {
    
    const regexp =
      /^[a-z | 0-9]{1}[a-z | 0-9 | \. | \- | \+]{1,19}@{1}[a-z | 0-9 | \. | ! | $ | % | & | ' | * | \+ | \/ | = ]{1,14}[\.]{1}[a-z]{1,5}$/i;
    return regexp.test(email);
  };
  this.validatePhone = function (phone) {
    const regexp =
      /^(\+?(\d[\- ]*){2})?[\- ]*(\(?(\d[\- ]*){3}\)?)[\- ]*(\d[\- ]*){7}$/;
    return regexp.test(phone) && phone.length <= 25;
  };
  this.validatePassword = function (pass) {
    const regexp = /^[\p{Lu}+\p{Ll}+\d+_*]{8,}$/gu;
    return regexp.test(pass);
  };
}
const colors = require("colors/safe");
const val = new Validator();
//-------TestData---------------
const validEmailsArr = [
  "fi@secondpart.end",
  "first-part@.se=cond%p.art.end",
  "first.part@se=cond%part.r",
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
validEmailsArr.map((item) => console.log(`check: ${colors.cyan(item)} -> ${colors.green(val.validateEmail(item))}`));
console.log(
  `${colors.magenta("-------------------Unvalid emails---------------------")}`
);
unValidEmailsArr.map((item) => console.log(`check: ${colors.cyan(item)} -> ${colors.red(val.validateEmail(item))}`));

//===================================PHONES===================================
console.log(
  `${colors.yellow("===================TEST PHONES==================")}`
);
console.log(
  `${colors.magenta("-------------------Valid phones---------------------")}`
);
validPhonesArr.map((item) => console.log(`check: ${colors.cyan(item)} -> ${colors.green(val.validatePhone(item))}`));
console.log(
  `${colors.magenta("-------------------Unvalid phones---------------------")}`
);
unValidPhonesArr.map((item) => console.log(`check: ${colors.cyan(item)} -> ${colors.red(val.validatePhone(item))}`));

//===================================PASSWORDS===================================
console.log(
  `${colors.yellow("===================TEST PASSWORDS==================")}`
);

console.log(
  `${colors.magenta("-------------------Valid passwords---------------------")}`
);
validPasswordsArr.map((item) => console.log(`check: ${colors.cyan(item)} -> ${colors.green(val.validatePassword(item))}`));
console.log(
  `${colors.magenta("-------------------Unvalid passwords---------------------")}`
);
unValidPasswordsArr.map((item) => console.log(`check: ${colors.cyan(item)} -> ${colors.red(val.validatePassword(item))}`));


