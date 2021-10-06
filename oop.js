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
//-------------------------getFullInformation() method test--------------

console.log(
  `${colors.yellow(
    "===================TEST getFullInformation()=================="
  )}`
);
wear.map((item, index) => {
  console.log(
    colors.magenta(
      `-----------Clothes class object with index in wear array: ${index}-----------`
    )
  );
  console.log(item.getFullInformation());
});
electroItems.map((item, index) => {
  console.log(
    colors.magenta(
      `-----------Electronics class object with index in wear array: ${index}-----------`
    )
  );
  console.log(item.getFullInformation());
});
//-------------------------getPriceForQuantity() method test--------------
console.log(
  `${colors.yellow(
    "===================TEST getPriceForQuantity()=================="
  )}`
);
console.log(`${colors.magenta("----------Clothes objects array----")}`);
wear.map((item) => {
  const randomQuntity = Math.ceil(Math.random() * 100);
  console.log(
    `n=${colors.cyan(randomQuntity)} ; summary price is ${colors.green(
      item.getPriceForQuantity(randomQuntity)
    )}`
  );
});
console.log(`${colors.magenta("----------Electronics objects array----")}`);
electroItems.map((item) => {
  const randomQuntity = Math.ceil(Math.random() * 100);
  console.log(
    `n=${colors.cyan(randomQuntity)} ; summary price is ${colors.green(
      item.getPriceForQuantity(randomQuntity)
    )}`
  );
});
//-------------------------sortProducts() method test--------------
console.log(
  `${colors.yellow("===================TEST sortProducts()==================")}`
);
console.log(
  `${colors.magenta("----------Clothes objects array -> sort by name ----")}`
);
console.log(sortProducts(wear, "name"));

console.log(
  `${colors.magenta(
    "----------Electronics objects array -> sort by prices ----"
  )}`
);
console.log(sortProducts(electroItems, "price"));

//-------------------------searchProducts() method test--------------
console.log(
  `${colors.yellow(
    "===================TEST searchProducts()=================="
  )}`
);
console.log(
  `${colors.magenta(
    "----------Clothes objects array -> search word is 'опыт' ----"
  )}`
);
console.log(searchProducts(wear, "опыт"));

console.log(
  `${colors.magenta(
    "----------Electronics objects array -> search word is 'mobile' ----"
  )}`
);
console.log(searchProducts(electroItems, "mobile"));

//-----------getter tests------------------------
console.log(
  `${colors.yellow("===================TEST getters==================")}`
);

