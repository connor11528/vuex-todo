# vuex-shopping-cart

> A shopping cart built with Vue 2 and Vuex

### Conclusion

Vuex is a state management package for Vue.js that handles modifications to the state tree within a single source of truth called aptly the State. The State can only be modified with Mutators which must be syncronous functions. To run asynchronous functions or perform other tasks we can define Actions which can be called from components and ultimately call Mutators. We can access the State values within components through Getter functions. The `mapGetters` and `mapActions` can simplify our component definitions.

Though Vuex brings in many new concepts to Vue.js application development it can be very helpful in managing complex application state. It is not necessary or required for many Vue.js applications but learning knowing about it can make you a better, more productive developer.

## Tools

Caching - https://github.com/superwf/vuex-cache

Persist State - https://github.com/robinvdvleuten/vuex-persistedstate

## Local dev and Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

json-server generate.js (to run a local API builder from the generate.js file)

# build for production with minification
npm run build
```
