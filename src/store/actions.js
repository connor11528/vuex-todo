// actions

const actions = {
  updateNav({ commit }, value) {
    commit("updateNav", value);
  },
  emptySubCateg({ commit }) {
    commit("emptySubCateg");
  },
  updateSelectedCategory({ commit }, value) {
    commit("updateSelectedCategory", value);
  },
  updateSelectedSubCategory({ commit }, value) {
    commit("updateSelectedSubCateg", value);
  },
  getCategories({ commit }) {
    commit("getCategories");
  },
  getSubCategs({ commit }) {
    commit("getSubCategs");
  },
  showCateg({ commit }) {
    commit("showCateg");
  },
  hideCateg({ commit }) {
    commit("categHide");
  },
  addToCart({ commit }, product) {
    commit("addToCart", {
      id: product.id
    });
  },
  fetchProducts({ commit }) {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => {
        commit("fetchProducts", data);
      })
      .catch(error => {
        console.log(error.statusText);
      });
  },
  increaseItem({ commit }, product) {
    commit("increaseItem", {
      id: product.id
    });
  },
  decreaseItem({ commit }, product) {
    commit("decreaseItem", {
      id: product.id
    });
  },
  resetStore({ commit }, store) {
    commit("resetStore", store);
    commit("initialiseStore", store);
  },
  removeItem({ commit }, product) {
    commit("removeItem", {
      id: product.id
    });
  },
  filterProducts({ commit }, value) {
    commit("filterProducts", value);
  }
};

export default actions;
