// getters
const getters = {
  allProducts: state => state.all, // would need action/mutation if data fetched async

  cartProducts: state => {
    return state.added.map(
      ({ id, quantity, name, price, image, description }) => {
        const product = state.all.find(p => p.id === id);
        return {
          name: product.product,
          price: product.price,
          image: product.image,
          description: product.description,
          id: product.id,
          quantity
        };
      }
    );
  },

  categShown: state => state.categShown,

  getCurrentCategory: state => state.selectedCategory,

  getCurrentSubCateg: state => state.selectedSubCategory,

  getCategories: state => {
    return state.categories;
  },

  getSubcateg: state => {
    return state.subCategories;
  },
  filterSubProd: state => subcateg => 
    state.filterProducts.filter(ele => {
      return ele.subcateg.includes(subcateg);
    })
  
};

export default getters;
