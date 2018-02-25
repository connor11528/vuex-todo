<template>
<header>
	<nav class="navbar is-fixed-top has-shadow" style='box-shadow: 0 1px 0 rgba(219,219,219,.3);'>
	  <div class="navbar-brand">
	    <router-link to="/" class="nav-item">
	      <img src="../assets/logo.png" alt="Bulma logo">
	    </router-link>
	  </div>

	  <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
	  <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
	  <span class="navbar-burger burger"  data-target="mainNav" @click="showNav = !showNav" :class="{ 'is-active' : showNav }">
	    <span></span>
	    <span></span>
	    <span></span>
	  </span>

	  <!-- This "nav-menu" is hidden on mobile -->
	  <!-- Add the modifier "is-active" to display it on mobile -->
	  <div class="navbar-menu" id='mainNav' v-bind:class="{ 'is-active' : showNav }">
			 <div class="navbar-end">
	    <router-link to="/" class="nav-item " exact-active-class="is-active">
	      Shop
	    </router-link>

	    <div class="nav-item " :class="{ 'active-bottom-border': $route.path === '/cart' }">
	      <div class="field is-grouped">
	        <p class="control">
	          <router-link to='/cart' class="button is-info" >
	            <span class="icon">
	              <i class="fa fa-shopping-cart"></i>
	            </span>
	            <span>Checkout ({{itemsInCart}})</span>
	          </router-link>
	        </p>
	      </div>
	      </div>
	    </div>
	  </div>
	</nav>

	</header>
</template>

<style lang="scss">
.navbar {
	height: auto;
	margin-bottom: 2rem;
	display: flex;
	flex-flow: row wrap;

.navbar-menu {
	width: 100%;
}

}
.nav-item img {
    max-height: 3.5rem;
}

.active-bottom-border {
	border-bottom: 3px solid #00d1b2;
    color: #00d1b2;
    padding-bottom: calc(.75rem - 8px);
}
</style>

<script>

import { mapGetters, mapActions } from 'vuex'
import store from '../store/index.js'

export default {
	data(){
		return {
			showNav: false
		}
	},
	computed: {
		itemsInCart(){
			let cart = this.$store.getters.cartProducts;
			return cart.reduce((accum, item) => accum + item.quantity, 0)
		},
	},

}
</script>
