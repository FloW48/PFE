<template>
    <v-app>
        <v-container ml-16 mr-16 mt-4>
            <v-data-table :headers="headers" :items="items" item-key="_id">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small @click="edit(item._id)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item._id)">mdi-delete</v-icon>
                    <v-icon small @click="addEnseignant(item._id)">mdi-plus-circle</v-icon>
                    <!-- <v-icon small @click="listIntervenants(item._id)">mdi-plus-circle</v-icon> -->
                </template>
            </v-data-table>
        </v-container>
    </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'ListProjet',

    data(){
        return {
            items: [],
            headers: [
                { text: "Nom", align: "start", value: "nom" },
                { text: "Date", value: "date"},
                { text: "Verouille?", value: "verrouille" },
                { text: "Archive?", value: "archive" },
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

        addEnseignant(id){
            this.$router.push({ name : 'ListEnseignantForAddProjet', params:{projectID:id}})
        },
        listIntervenants(id){
            this.$router.push({ name : 'ListIntervenantFromProject', params:{projectID:id}})
        }
    },
    created : function(){
        axios
            .get("http://localhost:3000/getProjets")
            .then(res => {
                console.log(res.data)
                this.items = res.data
            })
    }
  }
</script>