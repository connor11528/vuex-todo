<template>
	<div class='content main-content'>
		<h1 class="subtitle">{{ categlength }} Categories</h1>
    <div class="categories">
        <button class="button" v-for="category in getCategories" :key="category.id"  @click="selectedCategory = category" :class="{ 'is-gray': selectedCategory == category }">
          {{ category }} ( {{ categoryCount(category).length }} )
        </button>
    </div>
		<div class="columns is-multiline is-mobile no-padding">
      <div class="card column is-12-phone is-6-mobile is-4-tablet is-4-desktop"  v-for="link in filteredLinks" :key="link.id" :class="{current: selectedCategory == link.category }">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="link.image" :alt="link.product">
          </figure>
        </div>
        <div class="card-content">
          <div class="title">
            {{ link.product }} 
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              {{ link.price | currency }}
            </span>
          </p>
          <p class="card-footer-item">
            <a @click.prevent.stop="()=>{addToCart(link); }" class="button is-gray" href="#">Add To Cart</a>
          </p>
          <!-- <p class="card-footer-item" >
            <button @click="decreaseItem(link)"  class="button is-small" >-</button>
              <span >{{ cartItems[link].quantity }}</span>
            <button @click="addToCart(link)" class="button is-small" >+</button>
          </p> -->
        </footer>
      </div>
    </div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import store from "../store/index.js";
import NumberInput from "./NumberInput.vue";

export default {
  name: "Products",
  created() {
    this.$store.dispatch("fetchProducts", { self: this });
  },
  mounted() {
    this.initialcateg;
  },
  computed: {
    ...mapGetters({
      products: "allProducts",
      length: "getNumberOfProducts",
      cartItems: "cartProducts"
    }),
    filteredLinks() {
      return this.$store.getters.filteredLinks(this.selectedCategory);
    },
    getCategories() {
      let categoriesSet = new Set();
      this.$store.state.all.forEach(link => {
        categoriesSet.add(link.category);
      });
      return (this.categories = Array.from(categoriesSet));
    },
    initialcateg() {
      setTimeout(() => {
        return (this.selectedCategory = this.getCategories[0]);
      }, 150);
    },
    categlength() {
      return this.categories ? this.categories.length : 0;
    }
  },
  methods: {
    categoryCount(category) {
      return this.products.filter(link => {
        return link.category.match(category);
      });
    },
    ...mapActions({
      addToCart: "addToCart"
    })
  },
  data() {
    return {
      selectedCategory: "",
      categories: []
    };
  },
  components: {
    NumberInput
  }
};
</script>

<style lang="scss">
.main-content {
  padding-top: 2rem;
}
.no-padding {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
.columns {
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
  .column {
    margin-right: 2rem;
    margin-left: 2rem;
    padding-left: -1rem;
    padding-right: -1rem;
  }
  figure {
    margin-left: 0;
    margin-right: 0;
  }
}

.column {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.card {
  display: flex;
  flex-direction: column;
}

.button.is-gray {
  border-color: whitesmoke;
  background: rgb(53, 77, 91);
  outline: none;
  color: whitesmoke;
  &:active,
  &:focus {
    border-color: whitesmoke;
    background: rgb(53, 77, 91);
    outline: none;
    color: whitesmoke;
  }
}
.card-footer {
  margin-top: auto;
}

@media screen and(max-width: 576px) {
  .column.is-12-phone {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .columns {
    .column {
      margin-left: 0;
      margin-right: 0;
    }
  }
}
.input {
  width: 50px;
  margin-left: 0;
  margin-right: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
