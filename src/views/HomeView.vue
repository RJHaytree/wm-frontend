<template>
  <div class="home">
    <div class="header">
      <h1>{{ headerData.title }}</h1>
      <p v-if="headerData.message.length > 0">{{ headerData.message }}</p>

      <div class="seperator"></div>

      <div class="tabs-container" v-if="headerData.tabs.length > 0">
        <div class="tab" v-for="tab in headerData.tabs" :key="tab.title" @click="changeComponent(tab.component)" v-bind:style="currentComponent == tab.component ? 'border-bottom: 3px solid #016cee' : 'border-bottom: 0'">
          <span> {{ tab.title }} </span>
        </div>
      </div>
    </div>
    <hr />
    <div class="main-content">
      <div class="link-blocks">
        <router-link to="/departments">
          <div class="link-block">
            <div class="block-content">
              <span>
                <font-awesome-icon
                  class="fa-icon"
                  :icon="['fas', 'building']"
                />
                <p>Departments</p>
              </span>
            </div>
          </div>
        </router-link>

        <router-link to="/workstations">
          <div class="link-block">
            <div class="block-content">
              <span>
                <font-awesome-icon class="fa-icon" :icon="['fas', 'desktop']" />
                <p>Workstations</p>
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeView",
  components: {
  },
  data: () => {
    return {
      headerData: {
        title: "Home",
        message: "Welcome back, Ryan",
        tabs: [],
      },
    }
  }
};
</script>

<style lang="scss" scoped>

.header {
  padding-top: 30px;
  padding-left: 60px;
  padding-right: 15px;

  h1 {
    font-weight: 400;
    font-size: 2.6rem;
    padding-top: 20px;
    padding-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    padding-bottom: 15px;
  }

  .seperator {
    padding-bottom: 30px;
  }

  .tabs-container {
    height: 60px;
    display: inline-flex;
    width: auto;

    .tab {
      height: 100%;
      min-width: 150px;
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 0 auto;
      vertical-align: middle;
      cursor: pointer;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }

    .tab:hover {
      border-bottom: 3px solid #016cee;
      background-color: #232733;
    }
  }
}

hr {
  border: 1px solid #363a48 !important;
}

.main-content {
  padding-left: 60px;
  padding-top: 60px;
  padding-bottom: 30px;
  padding-right: 30px;
  min-height: 100%;
  min-width: 100%;

  .link-blocks {
    display: flex;
    flex-wrap: wrap;
  }

  .link-block {
    height: 200px;
    width: 200px;
    display: inline-flex;
    background-color: rgba(38, 67, 74, 0.55);
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 15px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

    .block-content {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 0 auto;
      vertical-align: middle;

      .fa-icon {
        font-size: 4rem;
        margin: 0 auto;
        margin-bottom: 20px;
      }

      p {
        font-size: 1.2rem;
        text-decoration-line: none !important;
      }
    }
  }

  .link-block:hover {
    border: 3px solid #016cee;
    background-color: #232733;
  }

  a {
    text-decoration: none !important;
    cursor: pointer;
  }
}
</style>
