<template>
  <div id="app">
    <router-link :to="{ name: 'healthBackground' }">health</router-link>
    <router-link :to="{ name: 'loadAvatar' }">avatar</router-link>
    <router-link :to="{ name: 'dailies' }">dailies</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
