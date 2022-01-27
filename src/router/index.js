import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/workstations',
    name: 'Workstations',
    component: () => import('../views/WorkstationView.vue'),
    children: [
      {
        path: ':id',
        name: 'ViewSingleWorkstations',
        component: () => import('../views/WorkstationView.vue')
      },
      {
        path: 'add',
        name: 'AddWorkstations',
        component: () => import('../views/WorkstationView.vue')
      },
      {
        path: 'edit',
        name: 'EditWorkstations',
        component: () => import('../views/WorkstationView.vue')
      },
      {
        path: 'edit/:id',
        name: 'EditWorkstationsWithID',
        component: () => import('../views/WorkstationView.vue')
      }
    ]
  },
  {
    path: '/departments',
    name: 'Departments',
    component: () => import('../views/DepartmentView.vue'),
    children: [
      {
        path: 'add',
        name: 'AddDepartments',
        component: () => import('../views/DepartmentView.vue')
      },
      {
        path: 'edit',
        name: 'EditDepartments',
        component: () => import('../views/DepartmentView.vue')
      },
      {
        path: 'edit/:id',
        name: 'EditDepartmentsWithID',
        component: () => import('../views/DepartmentView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page Not Found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
