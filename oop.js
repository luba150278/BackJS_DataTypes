//=========Common text messages==============
const changeTextForConsole = (text) => {
  return `You change ${text} value. New ${text} value is `;
};
const getTextToConsole = (text) => {
  return `Get product ${text}: `;
};
//Abstratct parent class
function Product() {
  if (this.constructor === Product) {
    throw new Error("Instance of Abstract class cannot be instantiated");
  }
  this.ID = "";
  this.name = "";
  this.description = "";
  this.price = 0.0;
  this.images = [];
}
Product.prototype.getID = function () {
  return this.ID;
};
Product.prototype.setID = function (ID) {
  this.ID = ID;
  console.log(`${changeTextForConsole("ID")}"${this.ID}"`);
};
Product.prototype.getName = function () {
  return this.name;
};
Product.prototype.setName = function (name) {
  this.name = name;
  console.log(`${changeTextForConsole("name")}"${this.name}"`);
};
Product.prototype.getDescr = function () {
  return this.description;
};
Product.prototype.setDescr = function (descr) {
  this.description = descr;
  console.log(`${changeTextForConsole("description")}"${this.description}"`);
};
Product.prototype.getPrice = function () {
  return this.price;
};
Product.prototype.setPrice = function (price) {
  this.price = price;
  console.log(`${changeTextForConsole("price")}"${this.price}"`);
};
Product.prototype.getFullInformation = function () {
  let str = "";
  for (key in this) {
    str +=
      typeof this[key] !== "function" && typeof this[key] !== "object"
        ? `${key}: ${this[key]}\n`
        : "";
  }
  return str;
};

Product.prototype.getPriceForQuantity = function (n) {
  return `$${Math.floor(n * this.getPrice() * 100) / 100}`;
};

function Clothes(
  ID,
  name,
  description,
  price,
  images,
  brand,
  sizes,
  activeSize,
  quantity,
  date,
  reviews,
  material,
  color
) {
  //--parent class properties
  this.ID = ID;
  this.name = name ? name : "";
  this.description = description ? description : "";
  this.price = price ? price : 0.0;
  this.images = images ? images : [];

  //===================own properties and methods===================
  //----------------brand----------
  this.brand = brand ? brand : "";
  this.getBrand = function () {
    return this.brand;
  };
  this.setBrand = function (brand) {
    this.brand = brand ? brand : "";
    console.log(`${changeTextForConsole("brand")}"${this.brand}"`);
  };
  //----------------sizes----------
  this.sizes = sizes ? sizes : [];
  this.getSizes = function () {
    return this.sizes;
  };
  this.setSizes = function (sizes) {
    this.sizes = sizes ? sizes : [];
    console.log(`${changeTextForConsole("sizes")}"${this.sizes}"`);
  };
  //----------------activeSize----------
  this.activeSize = activeSize ? activeSize : "";
  this.getActiveSize = function () {
    return this.activeSize;
  };
  this.setActiveSize = function (activeSize) {
    this.activeSize = activeSize ? activeSize : "";
    console.log(`${changeTextForConsole("activeSize")}"${this.activeSize}"`);
  };
  //----------------quantity----------
  this.quantity = quantity ? quantity : 0;
  this.getQuantity = function () {
    return this.quantity;
  };
  this.setQuantity = function (quantity) {
    this.quantity = quantity ? quantity : 0;
    console.log(`${changeTextForConsole("quantity")}"${this.quantity}"`);
  };
  //--------------date-------------------
  this.date = date ? date : Date.now();
  this.getDate = function () {
    return this.date;
  };
  this.setDate = function (date) {
    this.date = date ? date : Date.now();
    console.log(`${changeTextForConsole("date")}"${this.date}"`);
  };
  //-------------reviews-----------------
  this.reviews = reviews ? reviews : [];
  this.getReviews = function () {
    return this.reviews;
  };
  this.setReviews = function (reviews) {
    this.reviews = reviews ? reviews : [];
    console.log(`${changeTextForConsole("reviews")}`);
    console.log(this.reviews);
  };
  //-------------------material-----------------
  this.material = material ? material : "";
  this.getMaterial = function () {
    return this.material;
  };
  this.setMaterial = function (material) {
    this.material = material ? material : "";
    console.log(`${changeTextForConsole("material")}"${this.material}"`);
  };
  //---------------------color----------------------
  this.color = color ? color : "";
  this.getColor = function () {
    return this.color;
  };
  this.setColor = function (color) {
    this.color = color ? color : "";
    console.log(`${changeTextForConsole("color")}"${this.color}"`);
  };

  //------------Methods------------
  this.getReviewByID = function (ID) {
    return this.reviews.filter((item) => item.ID === ID).length > 0
      ? this.reviews.filter((item) => item.ID === ID)
      : "Nothing to find";
  };
  this.getImage = function (index) {
    return index ? this.images[index] : this.images[0];
  };
  this.addSize = function (param) {
    this.sizes.push(param);
  };
  this.deleteSize = function (param) {
    const index = this.sizes.indexOf(param);
    this.sizes.splice(index, 1);
  };
  this.addReview = function (rev) {
    this.reviews.push(rev);
  };
  this.deleteReview = function (ID) {
    const index = this.reviews.findIndex((item) => item.ID === ID);
    this.reviews.splice(index, 1);
  };
  this.getAverageRating = function () {
    let ratAvg = [];
    this.getReviews().map((item) => {
      ratAvg = ratAvg.concat(Object.values(item.rating));
    });

    return ratAvg.reduce((a, b) => a + b) / ratAvg.length;
  };
}
Clothes.prototype = Object.create(Product.prototype);