console.log(
  `${colors.cyan("ID (wear[0])")}: ${colors.green(wear[0].props.ID)}`
);
console.log(
  `${colors.cyan("name (wear[1])")}: ${colors.green(wear[1].props.name)}`
);
console.log(
  `${colors.cyan("description (electroItems[0])")}: ${colors.green(
    electroItems[0].props.description
  )}`
);
console.log(
  `${colors.cyan("price (electroItems[1])")}: ${colors.green(
    electroItems[1].props.price
  )}`
);
console.log(
  `${colors.cyan("images (electroItems[2])")}: ${colors.green(
    electroItems[2].props.images
  )}`
);
console.log(
  `${colors.cyan("brand (wear[2])")}: ${colors.green(wear[2].props.brand)}`
);
console.log(
  `${colors.cyan("sizes (wear[0])")}: ${colors.green(wear[0].props.sizes)}`
);
console.log(
  `${colors.cyan("activeSize (wear[1])")}: ${colors.green(
    wear[1].props.activeSize
  )}`
);
console.log(
  `${colors.cyan("quantity (wear[2])")}: ${colors.green(
    wear[2].props.quantity
  )}`
);
console.log(
  `${colors.cyan("date (wear[0])")}: ${colors.green(wear[0].props.date)}`
);
console.log(
  `${colors.cyan("reviews (wear[1])")}: ${colors.green(wear[1].props.reviews)}`
);
console.log(
  `${colors.cyan("material (wear[2])")}: ${colors.green(
    wear[2].props.material
  )}`
);
console.log(
  `${colors.cyan("color (wear[0])")}: ${colors.green(wear[0].props.color)}`
);
console.log(
  `${colors.cyan("warranty (electroItems[0])")}: ${colors.green(
    electroItems[0].props.warranty
  )}`
);
console.log(
  `${colors.cyan("power (electroItems[1])")}: ${colors.green(
    electroItems[1].props.power
  )}`
);
//-----------setter tests------------------------
console.log(
  `${colors.yellow("===================TEST setters==================")}`
);
wear[0].props.ID = "xxxx";
console.log(
  `${colors.cyan("new ID (wear[0])")}: ${colors.green(
    wear[0].props.ID
  )}; old ID see before (in getter test)`
);
wear[1].props.name = "suit";
console.log(
  `${colors.cyan("new name (wear[1])")}: ${colors.green(
    wear[1].props.name
  )}; old name see before (in getter test)`
);
electroItems[0].props.description = "новое описание";
console.log(
  `${colors.cyan("description (electroItems[0])")}: ${colors.green(
    electroItems[0].props.description
  )}; old description see before (in getter test)`
);
electroItems[1].props.price = 84.6;
console.log(
  `${colors.cyan("price (electroItems[1])")}: ${colors.green(
    electroItems[1].props.price
  )}; old price see before (in getter test)`
);
electroItems[2].props.images = ["src4", "src5", "src6"];
console.log(
  `${colors.cyan("images (electroItems[2])")}: ${colors.green(
    electroItems[2].props.images
  )}; old price see before (in getter test)`
);
wear[2].props.brand = "Gabbana";
console.log(
  `${colors.cyan("brand (wear[2])")}: ${colors.green(
    wear[2].props.brand
  )}; old brand see before (in getter test)`
);
wear[0].props.sizes = ["38", "40", "42"];
console.log(
  `${colors.cyan("sizes (wear[0])")}: ${colors.green(
    wear[0].props.sizes
  )}; old sizes see before (in getter test)`
);

wear[1].props.activeSize = wear[1].props.sizes[0];
console.log(
  `${colors.cyan("activeSize (wear[1])")}: ${colors.green(
    wear[1].props.activeSize
  )}; old activeSize see before (in getter test)`
);

wear[2].props.quantity = 111;
console.log(
  `${colors.cyan("quantity (wear[2])")}: ${colors.green(
    wear[2].props.quantity
  )}; old quantity see before (in getter test)`
);

wear[0].props.date = Date.now();
console.log(
  `${colors.cyan("date (wear[0])")}: ${colors.green(
    wear[0].props.date
  )}; old date see before (in getter test)`
);

wear[1].props.reviews = [data().rev1];
console.log(
  `${colors.cyan("reviews (wear[1])")}: ${colors.green(
    wear[1].props.reviews
  )}; old reviews see before (in getter test)`
);

wear[2].props.material = [data().rev1];
console.log(
  `${colors.cyan("material (wear[2])")}: ${colors.green(
    wear[2].props.material
  )}; old material see before (in getter test)`
);

wear[0].props.color = "yellow";
console.log(
  `${colors.cyan("color (wear[0])")}: ${colors.green(
    wear[0].props.color
  )}; old color see before (in getter test)`
);

electroItems[0].props.warranty = "36"
console.log(
  `${colors.cyan("warranty (electroItems[0])")}: ${colors.green(
    electroItems[0].props.warranty
  )}; old warranty see before (in getter test)`
);

electroItems[1].props.power = "3000"
console.log(
  `${colors.cyan("power (electroItems[1])")}: ${colors.green(
    electroItems[1].props.power
  )}; old power see before (in getter test)`
);
//----------------Test getReviewByID-------------
const ID = 1633499496046
console.log(
  `${colors.cyan("ID=1633499496046")}: ${colors.green(
    wear.map(item => {
      if(item.props.ID === ID) return item
    })
  )}`
);