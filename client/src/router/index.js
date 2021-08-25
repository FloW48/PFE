import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddStatut from '../views/statuts/AddStatut.vue'
import ListStatut from '../views/statuts/ListStatut.vue'
import AddEnseignant from '../views/enseignants/AddEnseignant.vue'
import ListEnseignant from '../views/enseignants/ListEnseignant.vue'
import EditEnseignant from '../views/enseignants/EditEnseignant.vue'
import AddProjet from '../views/projets/AddProjet.vue'
import ListProjet from '../views/projets/ListProjet.vue'
import ListEnseignantForAddProjet from '../views/enseignants/ListEnseignantForAddProjet.vue'
import ListIntervenantFromProject from '../views/projets/ListIntervenantFromProject.vue'
import Decomposition from '../views/decompositions/Decomposition.vue'
import CreateFormation from '../views/formations/CreateFormation.vue'

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
    path: "/getStatuts",
    name: "ListStatut",
    component : ListStatut
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
  },
  {
    path: "/editEnseignants",
    name: "EditEnseignant",
    component : EditEnseignant
  },
  {
    path: "/addProjet",
    name: "AddProjet",
    component : AddProjet
  },
  {
    path: "/getProjets",
    name: "ListProjet",
    component : ListProjet
  },
  {
    path: "/addEnseignantToProjet",
    name: "ListEnseignantForAddProjet",
    component : ListEnseignantForAddProjet
  },
  {
    path: "/getIntervenants",
    name: "ListIntervenantFromProject",
    component : ListIntervenantFromProject
  },
  {
    path: "/decomposition/:idFormation",
    name: "Decomposition",
    component : Decomposition
  },
  {
    path: "/addFormation",
    name: "CreateFormation",
    component : CreateFormation
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
