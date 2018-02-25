var faker = require("faker");

function generateProducts() {
  var products = [];
  for (var id = 0; id < 50; id++) {
    products.push({
      id: id,
      product: faker.commerce.product(),
      description: faker.lorem.paragraphs(1),
      category: faker.commerce.department(),
      price: faker.commerce.price(),
      image: faker.image.avatar(),
      quantity: 1
    });
  }
  return { products: products };
}
module.exports = generateProducts;
