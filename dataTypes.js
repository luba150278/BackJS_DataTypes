//=========Common text messages==============
const changeTextForConsole = (text) => {
  return `You change ${text} value. New ${text} value is `;
};
const getTextToConsole = (text) => {
  return `Get product ${text}: `;
};
//===========Constructor for Product=================

function Product(
  ID,
  name,
  description,
  price,
  brand,
  sizes,
  activeSize,
  quantity,
  date,
  reviews,
  images
) {
  //-----------ID---------------
  this.ID = ID;
  this.getID = function () {
    return this.ID;
  };
  this.setID = function (ID) {
    this.ID = ID;
    console.log(`${changeTextForConsole("ID")}"${this.ID}"`);
  };
  //-----------name---------------
  this.name = name;
  this.getName = function () {
    return this.name;
  };
  this.setName = function (name) {
    this.name = name;
    console.log(`${changeTextForConsole("name")}"${this.name}"`);
  };
  //------------descr-----------------
  this.description = description ? description : "";
  this.getDescr = function () {
    return this.description;
  };
  this.setDescr = function (descr) {
    this.description = descr ? descr : "";
    console.log(`${changeTextForConsole("description")}"${this.description}"`);
  };
  //---------------price---------------
  this.price = price ? price : 0.0;
  this.getPrice = function () {
    return this.price;
  };
  this.setPrice = function (price) {
    this.price = price ? price : 0.0;
    console.log(`${changeTextForConsole("price")}"${this.price}"`);
  };
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
    this.sizes = sizes ? sizes : "";
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
  //-------------images-----------------
  this.images = images ? images : [];
  this.getImages = function () {
    return this.images;
  };
  this.setImages = function (images) {
    this.images = images ? images : [];
    console.log(`${changeTextForConsole("images")}`);
    console.log(this.images);
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
//========Review consructor===============
function Review(ID, autor, date, comments, rating) {
  this.ID = ID;
  this.author = autor;
  this.date = date ? date : Date.now();
  this.comment = comments ? comments : "";
  this.rating = rating ? rating : [];
}
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
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const sizes2 = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const names = ["Luba", "Pit", "Anna"];
const goods = ["T-Short", "Dress", "Skirt"];
const goodsID = ["1256ty", "3568uy", "9s4f7a"];
const goodsDesc = [
  "Равным образом реализация намеченных плановых заданий в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач.",
  "Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности позволяет оценить значение соответствующий условий активизации. ",
  "Задача организации, в особенности же начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки модели развития",
];
const brands = ["Puma", "Nike", "Zara"];
const rat1 = { services: 5, price: 4, value: 4, quality: 3 };
const rat2 = { services: 1, price: 2, value: 3, quality: 4 };
const rat3 = { services: 5, price: 5, value: 5, quality: 5 };
const rev1 = new Review("1", names[0], Date.now(), "super", rat1);
const rev2 = new Review("2", names[1], Date.now(), "nosuper", rat2);
const rev3 = new Review("3", names[2], Date.now(), "so so", rat3);
const prod1 = new Product(
  goodsID[0],
  goods[0],
  goodsDesc[0],
  555.5,
  brands[0],
  sizes,
  sizes[0],
  5,
  Date.now(),
  [rev1],
  ["src1", "src2"]
);

const prod2 = new Product(
  goodsID[1],
  goods[1],
  goodsDesc[1],
  6,
  brands[1],
  sizes,
  sizes[1],
  15,
  Date.now(),
  [rev2, rev1, rev3],
  ["src1", "src2"]
);

const prod3 = new Product(
  goodsID[2],
  goods[2],
  goodsDesc[2],
  11,
  brands[2],
  sizes,
  sizes[2],
  55,
  Date.now(),
  [rev2, rev3],
  ["src1", "src2"]
);
//========================Tests==================
console.log("Get product ID: " + prod1.getID());
prod1.setID("1yu789");

console.log("Get product name: " + prod1.getName());
prod1.setName("T-Short new");

console.log("Get product description: " + prod2.getDescr());
prod2.setDescr(
  "Товарищи! новая модель значений организационной деятельности требуют определения и уточнения новых предложений."
);

console.log(`${getTextToConsole("price")}${prod1.getPrice()}`);
prod1.setPrice(5.6);

console.log(`${getTextToConsole("brand")}${prod1.getBrand()}`);
prod1.setBrand("Kiko");

console.log(`${getTextToConsole("sizes")}${prod1.getSizes()}`);
prod1.setSizes(sizes2);

console.log(`${getTextToConsole("active size")}${prod1.getActiveSize()}`);
prod1.setActiveSize(sizes[3]);

console.log(`${getTextToConsole("price")}${prod1.getPrice()}`);
prod1.setPrice(7.2);

console.log(`${getTextToConsole("quantity")}${prod1.getQuantity()}`);
prod1.setQuantity(100);

console.log(`${getTextToConsole("add date")}${prod1.getDate()}`);
prod1.setDate(Date.now());

console.log(`${getTextToConsole("product reviews")}`);
console.log(prod1.getReviews());
prod1.setReviews([rev1, rev2]);

console.log(`${getTextToConsole("product images")}`);
console.log(prod1.getImages());
prod1.setImages(["aaa", "bbb", "ccc"]);

console.log("Review for product by ID:");
console.log(prod1.getReviewByID("2"));

console.log(`Image src is: ${prod1.getImage(2)}`);

prod2.addSize("XXXXXL");
console.log("Get new sizes array:");
console.log(prod2.getSizes());

//----Delete size--------
console.log("Get sizes array before delete size 'L':");
console.log(prod3.getSizes());
prod3.deleteSize("L");
console.log("Get sizes array after delete size 'L':");
console.log(prod3.getSizes());

//-----Add review--------------
console.log("Get reviews array for prod3 before add new review:");
console.log(prod3.getReviews());
prod3.addReview(rev1);
console.log("Get reviews array for prod3 after add new review:");
console.log(prod3.getReviews());
//---------Delete review------------
prod3.deleteReview("1");
console.log("Get reviews array for prod3 after deleted review with ID '1':");
console.log(prod3.getReviews());
//---------Avg rating----------
console.log(`Average rating for product 1: ${prod1.getAverageRating()}`);
console.log(`Average rating for product 2: ${prod2.getAverageRating()}`);
console.log(`Average rating for product 3: ${prod3.getAverageRating()}`);

console.log("==================Search======================");
console.log(searchProducts([prod1, prod2, prod3], "знач"));
console.log("==================Sort======================");
console.log(sortProducts([prod1, prod2, prod3], "name"))
console.log(sortProducts([prod1, prod2, prod3], "ID"))
console.log(sortProducts([prod1, prod2, prod3], "price"))