function Electronics(ID, name, description, price, images, warranty, power) {
  //--parent class properties
  this.ID = ID;
  this.name = name ? name : "";
  this.description = description ? description : "";
  this.price = price ? price : 0.0;
  this.images = images ? images : [];
  //----------------warranty----------
  this.warranty = warranty ? warranty : 0;
  this.getWarranty = function () {
    return this.warranty;
  };
  this.setWarranty = function (warr) {
    this.warranty = warr ? warr : "";
    console.log(`${changeTextForConsole("warranty")}"${this.warranty}"`);
  };
  //----------------power----------
  this.power = power ? power : 0;
  this.getPower = function () {
    return this.warranty;
  };
  this.setPower = function (power) {
    this.power = power ? power : "";
    console.log(`${changeTextForConsole("power")}"${this.power}"`);
  };
}
Electronics.prototype = Object.create(Product.prototype);

//=============Search=======================
function searchProducts(products, search) {
  const arr = products.filter(
    (item) =>
      item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      item.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );
  return arr;
}
//=================Sort===============
function sortProducts(products, sortRule) {
  const arr = products.sort((a, b) => (a[sortRule] > b[sortRule] ? 1 : -1));
  return arr;
}
//=========================Data=====================
//========Review consructor===============
function Review(ID, autor, date, comments, rating) {
  this.ID = ID;
  this.author = autor;
  this.date = date ? date : Date.now();
  this.comment = comments ? comments : "";
  this.rating = rating ? rating : [];
}
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const sizes2 = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const names = ["Luba", "Pit", "Anna"];
const goods = ["T-Short", "Dress", "Skirt"];
const goodsID = ["1256ty", "3568uy", "9s4f7a"];
const goodsDesc = [
  "Равным образом реализация намеченных плановых заданий в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач.",
  " Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности позволяет оценить значение соответствующий условий активизации. ",
  "Задача организации, в особенности же начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки модели развития",
];
const brands = ["Puma", "Nike", "Zara"];
const rat1 = { services: 5, price: 4, value: 4, quality: 3 };
const rat2 = { services: 1, price: 2, value: 3, quality: 4 };
const rat3 = { services: 5, price: 5, value: 5, quality: 5 };
const rev1 = new Review("1", names[0], Date.now(), "super", rat1);
const rev2 = new Review("2", names[1], Date.now(), "nosuper", rat2);
const rev3 = new Review("3", names[2], Date.now(), "so so", rat3);
const material = ["cotton", "silk", "wool"];
const color = ["red", "blue", "green"];
const warranty = [12, 24, 48];
const power = [2400, 1200, 900];
const cloth1 = new Clothes(
  goodsID[0],
  goods[0],
  goodsDesc[0],
  52.2,
  ["src1", "src2"],
  brands[0],
  sizes,
  sizes[0],
  5,
  Date.now(),
  [rev1],
  material[0],
  color[0]
);

const cloth2 = new Clothes(
  goodsID[1],
  goods[1],
  goodsDesc[1],
  40,
  ["src1", "src2"],
  brands[1],
  sizes,
  sizes[1],
  15,
  Date.now(),
  [rev2],
  material[1],
  color[1]
);
const cloth3 = new Clothes(
  goodsID[2],
  goods[2],
  goodsDesc[2],
  20,
  ["src1", "src2"],
  brands[2],
  sizes,
  sizes[2],
  100,
  Date.now(),
  [rev2],
  material[2],
  color[2]
);
const tv = new Electronics(
  goodsID[1],
  goods[1],
  goodsDesc[1],
  5000,
  ["src3", "src4"],
  warranty[0],
  power[0]
);

