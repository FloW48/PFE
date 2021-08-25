<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
          <v-spacer></v-spacer>      <v-spacer></v-spacer>
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Status
            </div>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in itemsStatut"
              :key="index"
            >
              <a :href= item.link >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </a>
            </v-list-item>
          </v-list>
        </v-menu>

      <v-spacer></v-spacer>

         <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Enseignants
            </div>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in itemsEnseignant"
              :key="index"
            >
              <a :href= item.link >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </a>
            </v-list-item>
          </v-list>
        </v-menu>
      <v-spacer></v-spacer>
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Projets
            </div>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in itemsProjet"
              :key="index"
            >
              <a :href= item.link >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </a>
            </v-list-item>
          </v-list>
        </v-menu>
      <v-spacer></v-spacer>

        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Formations
            </div>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in itemsFormation"
              :key="index"
            >
              <a :href= item.link >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </a>
            </v-list-item>
          </v-list>
        </v-menu>

      <v-spacer></v-spacer>      <v-spacer></v-spacer>      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    itemsStatut: [
      {title:"Ajouter un statut", link:"/statut"},
      {title:"Afficher les status", link:"/getStatuts"},
    ],
    itemsEnseignant: [
      {title:"Ajouter un enseignant", link:"/enseignant"},
      {title:"Afficher les enseignants", link:"/getEnseignants"},
    ],
    itemsProjet: [
      {title:"Ajouter un projet", link:"/addProjet"},
      {title:"Afficher les projets", link:"/getProjets"},
    ],
    itemsFormation: [
      {title:"Ajouter une formation", link:"/addFormation"},
    ],

  }),
};
</script>
