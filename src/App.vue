<template>
  <v-app>
    <NavigationBar />
    <v-main fluid>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from './components/nav/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  },
  data: () => ({
    //
  })
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
  color: #ffffff;
  font-size: 1.1rem;
}
.v-ripple__container {
    display: none !important;
}

html, body {
    background-color: #161922 !important;
    overflow-y: hidden !important;
    height: 100vh;
}

.v-main {
      background-color: #161922 !important;
      overflow-y: hidden;
}

#app {
    overflow-y: hidden;
    overflow-x: hidden;
}

.v-main, .v-main__wrap {
  overflow: auto !important;
  height: 100% !important;
  max-height: 100vh;
  padding-bottom: 50px;
}

.error {
  margin-left: 5%;
  margin-top: 5%;

  h1 {
    font-size: 1.5rem;
    color: rgb(187, 33, 33);
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: rgb(212, 49, 49)
  }
}

.v-alert__content{
  text-align: center;
}

.bg-error {
  background-color: #722222 !important;
}

.bg-success {
  background-color: rgb(28, 104, 28) !important;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #242836;
}

::-webkit-scrollbar-thumb {
  background-color: #444a63;
  border-radius: 10px;
}

::-webkit-scrollbar-corner {
  background-color: #242836;
}

</style>
