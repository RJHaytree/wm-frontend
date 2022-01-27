<template>
  <div id="add-department">
    <v-alert v-if="error" type="error"> {{ error }} </v-alert>

    <v-alert v-if="success" type="success">
      Department successfully created. Redirecting in
      {{ this.timer }} ...</v-alert>

    <div class="table">
      <form @submit.prevent="addDepartment" name="add-form">
        <div class="row">
          <div class="col-15">
            <label for="name">Name: </label>
          </div>
          <div class="col-85">
            <input type="text" name="name" />
          </div>
        </div>
        <div class="row">
          <div class="col-15">
            <label for="department">Department:</label>
          </div>
          <div class="col-85">
            <input type="text" name="description" />
          </div>
        </div>
        <div class="row button">
          <button>ADD</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddDepartments",
  data: () => {
    return {
      error: "",
      timer: 3,
      success: false,
      in_progress: false,
    };
  },
  methods: {
    async addDepartment(submitEvent) {
      if (this.in_progress) {
        return;
      } else if (!this.in_progress) {
        this.in_progress = true;
        this.error = "";
        this.success = false;

        let name = submitEvent.target.elements.name.value;
        let description = submitEvent.target.elements.description.value;

        const department = {
          name: name,
          description: description,
        };

        if (department.name && department.description) {
          try {
            await this.$store.dispatch("createDepartment", department);
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
              "An error has occured when creating the department. Contact an administrator.";
          }
        } else {
          this.error = "The name and description cannot be empty";
        }
      } else {
        this.error = "The department's name and description must not be empty!";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
