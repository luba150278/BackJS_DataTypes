const Chance = require("chance"); //random data generate library
const chance = new Chance();

function dataForTests() {
  const commonProps = [
    "ID",
    "name",
    "description",
    "price",
    "images",
    "brand",
    "quantity",
    "date",
    "reviews",
  ];
  const clothesOwnProps = ["sizes", "activeSize", "material", "color"];
  const electronicsOwnProps = ["warranty", "power"];
  const clothesAllProps = commonProps.concat(clothesOwnProps);
  const electronicsAllProps = commonProps.concat(electronicsOwnProps);
  //========Review consructor===============
  function Review(ID, autor, date, comments, rating) {
    this.ID = ID;
    this.author = autor;
    this.date = date ? date : Date.now();
    this.comment = comments ? comments : "";
    this.rating = rating ? rating : [];
  }
  function Rating(services, price, value, quality) {
    this.services = services;
    this.price = price;
    this.value = value;
    this.quality = quality;
  }
  function getReviewsArray(index) {
    const rat = new Rating(
      chance.integer({ min: 0, max: 10 }),
      chance.integer({ min: 0, max: 10 }),
      chance.integer({ min: 0, max: 10 }),
      chance.integer({ min: 0, max: 10 })
    );
    return new Review(
      Date.now(),
      chance.name(),
      chance.date({ string: true, american: false }),
      chance.sentence({ words: 7 }),
      rat
    );
  }

  return {};
}

module.exports = dataForTests;
