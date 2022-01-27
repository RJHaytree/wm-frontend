<template>
  <div v-if="!this.id" class="not-found">
    <h2>You have selected no workstation to edit!</h2>
    <p>Head back to the view tab and select a row to update!</p>
  </div>

  <div v-if="id">
    <div v-if="workstation">
      <div class="section">
        <div class="currently-editing">
          <p>Currently editing Workstation</p>
          <span>{{ this.id }}</span>
        </div>
      </div>

      <v-alert v-if="error" type="error">{{ error }}</v-alert>

      <v-alert v-if="success" type="success">
        Workstation successfully updated. Redirecting in
        {{ this.timer }}...</v-alert
      >

      <div class="table">
        <form @submit.prevent="updateWorkstation">
          <div class="row">
            <!-- Name field -->
            <div class="col-20">
              <label for="name">Name: </label>
            </div>
            <div class="col-80">
              <input type="text" name="name" v-model="workstation.name" />
            </div>
          </div>
          <!-- IP Address field -->
          <div class="row">
            <div class="col-20">
              <label for="ip_address">IP Address: </label>
            </div>
            <div class="col-80">
              <input
                type="text"
                name="ip_address"
                v-model="workstation.ip_address"
              />
            </div>
          </div>
          <!-- Department ID field -->
          <div class="row">
            <div class="col-20">
              <label for="department_id">Department ID: </label>
            </div>
            <div class="col-80">
              <input
                type="text"
                name="department_id"
                v-model="workstation.department_id"
              />
            </div>
          </div>

          <hr>
          <!-- Component fields -->

          <!-- Type field -->
          <div class="row">
            <div class="col-20">
              <label for="type">Device Type: </label>
            </div>
            <div class="col-80">
              <input type="text" name="type" v-model="workstation.type" />
            </div>
          </div>
          <!-- CPU field -->
          <div class="row">
            <div class="col-20">
              <label for="cpu">CPU: </label>
            </div>
            <div class="col-80">
              <input type="text" name="cpu" v-model="workstation.cpu" />
            </div>
          </div>
          <!-- Motherboard field -->
          <div class="row">
            <div class="col-20">
              <label for="motherboard">Motherboard: </label>
            </div>
            <div class="col-80">
              <input
                type="text"
                name="motherboard"
                v-model="workstation.motherboard"
              />
            </div>
          </div>
          <!-- RAM field -->
          <div class="row">
            <div class="col-20">
              <label for="ram">RAM: </label>
            </div>
            <div class="col-80">
              <input type="text" name="ram" v-model="workstation.ram" />
            </div>
          </div>
          <!-- HDD field -->
          <div class="row">
            <div class="col-20">
              <label for="hdd">HDD: </label>
            </div>
            <div class="col-80">
              <input type="text" name="hdd" v-model="workstation.hdd" />
            </div>
          </div>
          <!-- SSD field -->
          <div class="row">
            <div class="col-20">
              <label for="ssd">SSD: </label>
            </div>
            <div class="col-80">
              <input type="text" name="ssd" v-model="workstation.ssd" />
            </div>
          </div>
          <!-- Conn Type field -->
          <div class="row">
            <div class="col-20">
              <label for="conn_type">Conn Type: </label>
            </div>
            <div class="col-80">
              <input
                type="text"
                name="conn_type"
                v-model="workstation.conn_type"
              />
            </div>
          </div>
          <!-- Submit button -->
          <div class="row button">
            <button>UPDATE</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditWorkstations",
  data: () => {
    return {
      id: "",
      workstation: "",
      error: "",
      timer: 3,
      success: false,
    };
  },
  methods: {
    async updateWorkstation(submitEvent) {
      // reset error
      this.error = "";
      this.success = false;

      let id = this.id;
      let name = submitEvent.target.elements.name.value;
      let type = submitEvent.target.elements.type.value;
      let ip_address = submitEvent.target.elements.ip_address.value;
      let cpu = submitEvent.target.elements.cpu.value;
      let motherboard = submitEvent.target.elements.motherboard.value;
      let ram = submitEvent.target.elements.ram.value;
      let hdd = submitEvent.target.elements.hdd.value;
      let ssd = submitEvent.target.elements.ssd.value;
      let conn_type = submitEvent.target.elements.conn_type.value;
      let department_id = submitEvent.target.elements.department_id.value;

      const workstation = {
        id: id,
        name: name,
        type: type,
        ip_address: ip_address,
        cpu: cpu,
        motherboard: motherboard,
        ram: ram,
        hdd: hdd,
        ssd: ssd,
        conn_type: conn_type,
        department_id: department_id
      };

      // Not all workstations will have a named motherboard
      if (!workstation.motherboard) {
        workstation.motherboard = 'N/A';
      }

      if (this.$store.getters.getDepartmentById(department_id)) {
        if (workstation.id && workstation.name && workstation.type && workstation.ip_address && workstation.cpu && workstation.motherboard && workstation.ram && workstation.hdd && workstation.ssd && workstation.conn_type && workstation.department_id) {
          try {
            await this.$store.dispatch("updateWorkstation", workstation);
            this.success = true;

            const delay = (ms) => new Promise((res) => setTimeout(res, ms));
            this.timer = 3;

            while (this.timer > 0) {
              await delay(1000);
              --this.timer;
            }

            if (!this.error && this.success) {
              this.$router.push("/workstations/" + id);
            }
          }
          catch (e) {
            this.error = "An error has occurred when communicating with the database. Please contact an administrator."
          }
        }
        else {
          this.error = "the only field that can remain empty is the motherboard field!";
        }
      }
      else {
        this.error = "No department with an ID of " + department_id + " exists!";
      }
    },
  },
  mounted: function () {
    this.id = this.$route.params.id;
    this.workstation = "";

    if (this.id) {
      this.workstation = this.$store.getters.getWorkstationById(this.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.section {
  height: 80px;
  border-bottom: 2px solid #363a48 !important;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;

  .currently-editing {
    color: #ffffff;
    font-weight: 400;
    text-align: center;

    p {
      display: inline;
    }
    span {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 7px;
      padding-bottom: 7px;
      background-color: #232733;
      border-radius: 5px;
      font-weight: normal;
      margin-left: 10px;
    }
  }
}

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

.table {
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  min-height: 200px;
  height: 100%;
}

form {
  margin-top: 30px;
}

label {
  display: inline-block;
  padding: 8px;
}

input {
  font-size: 1rem;
  border: 3px solid #363a48;
  padding: 8px;
  color: #9398a8;
  border-radius: 10px;
  width: 100%;
}

.col-20 {
  float: left;
  width: 20%;
  margin-top: 6px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
  height: 10px;
}

.col-80 {
  float: left;
  width: 80%;
  margin-top: 6px;
}

label {
  justify-content: center;
  text-align: center;
}

input:focus {
  color: #ffffff;
  border-color: transparent;
  outline: rgb(1, 108, 238) solid 3px;
  background-color: rgba(38, 67, 74, 0.55) !important;
}

button {
  background-color: rgb(28, 104, 28);
  color: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 50px;
  padding-left: 50px;
  border-radius: 5px;
  margin-top: 10px;
}

button:hover {
  background-color: rgb(44, 150, 44);
}

.button {
  text-align: center;
}

.row {
  width: 60%;
  margin: 0 auto;
  max-width: 1000px;
}

hr {
  border: 1px solid #363a48 !important;
  margin-top: 30px;
  margin-bottom: 30px;
}

@media screen and (max-width: 1500px) {
  .col-80 {
    width: 75%;
  }

  .col-20 {
    width: 25%;
  }
}

@media screen and (max-width: 850px) {
  .table {
    width: 95%;
  }
  .col-80,
  .col-20,
  button {
    width: 100%;
    margin-top: 0;
  }

  button {
    margin-top: 30px;
  }
}
</style>
