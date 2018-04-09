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

  getSubcategs: state => {
    return state.subCategories;
  },

  filterSubProd: state => subcateg =>
    state.filteredProducts.filter(ele => {
      return ele.subcateg === subcateg;
    }),
  initialSubCat: state => state.initialSubCat,
  menuItems: state => {
    let menuItems = [];
    for (let i = 0; i < state.categories.length; i++) {
      menuItems[i] = {
        name: state.categories[i],
        subcategory: []
      };
      for (let index = 0; index < state.all.length; index++) {
        if (state.all[index].category === menuItems[i].name) {
          menuItems[i].subcategory.push(state.all[index].subcateg);
        }
      }
    }
    return menuItems;
  }
};

export default getters;
