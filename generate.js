var faker = require("faker");

function generateProducts() {
  var products = [];
  for (var id = 0; id < 50; id++) {
    products.push({
      id: id,
      product: faker.commerce.product(),
      description: faker.lorem.words(4),
      category: faker.random.arrayElement([
        "Pantry",
        "Ingredients & Condiments",
        "Beverages",
        "Fresh Food",
        "Hygiene",
        "Feminine & Baby"
      ]),
      subcateg: faker.random.arrayElement(['Grains', 'Legumes','Pasta & Noodles','Tinned, packaged','Herbs & Spices','Oils','Condiments','Baking & Confectionary','Essentials','Fruits & Vegetables','Personal','Cleaning','Feminine & Baby', 'Beverages']),
      price: faker.commerce.price(),
      image: faker.image.avatar(),
      quantity: 1
    });
  }
  return { products: products };
}
module.exports = generateProducts;
