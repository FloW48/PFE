<template>
    <v-app>
        <v-container ml-16 mr-16 mt-4>
            <p>Intervenants du projet : {{items[0].projet.nom}}</p>
            <v-data-table :headers="headers" :items="items" item-key="_id">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small @click="edit(item._id)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item._id)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-container>
    </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'ListIntervenantFromProject',

    data(){
        return {
            items: [],
            projectID:"",
            headers: [
                { text: "Nom enseignant", align: "start", value: "enseignant.nom" },
                { text: "nbHeuresMin", value: "nbHeures.min" },
                { text: "nbHeuresMax", value: "nbHeures.max" },
                { text: "nbHeuresSupMin", value: "nbHeuresSup.min" },
                { text: "nbHeuresSupMax ", value: "nbHeuresSup.max" },
                { text: "Actions", value: "actions", sortable: false },
            ],
        }    
    },
    methods:{
        edit(id){
            console.log(id)
        },
        deleteItem(id){

            for(let i = 0; i < this.items.length; i++){
                if(this.items[i]._id == id){
                    this.items.splice(i,1)
                    break;
                }
            }

            let data = {"id":id}
            axios
            .post("http://localhost:3000/deleteProjet", data, {
                headers:{
                    'content-type': 'application/json'
                }
            })
        },
    },
    created : function(){
        this.projectID = this.$route.params.projectID
        axios
        .get("http://localhost:3000/getIntervenants/"+this.projectID)
        .then(res => {
            console.log(res.data)
            this.items = res.data
        })
    }
  }
</script>