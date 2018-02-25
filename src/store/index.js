import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
    added: [],
    all: [],

}

// getters
const getters = {
    allProducts: state => state.all, // would need action/mutation if data fetched async
    getNumberOfProducts: state => (state.all) ? state.all.length : 0,
    cartProducts: state => {
        return state.added.map(({ id, quantity }) => {
            const product = state.all.find(p => p.id === id)
            return {
                name: product.product,
                price: product.price,
                image: product.image,
                id: product.id,
                quantity
            }
        })
    },
    filteredLinks: state => category => state.all.filter(item => item.category === category),

}


// actions
const actions = {
    addToCart({ commit }, product) {
        commit(types.ADD_TO_CART, {
            id: product.id,
        })
    },
    fetchProducts({ commit }) {
        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => {
                commit("FETCH_PRODUCTS", data);

            })
            .catch((error => {
                console.log(error.statusText);
            }));
    },

    removeItem({ commit }, product) {
        commit(types.REMOVE_ITEM, {
            id: product.id
        })
    },
    increaseItem({ commit }, product) {
        commit(types.INCREASE_ITEM, {
            id: product.id,
        })
    },
    decreaseItem({ commit }, product) {
        commit(types.DECREASE_ITEM, {
            id: product.id,
        })
    },


}

// mutations
const mutations = {

    [types.ADD_TO_CART](state, { id }) {
        const record = state.added.find(p => p.id === id)
        if (!record) {
            state.added.push({
                id,
                quantity: 1
            })
        } else {
            record.quantity++
        }
    },
    [types.FETCH_PRODUCTS](state, all) {
        state.all = all
    },
    [types.REMOVE_ITEM](state, { id }) {
        const record = state.added.find(p => p.id === id)
        state.added.splice(record, 1)
    },
    [types.INCREASE_ITEM](state, { id }) {
        const record = state.added.find(p => p.id === id)
        record.quantity++
    },
    [types.DECREASE_ITEM](state, { id }) {
        const record = state.added.find(p => p.id === id)
        record.quantity--
            if (record.quantity < 0) {
                record.quantity = 0
            }
    },
    updateMessage(state, quantity, { id }) {
        const record = state.added.find(p => p.id === id)
        state.added.record = quantity
    }


}

// one store for entire application
export default new Vuex.Store({
    state,
    strict: debug,
    getters,
    actions,
    mutations
})