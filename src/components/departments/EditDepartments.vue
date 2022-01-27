<template>
  <div v-if="!this.id" class="not-found">
    <h2>You have selected no department to edit!</h2>
    <p>Head back to the view tab and select a row to update!</p>
  </div>

  <div v-if="this.id">
    <div v-if="departments">
      <div class="section">
        <div class="currently-editing">
          <p>Currently editing Department</p>
          <span>{{ this.id }}</span>
        </div>
      </div>

      <v-alert v-if="error" type="error"> {{ error }} </v-alert>

      <v-alert v-if="success" type="success">
        Department successfully updated. Redirecting in
        {{ this.timer }} ...</v-alert
      >

      <div class="table">
        <form @submit.prevent="updateDepartment">
          <div class="row">
            <div class="col-15">
              <label for="name">Name: </label>
            </div>
            <div class="col-85">
              <input 
                type="text" 
                name="name" 
                v-model="departments.name" 
              />
            </div>
          </div>
          <div class="row">
            <div class="col-15">
              <label for="department">Department:</label>
            </div>
            <div class="col-85">
              <input
                type="text"
                name="description"
                v-model="departments.description"
              />
            </div>
          </div>
          <div class="row button">
            <button>UPDATE</button>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="not-found">
      <h2>No department exists with the ID: {{ this.id }}</h2>
      <p>Head back to the view tab and select a row to update!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditDepartments",
  data: () => {
    return {
      id: "",
      departments: "",
      error: "",
      timer: 3,
      success: false,
    };
  },
  methods: {
    async updateDepartment(submitEvent) {
      // reset error
      this.error = "";
      this.success = false;

      let id = this.id;
      let name = submitEvent.target.elements.name.value;
      let description = submitEvent.target.elements.description.value;

      const department = {
        id: id,
        name: name,
        description: description,
      };

      if (department.id && department.name && department.description) {
        try {
          await this.$store.dispatch("updateDepartment", department);
          this.success = true;

          const delay = (ms) => new Promise((res) => setTimeout(res, ms));
          this.timer = 3;

          while (this.timer > 0) {
            await delay(1000);
            --this.timer;
          }

          if (!this.error && this.success) {
            this.$router.push("/departments");
          }
        } catch (e) {
          this.error =
            "An error has occurred when communicating with the database. Please contact an administrator.";
        }
      } else {
        this.error = "The department's name and description must not be empty!";
      }
    },
  },
  mounted: function () {
    this.id = this.$route.params.id;
    this.departments = "";

    if (this.id) {
      this.departments = this.$store.getters.getDepartmentById(this.id);
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
  width: 70%;
  justify-content: center;
  margin: 0 auto;
  min-height: 200px;
  height: 100%;
  max-width: 950px;
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

.col-15 {
  float: left;
  width: 15%;
  margin-top: 6px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
  height: 10px;
}

.col-85 {
  float: left;
  width: 85%;
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

@media screen and (max-width: 850px) {
  .col-85 {
    width: 75%;
  }

  .col-15 {
    width: 25%;
  }
}

@media screen and (max-width: 750px) {
  .table {
    width: 95%;
  }
  .col-85,
  .col-15,
  button {
    width: 100%;
    margin-top: 0;
  }

  button {
    margin-top: 30px;
  }
}
</style>
