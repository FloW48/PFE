import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddStatut from '../views/statuts/AddStatut.vue'
import AddEnseignant from '../views/enseignants/AddEnseignant.vue'
import ListEnseignant from '../views/enseignants/ListEnseignant.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/statut',
    name: "Statut",
    component : AddStatut
  },
  {
    path: "/enseignant",
    name: "AddEnseignant",
    component : AddEnseignant
  },
  {
    path: "/getEnseignants",
    name: "ListEnseignant",
    component : ListEnseignant
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
