<template>
  <div v-if="!this.id" class="not-found">
    <h2>You have selected no department to edit!</h2>
    <p>Head back to the view tab and select a row to update!</p>
  </div>

  <v-alert
    type="error"
    v-if="error || error.toLowerCase().indexOf('network error') > -1"
  >
    {{ error }}
  </v-alert>

  <div v-if="this.id && this.workstation">
    <div class="section">
      <div id="currently-viewing">
        <p>
          ID
          <span>{{ this.id }}</span>
        </p>
      </div>

      <div id="buttons">
        <router-link :to="'/workstations/edit/' + id">
          <button class="edit">EDIT</button>
        </router-link>
      </div>
    </div>

    <div class="main-data">
      <div class="data-table-meta">
        <table>
          <tr>
            <th>Name</th>
            <th>IP Address</th>
            <th>Department</th>
          </tr>
          <hr />
          <tr>
            <td>{{ workstation.name }}</td>
            <td>{{ workstation.ip_address }}</td>
            <td>{{ getDepartmentName(workstation.department_id) }}</td>
          </tr>
        </table>
      </div>
      <hr />
      <div class="data-table-components">
        <h2>Components</h2>
        <table>
          <tr>
            <th>Device Type</th>
            <th>Device CPU</th>
            <th>Motherboard</th>
            <th>RAM</th>
            <th>HDD Storage</th>
            <th>SSD Storage</th>
            <th>Connection Type</th>
          </tr>
          <hr />
          <tr>
            <td>{{ workstation.type.toUpperCase() }}</td>
            <td>{{ workstation.cpu }}</td>
            <td>{{ workstation.motherboard }}</td>
            <td>{{ workstation.ram }}</td>
            <td>{{ workstation.hdd }}</td>
            <td>{{ workstation.ssd }}</td>
            <td>{{ workstation.conn_type }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewSingleWorkstations",
  data: () => {
    return {
      id: "",
      workstation: "",
      error: ""
    };
  },
  methods: {
    getDepartmentName(id) {
      let name = "";
      let department = this.$store.getters.getDepartmentById(id);

      if (department) name = department.name;

      return name;
    }
  },
  mounted: function () {
    this.id = this.$route.params.id;
    this.workstation = "";

    if (this.id) {
      this.workstation = this.$store.getters.getWorkstationById(this.id);
    }

    if (!this.workstation) {
      this.error = `No workstation with an ID of ${this.id} exists. Please choose a valid ID.`;
    }
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  margin-top: 40px;
  text-align: center;
  h2 {
    color: #6b6f7c;
    font-size: 1.7rem;
    font-weight: 500;
    margin-bottom: 10px;
  }
  p {
    color: #6b6f7c;
    font-size: 1.2rem;
  }
}

.section {
  display: inline-flex;
  justify-content: space-between;
  height: 80px;
  border-bottom: 2px solid #363a48 !important;
  width: 100%;
  align-items: center;
  text-align: center;
  font-size: 1.2em;
}

#currently-viewing {
  color: #ffffff;
  font-weight: 400;
  text-align: left;
  margin-left: 3%;
  width: 200px;
  p {
    font-weight: 600;
    font-size: 1.3rem;
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

#buttons {
  margin-right: 3%;

  button {
    color: #ffffff;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 50px;
    padding-left: 50px;
    border-radius: 5px;

    &.edit {
      background-color: #016cee;
    }
  }

  button.edit:hover {
    background-color: #2081f5;
  }

  .button {
    text-align: center;
  }
}

.main-data {
  width: 100%;
  font-size: 1.07rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  tr {
    display: flex;
    margin-right: 5%;
    margin-left: 5%;
    width: 90%;
    margin-top: 7px;
    margin-bottom: 7px;
  }

  td,
  th {
    flex: 1;
    padding-top: 13px;
    padding-bottom: 13px;
  }

  th {
    color: #6b6f7c;
    font-weight: normal;
    justify-content: center;
  }

  td {
    align-items: center;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    color: #ffffff;
  }
}

.data-table-meta table tr {
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
}

.data-table-meta {
  margin-bottom: 90px;
}

hr {
  border: 1px solid #363a48 !important;
}

h2 {
  margin-left: 3%;
  margin-top: 25px;
  font-weight: normal;
  margin-bottom: 35px;
  font-size: 1.8rem;
}

.data-table-components td {
  font-size: 0.9rem;
}

@media only screen and (max-width: 1300px) {
  .main-data {
    min-width: 800px;
  }
}
</style>
