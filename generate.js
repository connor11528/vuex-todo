var faker = require("faker");

function generateProducts() {
  var products = [];
  for (var id = 0; id < 150; id++) {
    products.push({
      id: id,
      product: faker.commerce.product(),
      description: faker.lorem.words(4),
      category: faker.commerce.department(4),
      price: faker.commerce.price(),
      image: faker.image.avatar(),
      quantity: 1
    });
  }
  return { products: products };
}
module.exports = generateProducts;
