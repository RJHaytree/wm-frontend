<template>
  <div class="home">
    <div class="header">
      <h1>{{ headerData.title }}</h1>
      <p v-if="headerData.message.length > 0">{{ headerData.message }}</p>

      <div class="seperator"></div>

      <div class="tabs-container" v-if="headerData.tabs.length > 0">
        <div class="tab" v-for="tab in headerData.tabs" :key="tab.title" v-bind:style="currentComponent == tab.component || currentRouteName.indexOf(tab.title) > -1 ? 'border-bottom: 3px solid #016cee' : 'border-bottom: 0'">
          <router-link v-if="tab.title !== 'View'" :to="'/workstations/' + tab.title.toLowerCase()">
            <span> {{ tab.title }} </span>
          </router-link>
          <router-link v-if="tab.title == 'View'" :to="'/workstations'">
            <span> {{ tab.title }} </span>
          </router-link>
        </div>
      </div>
    </div>
    <hr />

    <component v-bind:is="currentComponent"></component>
  </div>
</template>

<script>
import ViewWorkstations from "@/components/workstations/ViewWorkstations.vue";
import EditWorkstations from "@/components/workstations/EditWorkstations.vue";
import AddWorkstations from "@/components/workstations/AddWorkstations.vue";
import ViewSingleWorkstations from "@/components/workstations/ViewSingleWorkstations.vue";
import { markRaw } from "@vue/reactivity";

// Workaround for Vue's memory management warning referring to components
// being made reactive. MarkRaw is used as ShallowRef breaks all functionality.
const view = markRaw(ViewWorkstations);
const add = markRaw(AddWorkstations);
const edit = markRaw(EditWorkstations);
const viewSingle = markRaw(ViewSingleWorkstations);

const tabs = [view, add, edit, viewSingle];

export default {
  name: "WorkstationView",
  components: {
    ViewWorkstations,
    EditWorkstations,
    AddWorkstations,
    ViewSingleWorkstations
  },
  data: () => {
    return {
      currentComponent: 'null',
      headerData: {
        title: "Workstations",
        message: "",
        tabs: [
          { title: "View", component: tabs[0] },
          { title: "Add", component: tabs[1] },
          { title: "Edit", component: tabs[2] },
        ],
      },
      componentCache: []
    }
  },
  methods: {
    changeComponent: function (component) {
      let componentIndex = this.componentCache.indexOf(component);

      if (componentIndex >= 0) {
        this.currentComponent = this.componentCache[componentIndex];
      } else {
        this.currentComponent = component;
        this.componentCache.push(this.currentComponent);
      }
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  beforeMount: function() {
    this.$nextTick(() => {
      if (this.currentRouteName == "AddWorkstations") {
        this.currentComponent = tabs[1];
      } else if (this.currentRouteName == "EditWorkstations" || this.currentRouteName.indexOf("Edit") > -1) {
        this.currentComponent = tabs[2];
      } else if (this.currentRouteName == "ViewSingleWorkstations") {
        this.currentComponent = tabs[3];
      } else {
        this.currentComponent = tabs[0];
      }
    });
  },
  updated: function() {
    this.$nextTick(() => {
      if (this.currentRouteName == "AddWorkstations") {
        this.currentComponent = tabs[1];
      } else if (this.currentRouteName == "EditWorkstations" || this.currentRouteName.indexOf("Edit") > -1) {
        this.currentComponent = tabs[2];
      } else if (this.currentRouteName == "ViewSingleWorkstations") {
        this.currentComponent = tabs[3];
      } else {
        this.currentComponent = tabs[0];
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding-top: 30px;
  padding-left: 60px;
  padding-right: 15px;
  width: 100%;
  margin: 0;
  position: relative;

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

    .tab,
    a {
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
      text-decoration: none;
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

@media only screen and (max-width: 600px) {
  .header {
    min-width: 100%;
    padding-left: 5%;
    padding-right: 5%;

    .tabs-container {
      display: flex;

      .tab {
        flex: 1;
        min-width: 33%;
      }
    }
  }

  .section {
    min-width: 600px;
  }

  hr {
    min-width: 600px;
  }
}
</style>
