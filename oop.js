const colors = require("colors/safe"); //Use for create color text in console
/**
 * Abstract class
 * @param {*} keys - properties of class
 */
function Product(keys) {
  if (this.constructor === Product) {
    throw new Error("Instance of Abstract class cannot be instantiated");
  }
  for (let item in keys) {
    this.item = keys[item];

    Object.defineProperty(this, item, {
      get: function () {
        return keys[item];
      },
      set: function (value) {
        this.item = value;
      },
      enumerable: true,
      configurable: true,
    });
  }
}
Product.prototype.getReviewByID = function (ID) {
  return this.props.reviews.filter((item) => item.ID === ID).length > 0
    ? this.props.reviews.filter((item) => item.ID === ID)
    : "Nothing to find";
};
Product.prototype.getImage = function (index) {
  return index
    ? this.props.images[index]
      ? this.props.images[index]
      : this.props.images[0]
    : this.props.images[0];
};
Product.prototype.addReview = function (rev) {
  this.props.reviews.push(rev);
};
Product.prototype.deleteReview = function (ID) {
  const index = this.props.reviews.findIndex((item) => item.ID === ID);
  this.props.reviews.splice(index, 1);
};
Product.prototype.getAverageRating = function () {
  let ratAvg = [];
  this.props.reviews.map((item) => {
    ratAvg = ratAvg.concat(Object.values(item.rating));
  });

  return ratAvg.reduce((a, b) => a + b) / ratAvg.length;
};
/**
 * method to form information about class exemplar properties and values
 * @returns result string
 */
Product.prototype.getFullInformation = function () {
  let str = "";
  for (key in this.props) {
    if (typeof this.props[key] === "object") {
      str +=
        `${colors.cyan(key)}: ${colors.green(
          JSON.stringify(this.props[key])
        )}` + "\n";
    } else {
      str += `${colors.cyan(key)}: ${colors.green(this.props[key])}` + "\n";
    }
  }
  return str;
};
/**
 * Summary prices for n-products
 * @param {*} n - number of products
 * @returns result - number
 */
Product.prototype.getPriceForQuantity = function (n) {
  return `$${Math.floor(n * this.props.price * 100) / 100}`;
};

/**
 * Class will inherited from Product
 * @param {*} data - object with all class propertise and their values
 */
function Clothes(data) {
  this.props = data;

  this.addSize = function (param) {
    this.props.sizes.push(param);
  };
  this.deleteSize = function (param) {
    const index = this.props.sizes.indexOf(param);
    this.props.sizes.splice(index, 1);
  };
  
}
Clothes.prototype = Object.create(Product.prototype); //bind Clothes class and Product(parent class)

/**
 * Class will inherited from Product
 * @param {*} data - object with all class propertise and their values
 */
function Electronics(data) {
  this.props = data;
}
Electronics.prototype = Object.create(Product.prototype); //bind Electronics class and Product(parent class)

//=============Search=======================
/**
 *
 * @param {*} products
 * @param {*} search
 * @returns
 */
function searchProducts(products, search) {
  const arr = products.filter(
    (item) =>
      item.props["name"].toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      item.props["description"].toLowerCase().indexOf(search.toLowerCase()) !==
        -1
  );
  return arr;
}
//=================Sort===============
/**
 *
 * @param {*} products
 * @param {*} sortRule
 * @returns
 */
function sortProducts(products, sortRule) {
  const arr = products.sort((a, b) =>
    a.props[sortRule] > b.props[sortRule] ? 1 : -1
  );
  return arr;
}

//=================================TESTS=============================
const data = require("./dataForTests");
//create items array for Clothes class and for Electronics class
const wear = [
  new Clothes(data().wears()[0]),
  new Clothes(data().wears()[1]),
  new Clothes(data().wears()[2]),
];
const electroItems = [
  new Electronics(data().allElectr()[0]),
  new Electronics(data().allElectr()[1]),
  new Electronics(data().allElectr()[2]),
];
console.log(JSON.stringify(wear[0]))
console.log(JSON.stringify(electroItems[2]))