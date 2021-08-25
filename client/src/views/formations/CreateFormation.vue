<template>
    <v-app>
        <v-container ml-16 mr-16 mt-4>
            <v-row>
                <v-col>
                    <h1>Create Formation</h1>
                    <v-autocomplete v-model="projet" :items="items" item-text="nom" item-value="_id"></v-autocomplete>
                    <v-checkbox v-model="verrouille" :label="`Verrouille : ${this.verrouille}`"></v-checkbox>
                    <v-btn @click="submit">Continuer</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'CreateFormation',
    data(){
        return {
            projet: undefined,
            verrouille: false,
            items: [],
        }
    },
    methods:{
        submit(){
            let data = {projet:this.projet, verrouille:this.verrouille}

            axios
                .post("http://localhost:3000/createFormation", data, {
                    headers:{
                        'content-type': 'application/json'
                    }
                }).then(res => {
                    this.$store.state.idFormation = res.data
                    this.$router.push({ name : 'Decomposition', params:{idFormation:res.data}})
                })
        }
    },
    created: function(){
        axios
            .get("http://localhost:3000/getProjets")
            .then(res => {
                this.items = res.data
            })
    }
  }
</script>