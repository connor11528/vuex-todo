<template>
  <div class="cart modal is-active" id="modal">
	<router-link to="/">	<div class="modal-background" ></div></router-link>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Cart total <span> {{ total |currency}}</span> </p>
			<p v-show="!products.length">
    	<i>Your cart is empty!</i> &nbsp;
    	<router-link to="/">Go shopping</router-link>
    	</p>
     	<router-link to="/">  
			 <span v-show="products.length" class="delete"></span>
			 </router-link>
    </header>
    <section class="modal-card-body">
				<table class="table is-striped is-fullwidth is-narrow" v-show="products.length">
					<thead>
						<tr>
							<td></td>
							<td>Name</td>
							<td>Price</td>
							<td>Qty</td>
						</tr>
					</thead>
					<tbody class='vertical-align'>
						<tr v-for="(p) in products" :key="p.id">
								<!-- <td> <img :src="p.image" alt="p.name"></td> -->
								<td>{{ p.name }}</td>
								<td>{{ p.price | currency }}</td>
								<td class='has-text-centered cart-buttons'>
										<button @click="decreaseItem(p)"  class="button is-medium" >-</button>
										<p >{{ p.quantity }}</p>
										<button @click="increaseItem(p)" class="button is-medium" >+</button>
								</td>
								<td> <button @click="removeThisItem(p)" class="delete is-large" ></button></td>
							</tr>
							<tr>
								<td><b>Total:</b></td>
								<td></td>
								<td><b>{{ total |currency }}</b></td>
							</tr>
					</tbody>
    </table>
    </section>
    <footer class="modal-card-foot">
      <router-link to="/">
        <button v-show="products.length" class="button is-payment"  @click="checkout()"> Pay</button>
      </router-link>
			<router-link to="/">
        <button v-show="products.length" class="button is-gray is-reverted is-outlined" >	
          Continue Shopping	
			  </button>
      </router-link>
    </footer>
  </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      products: "cartProducts"
    }),
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    },
    removeThisItem(p) {
      return this.removeItem;
    }
  },
  methods: {
    checkout() {
      alert("Pay us £" + this.total);
      this.resetStore();
    },
    ...mapActions({
      removeItem: "removeItem",
      decreaseItem: "decreaseItem",
      resetStore: "resetStore",
      increaseItem: "increaseItem"
    })
  }
};
</script>

<style lang="scss" scoped>
.modal-card {
  padding-top: 4rem;
}
.modal-card-body {
  padding: 15px 10px;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
.modal-card-body table tbody td {
  width: 100px;
  vertical-align: middle;
}
td .cart-buttons {
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -7px;
  padding-bottom: 7px;
  .button.is-medium {
    background-color: rgb(55, 178, 158);
    color: whitesmoke;
  }
}
.modal-card-foot {
  display: flex;
  justify-content: space-around;
}
.is-payment {
  background-color: rgb(55, 178, 158);
  color: whitesmoke;
}
</style>
