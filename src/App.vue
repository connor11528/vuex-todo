<template>
  <div id="app" class='container'>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { mapActions } from "vuex";
// not sure we need the whole font-awesome when we could use the fontawesome - svg-png from github already
// require('../node_modules/@fortawesome/fontawesome-free-regular')
// require('../node_modules/@fortawesome/fontawesome-common-types')
export default {
  name: "app",
  components: {
    NavBar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
@import "../node_modules/bulma/css/bulma.css";
object {
  pointer-events: none;
}
</style>

