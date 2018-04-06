import Vue from "vue";
import Vuex from "vuex";
import App from "../App.vue";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

// initial state
const state = {
  version: "",
  added: [],
  all: [],
  filterProducts: [],
  categShown: true,
  selectedCategory: null,
  selectedSubCategory: null,
  categories: [],
  subCategories: []
};

// one store for entire application
export default new Vuex.Store({
  state,
  strict: debug,
  getters,
  actions,
  mutations
});
