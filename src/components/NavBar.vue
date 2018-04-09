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
      
        <div href="#"  v-for="category in menuItems" class="navbar-item has-dropdown" :key="category.id" > 
          <a class='navbar-link' @click="selectCategory(category.name); activeMenu(); categHide(); filteredProducts(category.name); initialSubCateg()" :class="{'is-gray is-active': selectedCategory == category  }" >
            {{category.name}}
          </a>
          <div class='navbar-dropdown'  v-if='selectedCategory'>
            <a class='navbar-item' v-for="subcategory in menuItems.subcategory " :key="subcategory.id" @click="activeMenu(); categHide(); subCat = subcategory ; selectSubCategory(subcategory) ; " :class="{ 'is-gray is-active':  subCat == subcategory }">
              {{ subcategory}}
            </a>
          </div> 
        </div>
      </div>
    </div>
	</nav>
</header>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      subCat: "",
      menuItems: ""
    };
  },
  created() {
    this.$store.dispatch("fetchProducts");
    setTimeout(() => {
      this.$store.commit("getCategories");
    }, 150);
  },
  methods: {
    initialSubCateg() {
      setTimeout(() => {
        this.$store.commit("initialSubCateg");
        this.subCat = this.initialSubCat;
      }, 50);
    },
    filteredProducts(value) {
      this.$store.commit("filteredProducts", value);
    },

    changeCateg() {
      this.$store.commit("showCateg");
      this.$store.commit("emptySubCateg");
    },
    categHide() {
      this.$store.commit("hideCateg");
    },
    activeMenu() {
      var $el = document.getElementById("burger");
      var target = $el.dataset.target;
      var $target = document.getElementById(target);
      $el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
      this.$store.commit("emptySubCateg");
    },
    selectCategory(value) {
      this.$store.commit("updateNav", value);
      this.$store.commit("updateSelectedCategory", value);
    },

    selectSubCategory(value) {
      this.$store.commit("updateSelectedSubCateg", value);
      this.subCat = this.selectedSubCategory;
    }
  },
  mounted() {
    setTimeout(() => {
      this.menuItems = this.$store.getters.menuItems;
    }, 50);
  },
  computed: {
    ...mapGetters({
      categShown: "categShown",
      products: "cartProducts",
      getCategories: "getCategories",
      getSubcateg: "getSubcategs",
      selectedCategory: "getCurrentCategory",
      selectedSubCategory: "getCurrentSubCateg",
      initialSubCat: "initialSubCat"
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
  },
  watch: {
    selectedSubCategory(newval, old) {
      if (newval === "") this.subCat = old;
      else this.subCat = newval;
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