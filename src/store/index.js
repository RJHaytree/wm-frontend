import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    departments: [],
    workstations: []
  },
  getters: {
    allDepartments: (state) => state.departments,
    allWorkstations: (state) => state.workstations,
    getDepartmentById: (state) => (id) => {
      var result = '';

      for (let i = 0; i < state.departments.length; i++) {
        if (state.departments[i].id == id) {
          result = state.departments[i];
        }
      }

      return result;
    },
    getWorkstationById: (state) => (id) => {
      var result = '';

      for (let i = 0; i < state.workstations.length; i++) {
        if (state.workstations[i].id == id) {
          result = state.workstations[i];
        }
      }

      return result;
    },
    getWorkstatinByDepartment: (state) => (department_id) => {
      return state.workstations.filter(w => w.department_id == department_id);
    }
  },
  mutations: {
    setDepartments(state, departments) {
      state.departments = departments;
    },
    addDepartment(state, department) {
      state.departments.push(department)
    },
    updateDepartment(state, department) {
      let index = -1;

      for (let i = 0; i < state.departments.length; i++) {
        if (state.departments[i].id === department.id) {
          index = i;
        }
      }

      if (index > -1) {
        state.departments[index] = department;
      }
    },
    deleteDepartment(state, response) {
      state.departments = state.departments.filter(d => d.id !== response.id_deleted)
      // delete workstations (cascade)
      state.workstations = state.workstations.filter(w => w.department_id !== response.id_deleted)
    },
    setWorkstations(state, workstations) {
      state.workstations = workstations;
    },
    addWorkstation(state, workstation) {
      state.workstations.push(workstation);
    },
    updateWorkstation(state, workstation) {
      let index = -1;

      for (let i = 0; i < state.workstations.length; i++) {
        if (state.workstations[i].id === workstation.id) {
          index = i;
        }
      }

      if (index > -1) {
        state.workstations[index] = workstation;
      }
    },
    deleteWorkstation(state, response) {
      state.workstations = state.workstations.filter(w => w.id !== response.id_deleted)
    }
  },
  actions: {
    async getDepartments({ commit }) {
      await axios.get('https://wmbackend.azurewebsites.net/depts/')
        .then(response => {
          commit('setDepartments', response.data)
        });
    },
    async getDepartmentById({ commit }, id) {
      await axios.get('https://wmbackend.azurewebsites.net/depts/' + id)
        .then(response => {
          commit('setDepartments', response.data)
        });
    },
    async createDepartment({ commit }, department) {
      await axios.post('https://wmbackend.azurewebsites.net/depts/', {
        name: department.name,
        description: department.description
      }).then(response => {
          commit('addDepartment', response.data)
        });
    },
    async updateDepartment({ commit }, department) {
      await axios.put('https://wmbackend.azurewebsites.net/depts/', department).then(response => {
        commit('updateDepartment', response.data)
      });
    },
    async deleteDepartment({ commit }, id) {
      await axios.delete('https://wmbackend.azurewebsites.net/depts/', { data: id }).then(response => {
        commit('deleteDepartment', response.data)
      });
    },
    async getWorkstations({ commit }) {
      await axios.get('https://wmbackend.azurewebsites.net/works/')
        .then(response => {
          commit('setWorkstations', response.data)
        });
    },
    async getWorkstationById({ commit }, id) {
      await axios.get('https://wmbackend.azurewebsites.net/works/' + id)
        .then(response => {
          commit('setWorkstations', response.data)
        });
    },
    async getWorkstatinByDepartment({ commit }, id) {
      await axios.get('https://wmbackend.azurewebsites.net/works/depts/' + id)
        .then(response => {
          commit('setWorkstations', response.data)
        });
    },
    async createWorkstation({ commit }, workstation) {
      await axios.post('https://wmbackend.azurewebsites.net/works/', {
        name: workstation.name,
        ip_address: workstation.ip_address,
        department_id: workstation.department_id,
        type: workstation.type,
        cpu: workstation.cpu,
        motherboard: workstation.motherboard,
        ram: workstation.ram,
        hdd: workstation.hdd,
        ssd: workstation.ssd,
        conn_type: workstation.conn_type
      }).then(response => {
        commit('addWorkstation', response.data)
      });
    },
    async updateWorkstation({ commit }, workstation) {
      await axios.put('https://wmbackend.azurewebsites.net/works/', workstation).then(response => {
        commit('updateWorkstation', response.data)
      });
    },
    async deleteWorkstation({ commit }, id) {
      await axios.delete('https://wmbackend.azurewebsites.net/works/', { data: id }).then(response => {
        commit('deleteWorkstation', response.data);
      })
    }
  },
  modules: {
  }
})
