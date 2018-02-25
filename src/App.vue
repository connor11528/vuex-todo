<template>
  <div id="app" class='container'>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
  	NavBar
  },
  data () {
    return {}
  },
  methods: {
  
}
}
</script>
