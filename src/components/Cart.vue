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
						<tr v-for="p in products" :key="p.id">
								<td> <img :src="p.image" alt="p.name"></td>
								<td>{{ p.name }}</td>
								<td>{{ p.price | currency }}</td>
								<td class='has-text-centered'>
										<button @click="decreaseItem(p)"  class="button is-small" >-</button>
										<p >{{ p.quantity }}</p>
										<button @click="increaseItem(p)" class="button is-small" >+</button>
								</td>
								<td> <button @click="removeItem(p)" class="delete is-medium" ></button></td>
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
      <button v-show="products.length" class="button is-success"  @click.prevent.stop="checkout()">Make payment</button>
      <button v-show="products.length" class="button"  @click.prevent.stop="closemodal()">	
					<router-link to="/"> Continue Shopping	</router-link>
			</button>
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
    }
  },
  methods: {
    checkout() {
      alert("Pay us $" + this.total);
    },
    closemodal() {
      // var modal = document.getElementById("modal");
      // modal.classList.remove("is-active");
      this.$emit("hide");
    },
    ...mapActions({
      removeItem: "removeItem",
      decreaseItem: "decreaseItem",
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
tbody td {
  width: 100px;
  vertical-align: middle;
  img {
    width: 50px;
  }
}
</style>
