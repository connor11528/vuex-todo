<template>
<header>
	<nav class="navbar if-fixed has-shadow" >
	  <div class="navbar-brand">
	    <router-link to="/" class="nav-item">
	      <img srcset="/static/logo@1x.png ,
                   /static/logo@2x.png 2x,
                   /static/logo@3x.png 3x"
            src="/static/logo@3x.png" alt="Secure Aid Logo">
	    </router-link>
	  </div>
	  <div class="navbar-menu is-active" id='mainNav' >
			<div class="navbar-end">
	    <div class="nav-item " :class="{ 'active-bottom-border': $route.path === '/cart' }">
	      <div class="field is-grouped">
	        <p class="control">
	          <router-link to='/cart' class="button is-info" >
	            <span class="icon">
              <object data="/static/shopping-cart.svg" type="image/svg+xml"></object>
	            </span>
	            <span> ({{itemsInCart}})</span>
	          </router-link>
	        </p>
	      </div>
	      </div>
	    </div>
	  </div>
	</nav>

	</header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
nav {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
}
.navbar {
  height: auto;
  margin-bottom: 2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .navbar-menu {
    width: auto;
    box-shadow: none;
  }

  .nav-item {
    .field.is-grouped {
      justify-content: center;
    }
  }
}
.nav-item img {
  max-height: 3.5rem;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "../store/index.js";

export default {
  data() {
    return {
      showNav: false
    };
  },
  computed: {
    itemsInCart() {
      let cart = this.$store.getters.cartProducts;
      return cart.reduce((accum, item) => accum + item.quantity, 0);
    }
  }
};
</script>
