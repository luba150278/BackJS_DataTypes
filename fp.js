const readline = require("readline");
const fs = require("fs");
/**
 * Get user console data
 * @param {*} question - "Placeholder" - phrase for user interface
 * @returns answer from user
 */
const question = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      return resolve(answer);
    });
  });
};
/**
 * Task:
 * 1. User should input phrase which can contain city name.
 * 2. Need to check the CSV file and find city data (population, place in TOP-10) if it is
 * 3. Replace city name in the phrase on the data from CSV file and get a new phrase
 * 4. If the phrase doesn't have equal in CSV file output it as it.
 */
async function main() {
  /**
   * closure functions which get CSV file and return function witch replace start text ("phrase") by new phrase.
   * The new phrase should contain data from a CSV file if the start text has coincident parts.
   * If it isn't function should return the start text
   * @param {*} csv - file
   * @returns result see decrpiption below
   */
  function csvMode(csv) {
    const cities = csv
      .split("\n")
      .filter((s) => s.trim() != "" && !s.startsWith("#"))
      .map((arr) => {
        let s = arr.split(",");
        return [s[2], +s[3]];
      })
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    /**
     * function - replace city in start text by CSV data
     */
    return (startText) => {
      const result = startText.split(" ").map((word) => {
        const index = cities.findIndex((item) => item[0] == word);

        if (index != -1) {
          return `${cities[index][0]} (${
            index + 1
          } место в ТОП-10 самых крупных городов Украины, население ${
            cities[index][1]
          } человек)`;
        } else {
          return word;
        }
      });
      return result.join(" ");
    };
  }

  try {
    const answer = await question("Введите свою фразу: ");
    const phrase = answer || "Київ";
    const file = fs.readFileSync("./tests/cities.csv", "utf8"); //read file
    console.log(csvMode(file)(phrase)); //modify CSV data and get result
  } catch (err) {
    console.error(err);
  }
}
main().catch(console.error);
