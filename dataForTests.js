const Chance = require("chance"); //random data generate library
const chance = new Chance();
const sizes = ["XS", "S", "L", "XL", "M", "XM"];
const materials = ["cotton", "silk", "wool", "polyamid", "cashmere"];
const itemID = chance.unique(chance.integer, 3, { min: 1, max: 3 });

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
    const arr = [];
    const rat = new Rating(
      chance.integer({ min: 0, max: 10 }),
      chance.integer({ min: 0, max: 10 }),
      chance.integer({ min: 0, max: 10 }),
      chance.integer({ min: 0, max: 10 })
    );
    const idRev = chance.unique(chance.integer, index, { min: 1, max: index });
    for (let i = 0; i < index; i++) {
      arr[i] = new Review(
        idRev[i],
        chance.name(),
        chance.date({ string: true, american: false, year: 2021 }),
        chance.sentence({ words: 7 }),
        rat
      );
    }

    return arr;
  }


  const findCurrentValue = (field, index) => {
    switch (field) {
      case "ID":
        return itemID[index];
      case "name":
        return chance.string({ pool: "ab", length: 6 });
      case "description":
        return chance.sentence({ words: 10 });
      case "price":
        return chance.floating({ min: 1, max: 1000, fixed: 2 });
      case "images":
        return [
          chance.url({ extensions: ["gif", "jpg", "png"] }),
          chance.url({ extensions: ["gif", "jpg", "png"] }),
        ];
      case "brand":
        return chance.string({ pool: "abcdefoiklumn", length: 4 });
      case "quantity":
        return chance.integer({ min: 1, max: 10000 });
      case "date":
        return chance.date({ string: true, american: false, year: 2021 })
      case "reviews":
        return getReviewsArray(chance.integer({ min: 1, max: 4 }))
      case "sizes":
        return sizes
      case "activeSize":
        return sizes[chance.integer({ min: 0, max: sizes.length - 1 })]
      case "material":
        return materials[chance.integer({ min: 0, max: materials.length - 1 })]
      case "color":
        return chance.color({ format: 'hex' })
      case "warranty":
        return chance.integer({ min: 12, max: 60 })
      default:
        return chance.integer({ min: 60, max: 3000 })
    }
  };
  const wears = () => {
    let objs = [];
    for (let i = 0; i < 3; i++) {
      const obj = {};
      clothesAllProps.map((item) => {
        obj[item] = findCurrentValue(item, i)
      });
      objs.push(obj);
    }
    return objs;
  };
  const allElectr = () => {
    let objs = [];
    for (let i = 0; i < 3; i++) {
      const obj = {};
      electronicsAllProps.map((item) => {
        obj[item] = findCurrentValue(item, i)
      });
      objs.push(obj);
    }
    return objs;
  };
  const rev1 = getReviewsArray(2);
  const rev2 = getReviewsArray(10)[9];
  return { wears, allElectr, rev1, rev2 };
}

module.exports = dataForTests;
