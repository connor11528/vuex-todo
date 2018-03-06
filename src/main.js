import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/index.js";
import App from "./App.vue";
import Products from "./components/Products.vue";
import Cart from "./components/Cart.vue";

import VueCurrencyFilter from "vue-currency-filter";
Vue.use(VueRouter);

Vue.use(VueCurrencyFilter, {
  symbol: "EUP",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: true
});

// Define routes
const routes = [
  { path: "/", component: Products },
  { path: "/cart", component: Cart }
];

// Register routes
const router = new VueRouter({
  routes
});

store.subscribe((mutation, state) => {
  window.localStorage.setItem("store", JSON.stringify(state));
});
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    this.$store.commit("initialiseStore");
  }
});
