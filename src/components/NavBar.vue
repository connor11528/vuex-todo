<template>
<header>
  <nav class="navbar is-fixed-top "  role="navigation" aria-label="main navigation">
    <div v-if='!categShown' class="navbar-brand">
        <a href="#"  class="navbar-item " @click='changeCateg()'>
          {{ this.selectedCategory }} <span class="fa fa-close">&nbsp; &nbsp; &times;</span>
        </a>
        <div class="navbar-burger burger" id='burger' data-target="mainNav" @click="activeMenu();" >
          <span></span>
          <span></span>
          <span></span>
        </div>
    </div>
    <div v-else class="navbar-brand">
	    <router-link to="#" class="navbar-item">
	      <img srcset="/static/inverse-slim.png ,
                   /static/inverse-slim@2x.png 2x,
                   /static/inverse-slim@3x.png 3x"
            src="/static/inverse-slim@3x.png" alt="Secure Aid Logo">
	    </router-link>
      <div class="navbar-burger burger" id='burger'  data-target="mainNav" @click="activeMenu();" >
        <span></span>
        <span></span>
        <span></span>
      </div>
	  </div>
    <div class="cart">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link to='/cart' class="button is-gray " >
              <span class="icon">
              <object data="/static/shopping-cart.svg" type="image/svg+xml"></object>
              </span>
              <span> {{total | currency}}</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="navbar-menu " id='mainNav' >
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="control">
            <div class='select'>
              <select name="language-select" id="language-selector">
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>
            </div>
          </div>
        </div>
      
        <div href="#"  v-for="category in getCategories" class="navbar-item has-dropdown" :key="category.id" > 
          <a class='navbar-link' @click="selectCategory(category); activeMenu(); categHide(); filterProducts(category); filterSubCat() ; initialSubCateg(); " :class="{'is-gray is-active': selectedCategory == category  }" >
            {{category}}
          </a>
          <!-- <div class='navbar-dropdown'  v-if='selectedCategory'>
            <a class='navbar-item' v-for="subcategory in getSubcateg " :key="subcategory.id" @click="activeMenu(); " :class="{ 'is-gray is-active': selectedSubCategory == subcategory }">
              {{ subcategory}}
            </a>
          </div>  -->
        </div>
      </div>
    </div>
	</nav>


</header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "../store/index.js";

export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("fetchProducts");
    setTimeout(() => {
      this.$store.dispatch("getCategories");
    }, 150);
  },
  methods: {
    ...mapActions({
      filterProducts: "filterProducts"
    }),
    filterSubCat() {
      this.$store.dispatch("getSubCategs");
    },
    changeCateg() {
      this.$store.dispatch("showCateg");
      this.$store.dispatch("emptySubCateg");
    },
    categHide() {
      this.$store.dispatch("hideCateg");
    },
    activeMenu() {
      var $el = document.getElementById("burger");
      var target = $el.dataset.target;
      var $target = document.getElementById(target);
      $el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
      this.$store.dispatch('emptySubCateg')
    },
    selectCategory(value) {
      this.$store.dispatch("updateNav", value);
      this.$store.dispatch("updateSelectedCategory", value);
    },
    initialSubCateg() {
      return (this.$store.state.subCategories[0])
    }
  },
  computed: {
    ...mapGetters({
      categShown: "categShown",
      products: "cartProducts",
      getCategories: "getCategories",
      getSubcateg: "getSubcateg",
      selectedCategory: "getCurrentCategory",
      selectedSubCategory: "getCurrentSubCateg"
    }),

    itemsInCart() {
      let cart = this.$store.getters.cartProducts;
      return cart.reduce((accum, item) => accum + item.quantity, 0);
    },
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.is-gray {
  background-color: rgb(53, 77, 91);
  color: whitesmoke;
}
.cart {
  position: absolute;
  right: 50px;
  top: 0;
}
</style>