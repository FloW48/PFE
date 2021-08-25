<template>
    <v-app>
        <v-container ml-16 mr-16 mt-4>
            <v-data-table :headers="headers" :items="items" item-key="_id">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editEnseignant(item._id)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteEnseignant(item._id)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-container>
    </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'ListEnseignant',

    data(){
        return {
            items: [],

            headers: [
                { text: "Prénom", align: "start", value: "prenom" },
                { text: "Nom", value: "nom"},
                { text: "Surnom", value: "surnom" },
                { text: "Email", value: "email" },
                { text: "Statut", value: "statut.nom" },
                { text: "Actions", value: "actions", sortable: false },
            ],
        }    
    },
    methods:{
        editEnseignant(id){
            let enseignant = {}
            for(let i = 0; i < this.items.length; i++){
                if(this.items[i]._id == id){
                    enseignant = this.items[i]
                    break;
                }
            }


            this.$store.state.enseignantToModify = enseignant

            this.$router.push({ name : 'EditEnseignant'})
        },
        deleteEnseignant(id){

            for(let i = 0; i < this.items.length; i++){
                if(this.items[i]._id == id){
                    this.items.splice(i,1)
                    break;
                }
            }

            let data = {"id":id}
            axios
                .post("http://localhost:3000/deleteEnseignant", data, {
                    headers:{
                        'content-type': 'application/json'
                    }
                })
        }
    },
    created: function(){
        axios
            .get("http://localhost:3000/getEnseignants")
            .then(res => {
                console.log(res.data)
                this.items = res.data
            })
    }
  }
</script>