// actions
const actions = {
  addToCart({ commit }, product) {
    commit("addToCart", {
      id: product.id
    });
  },
  fetchProducts({ commit }, language) {
    fetch(`./${language}.json`)
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
  }
};

export default actions;
