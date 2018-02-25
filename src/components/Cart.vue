<template>
  <div class="cart modal is-active" id="modal">
		<div class="modal-background" @click.prevent.stop="closemodal()">	<router-link to="/">Go shopping</router-link></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Your Cart</p>
			<p v-show="!products.length">
    	<i>Your cart is empty!</i> &nbsp;
    	<router-link to="/">Go shopping</router-link>
    	</p>
      <span v-show="products.length" class="button"  @click.prevent.stop="closemodal()">	
					<router-link to="/"> X	</router-link>
			</span>
	
    </header>
    <section class="modal-card-body">
				<table class="table is-striped" v-show="products.length">
					<thead>
						<tr>
							<td></td>
							<td>Name</td>
							<td>Price</td>
							<td>Quantity</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="p in products" :key="p.id">
								<td> <img :src="p.image" alt="p.name"></td>
								<td>{{ p.name }}</td>
								<td>{{ p.price | currency }}</td>
								<td> <button @click="decreaseItem(p)"  class="button" >-</button></td>
								<td>{{ p.quantity }}</td>
								<td> <button @click="increaseItem(p)" class="button" >+</button></td>
								<td> <button @click="removeItem(p)" class="button" >Remove</button></td>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
  	checkout(){
  		alert('Pay us $' + this.total)
  	},
		closemodal(){
			// var modal = document.getElementById("modal");
      // modal.classList.remove("is-active");
			 this.$emit('hide');
		},
		...mapActions({
			removeItem: 'removeItem',
			decreaseItem: 'decreaseItem',
			increaseItem: 'increaseItem'
		}),
	},
 
}
</script>
<style scoped>
.modal-car-body {
  background-color: green;
}
</style>
