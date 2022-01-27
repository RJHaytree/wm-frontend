<template>
  <v-alert
    type="error"
    v-if="error || error.toLowerCase().indexOf('network error') > -1"
  >
    {{ error }}
  </v-alert>
  <div v-if="!error" class="view-departments">
    <div class="section">
      <div id="record-total">
        <p v-if="!filter">
          Total Records
          <span> {{ departments.length }} </span>
        </p>
        <p v-if="filter">
          Found Records
          <span> {{ filteredData.length }} </span>
        </p>
      </div>
      <p id="update">Click a row to start editing</p>
      <div id="filter-form">
        <form @submit.prevent="filterDepartments">
          <label for="filter">Filter </label>
          <input type="text" name="filter" placeholder="Name" />
        </form>
      </div>
    </div>
    <v-alert type="success" v-if="success">
      Department successfully deleted
    </v-alert>
    <div class="table-data">
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th class="description">Description</th>
          <th class="button-stack"></th>
        </tr>

        <hr />

        <div v-if="filteredData.length == 0 && !filter" class="data">
          <tr v-for="department in departments" :key="department.id">
            <router-link :to="'/departments/edit/' + department.id">
              <td>{{ department.id }}</td>
              <td>{{ department.name }}</td>
              <td class="description">{{ department.description }}</td>
            </router-link>
            <td class="button-stack">
              <button @click="deleteDepartment(department.id)">DELETE</button>
            </td>
          </tr>
        </div>

        <div v-if="filteredData.length > 0 && filter" class="data">
          <tr v-for="department in filteredData" :key="department.id">
            <router-link :to="'/departments/edit/' + department.id">
              <td>{{ department.id }}</td>
              <td>{{ department.name }}</td>
              <td class="description">{{ department.description }}</td>
            </router-link>
            <td class="button-stack">
              <button @click="deleteDepartment(department.id)">DELETE</button>
            </td>
          </tr>
        </div>

        <div v-if="filteredData.length == 0 && filter">
          <p id="not-found">No departments found</p>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewDepartments",
  data: () => {
    return {
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Description",
          value: "description",
        },
      ],
      filteredData: [],
      filter: "",
      error: "",
      success: false,
      timer: 3
    };
  },
  methods: {
    filterDepartments(submitEvent) {
      this.filter = submitEvent.target.elements.filter.value.toLowerCase();
      this.filteredData = [];

      if (this.filter) {
        this.departments.forEach((department) => {
          if (department.name.toLowerCase().indexOf(this.filter) > -1) {
            this.filteredData.push(department);
          }
        });
      }
    },
    async deleteDepartment(id) {
      let jsonData = { id: id };
      this.success = false;
      this.error = "";

      if (id) {
        await this.$store.dispatch("deleteDepartment", jsonData);
        this.filteredData = this.filteredData.filter(
          (department) => department.id != id
        );
        this.success = true;

        const delay = (ms) => new Promise((res) => setTimeout(res, ms));

        await delay(1000);

        this.success = false;
      } else {
        this.error = `A department with the ID ${id} does not exist.`;
      }
    },
  },
  computed: {
    departments() {
      return this.$store.getters.allDepartments;
    },
  },
  mounted: async function () {
    try {
      await this.$store.dispatch("getDepartments");
      if (this.$store.getters.allWorkstations.length == 0) {
        await this.$store.dispatch("getWorkstations")
      }
    } catch (e) {
      this.error =
        "A Network Error Occurred. The panel could not access the database. Please contact an administrator.";
    }
  },
};
</script>

<style lang="scss" scoped>
.view-departments {
  overflow-x: auto;
  width: 100%;
  min-width: 600px;
}
.section {
  display: inline-flex;
  height: 80px;
  border-bottom: 2px solid #363a48 !important;
  width: 100%;
  align-items: center;
  text-align: center;
  font-size: 1.2em;
}

#record-total {
  flex: 2;
  color: #ffffff;
  font-weight: 400;
  text-align: left;
  p {
    margin-left: 10%;
  }
  span {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 7px;
    padding-bottom: 7px;
    background-color: #232733;
    border-radius: 5px;
    font-weight: normal;
    margin-left: 5px;
  }
}

#update {
  flex: 3;
  color: #9398a8;
  text-align: center;
}

#filter-form {
  flex: 2;
  form {
    margin-left: auto;
    float: right;
    margin-right: 5%;
    input {
      font-size: 1rem;
      border: 3px solid #363a48;
      padding: 8px;
      color: #9398a8;
      border-radius: 10px;
      margin-left: 10px;
    }

    input:focus {
      color: #ffffff;
      border-color: transparent;
      outline: rgb(1, 108, 238) solid 3px;
      background-color: rgba(38, 67, 74, 0.55) !important;
    }
  }
}

.table-data {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
}

table {
  justify-content: center;
  padding: 0;
  margin: 0;
  border-collapse: collapse;
  width: 100%;
  font-size: 1.1rem;
  table-layout: fixed;
}

tr {
  display: inline-flex;
  width: 80%;
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 7px;
  margin-bottom: 7px;
  border-radius: 10px;
}

th {
  flex: 1.5;
  color: #6b6f7c;
  font-weight: normal;
  padding-top: 13px;
  padding-bottom: 13px;
}

.button-stack {
  flex: 0.9;
}

td {
  flex: 1.55;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  vertical-align: middle;
  color: #6b6f7c;
}

td.button-stack {
  margin-left: auto;
  margin-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
  text-align: right;
}

.description {
  flex: 7;
}

hr {
  border: 1px solid #363a48 !important;
}

a {
  text-decoration: none;
  height: 100%;
  width: 90.5%;
  display: inline-flex;
  padding-top: 13px;
  padding-bottom: 13px;
}

.data tr:hover {
  background-color: rgba(38, 67, 74, 0.55);
  cursor: pointer;

  td {
    color: #ffffff !important;
  }
}

#not-found {
  width: 100%;
  height: 100%;
  margin-top: 40px;
  font-size: 1.5rem;
  color: #6b6f7c;
  text-align: center;
}

button {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #a52222;
  color: #ffffff;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
}

button:hover {
  background-color: #ce3b3b;
}
@media only screen and (max-width: 1300px) {
  .section {
    font-size: 1.3vmax;

    #filter-form form input {
      font-size: 1.2vmax;
    }
  }

  table {
    font-size: 1.3vmax;

    tr {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }
  }
}
</style>
