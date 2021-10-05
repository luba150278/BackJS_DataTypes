function dataForTests() {
  const commonProps = ["ID", "name", "description", "price", "images"];
  const clothesOwnProps = [
    "brand",
    "sizes",
    "activeSize",
    "quantity",
    "date",
    "reviews",
    "material",
    "color",
  ];
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
  const goods = ["T-Short", "Dress", "Skirt"];
  const goodsElectr = ["tv", "mobile", "mixer"];
  const goodsID = ["1256ty", "3568uy", "9s4f7a"];
  const goodsDesc = [
    "Равным образом реализация намеченных плановых заданий в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач.",
    "Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности позволяет оценить значение соответствующий условий активизации. ",
    "Задача организации, в особенности же начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки модели развития",
  ];
  const brands = ["Puma", "Nike", "Zara"];
  const names = ["Luba", "Pit", "Anna"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const material = ["cotton", "silk", "wool"];
  const color = ["red", "blue", "green"];
  const warranty = [12, 24, 48];
  const power = [2400, 1200, 900];
  const rat1 = { services: 5, price: 4, value: 4, quality: 3 };
  const rat2 = { services: 1, price: 2, value: 3, quality: 4 };
  const rat3 = { services: 5, price: 5, value: 5, quality: 5 };
  const rev1 = new Review("1", names[0], Date.now(), "super", rat1);
  const rev2 = new Review("2", names[1], Date.now(), "nosuper", rat2);
  const rev3 = new Review("3", names[2], Date.now(), "so so", rat3);
  const revs = [rev1, rev2, rev3];
  const prices = [100, 15, 25];
  const amount = [10, 15, 25];

  const clothes = [
    [
      goodsID[0],
      goods[0],
      goodsDesc[0],
      prices[0],
      ["src1", "src2"],
      brands[0],
      sizes,
      sizes[0],
      amount[0],
      Date.now(),
      [revs[0], revs[1]],
      material[0],
      color[0],
    ],
    [
      goodsID[1],
      goods[1],
      goodsDesc[1],
      prices[1],
      ["src1", "src2"],
      brands[1],
      sizes,
      sizes[1],
      amount[1],
      Date.now(),
      [revs[1], revs[2]],
      material[1],
      color[1],
    ],
    [
      goodsID[2],
      goods[2],
      goodsDesc[2],
      prices[2],
      ["src1", "src2"],
      brands[2],
      sizes,
      sizes[2],
      amount[2],
      Date.now(),
      [revs[2], revs[1], revs[0]],
      material[2],
      color[2],
    ],
  ];
  const electronics = [
    [
      goodsID[0],
      goodsElectr[0],
      goodsDesc[0],
      prices[0],
      ["src1", "src2"],
      warranty[0],
      power[0],
    ],
    [
      goodsID[1],
      goodsElectr[1],
      goodsDesc[1],
      prices[1],
      ["src1", "src2"],
      warranty[1],
      power[1],
    ],
    [
      goodsID[2],
      goodsElectr[2],
      goodsDesc[2],
      prices[2],
      ["src1", "src2"],
      warranty[2],
      power[2],
    ],
  ];

  const wears = () => {
    let objs = [];
    for (let i = 0; i < 3; i++) {
      const obj = {};
      clothesAllProps.map((item, index) => {
        obj[item] = clothes[i][index];
      });
      objs.push(obj);
    }
    return objs;
  };

  const allElectr = () => {
    let objs = [];
    for (let i = 0; i < 3; i++) {
      const obj = {};
      electronicsAllProps.map((item, index) => {
        obj[item] = electronics[i][index];
      });
      objs.push(obj);
    }
    return objs;
  };

  return {
    wears, allElectr, rev1, rev2, rev3
  };
}

module.exports = dataForTests;
