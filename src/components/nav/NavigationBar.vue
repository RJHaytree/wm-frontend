<template>
  <div id="navigation">
    <v-navigation-drawer v-if="drawer" v-bind:width="280" absolute permanent :priority="0">
      <v-list :style="{'align-items':'center' }">
        <v-list-item class="logo-container">
          <v-list-item-title class="wm-man-logo">
            <p>Workstation Manager</p>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link v-for="l in links" :key="l.title" @click="this.$store.state.currentPage = l.title" v-bind:style="String(this.$route.name).includes(l.title) ? 'border-left: 5px solid #016CEE; background-color: #232733' : 'border-left: 0'">
          <router-link :to="l.route" class="link-div">
            <v-list-item-title>
              <span>
                <font-awesome-icon class="fa-icon" :icon="[l.icon_prefix , l.icon_name]" /> {{ l.title }}
              </span>
            </v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar v-bind:height="80" absolute elevation="0" :priority="1">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <p>{{  }} </p>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data: () => {
    return {
      drawer: true,
      links: [
          {
              title: "Home",
              route: "/",
              icon_prefix: "fas",
              icon_name: "home"
          },
          {
              title: "Departments",
              route: "/departments",
              icon_prefix: "fas",
              icon_name: "building"
          },
          {
              title: "Workstations",
              route: "/workstations",
              icon_prefix: "fas",
              icon_name: "desktop"
          }
      ]
    };
  },
  methods: {
  },
  beforeMount() {
    this.$store.state.currentPage = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
    .v-list-item-title {
        display: inline-block;
    }

    .v-app-bar {
        background-color: #161922 !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        border-bottom: 1px solid #363A48;

        .v-app-bar-nav-icon {
            margin-left: 10px;
            margin-top: 6px;
            margin-bottom: 6px;
            padding: 5px;
        }

        button {
            border-radius: 8px !important;
            background-color: #161922 !important;
            color: #FFFFFF;
            font-size: 20px;

            a:after {
                background-color: #232733 !important;
            }
        }
    }

    .v-navigation-drawer {
        background-color: #161922 !important;
        border-right: 1px solid #363A48;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        overflow-x: auto;
        color: #ffffff;
    }

    .fa-icon {
        margin-right: 10px;
    }

    .wm-man-logo {
        font-size: 1.3rem;
        font-weight: bold;
        padding-top: 25px;
        padding-bottom: 35px;
    }

    .logo-container {
        border-bottom: 1px solid #363A48;
        text-align: center;
    }
    span {
        font-size: 1.2rem;
        font-family: 'Open Sans', sans-serif !important;
    }

    .v-list-item {
        flex-direction: column;
        border-radius: 0 !important;
        padding: 0 !important;
    }

    .link-div {
        padding-top: 25px !important;
        padding-bottom: 20px !important;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .custom_overlay {
        position: fixed;
        height: 100vh;
        width: 100%;
        background: rgba(50,50,50,0.5);
        z-index:2;
    }
    
</style>
