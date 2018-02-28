<template>
	<div class='section'>
		<h1 class="subtitle">{{ categlength }} Categories</h1>
    <div class="categories">
        <button class="button" v-for="category in getCategories" :key="category.id"  @click="selectedCategory = category" :class="{ 'is-primary': selectedCategory == category }">
          {{ category }} ( {{ categoryCount(category).length }} )
        </button>
    </div>
		<div class="columns is-multiline is-mobile is-variable">
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
          <div class="subtitle">
            {{ link.description }}
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              {{ link.price | currency }}
            </span>
          </p>
          <!-- <p class="card-footer-item">
            <span class="buttons">

              <NumberInput
                :min="0"
                :max="10"
                :step="1"
                :integerOnly="true"
                v-model.number="link.quantity"
              />
            </span>
          </p> -->
          <p class="card-footer-item">
            <a @click.prevent.stop="addToCart(link)" class="button  addtocart" href="#">Add To Cart</a>
          </p>
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
    this.selectedCategory = this.getCategories[0];
  },
  computed: {
    ...mapGetters({
      products: "allProducts",
      length: "getNumberOfProducts"
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
      // decreaseItem: 'decreaseItem',
      // increaseItem: 'increaseItem'
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
.columns {
  margin-top: 2rem;
  margin-left: calc(-1 * 0.75rem);
  margin-right: calc(-1 * 0.75rem);
  justify-content: center;
}
.column {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 0.75rem;
  padding-right: 1 * 0.75rem;
}
.card {
  display: flex;
  flex-direction: column;
}
.card-footer {
  margin-top: auto;
}
.section {
  padding-top: 6rem;
}
@media screen and(max-width: 576px) {
  .column.is-12-phone {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 100%;
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
