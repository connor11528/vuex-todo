// mutations
const version = 1;
const mutations = {
  removeItem(state, { id }) {
    const record = state.added
      .map(function(item) {
        return item.id;
      })
      .indexOf(id);
    state.added.splice(record, 1);
  },
  addToCart(state, { id }) {
    const record = state.added.find(p => p.id === id);
    if (!record) {
      state.added.push({
        id,
        quantity: 1,
        name: state.all.find(p => p.id === id).product,
        price: state.all.find(p => p.id === id).price
      });
    } else {
      record.quantity++;
    }
  },
  fetchProducts(state, all) {
    state.all = all.products;
  },
  increaseItem(state, { id }) {
    const record = state.added.find(p => p.id === id);
    record.quantity++;
  },
  decreaseItem(state, { id }) {
    const record = state.added.find(p => p.id === id);
    record.quantity--;
    if (record.quantity < 0) {
      record.quantity = 0;
    }
  },
  resetStore({ commit }, store) {
    state.version++;
    state.added = [];
  },
  initialiseStore(state) {
    // Check if the store exists
    if (localStorage.getItem("store")) {
      let store = JSON.parse(localStorage.getItem("store"));
      if (store.version == version) {
        this.replaceState(Object.assign(state, store));
      } else {
        state.version = version;
      }
    }
  },
  hideCateg(state) {
    state.categShown = false;
  },
  showCateg(state) {
    state.categShown = true;
  },
  updateNav(state, value) {
    state.selectedCategory = value;
  },
  emptySubCateg(state) {
    state.selectedSubCategory = "";
  },
  getCategories(state) {
    let categoriesSet = new Set();
    state.all.filter(el => {
      categoriesSet.add(el.category);
    });
    state.categories = Array.from(categoriesSet);
  },

  getSubCategs(state) {
    let subcategoriesSet = new Set();
    state.filteredProducts.filter(el => {
      subcategoriesSet.add(el.subcateg);
    });
    state.subCategories = Array.from(subcategoriesSet);
  },
  updateSelectedCategory(state, value) {
    state.selectedCategory = value;
  },
  updateSelectedSubCateg(state, value) {
    state.selectedSubCategory = value;
  },
  filteredProducts(state, value) {
    state.filteredProducts = state.all.filter(item => {
      return item.category === value;
    });
  },
  initialSubCateg: state => {
    state.initialSubCat = state.selectedSubCategory = state.subCategories[0];
  },
  updateLanguage(state, value) {
    state.language = value;
  }
};
export default mutations;
