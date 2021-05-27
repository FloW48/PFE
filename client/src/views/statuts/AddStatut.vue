<template>
    <v-app>
        <v-container ml-16 mr-16 mt-4>
            <v-row>
                <v-col>
                    <v-form v-model="valid">
                        <h1>Add Statut</h1>
                        <v-text-field name="nom" v-model="nom" type="name" label="Nom" :rules="[required('name'), minLength('name',2)]"></v-text-field>
                        <v-text-field name="surnom" v-model="surnom" type="surnom" label="Surnom" :rules="[required('surnom'), minLength('surnom',2)]"></v-text-field>
                        <v-text-field name="nbHeuresMin" v-model ="nbHeuresMin" type="number1" label="Nombre d'heures minimales" :rules="[required('number1')]"></v-text-field>
                        <v-text-field name="nbHeuresMax" v-model ="nbHeuresMax" type="number2" label="Nombre d'heures maximales" :rules="[required('number2')]"></v-text-field>
                        <v-text-field name="nbHeuresSupMin" v-model ="nbHeuresSupMin" type="number3" label="Nombre d'heures supplémentaires minimales" :rules="[required('number3')]"></v-text-field>
                        <v-text-field name="nbHeuresSupMax" v-model ="nbHeuresSupMax" type="number4" label="Nombre d'heures supplémentaires maximales" :rules="[required('number4')]"></v-text-field>
                        <v-btn @click="submit" :disabled="!valid">Submit</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'AddStatut',

    data(){
        return {
            valid: false,
            nom:"",
            surnom:"",
            nbHeuresMin:"",
            nbHeuresMax:"",
            nbHeuresSupMin: 0,
            nbHeuresSupMax: 0,

            required(propertyType){
                return (v) => (v && v.length > 0) || `You must input a ${propertyType}`
            },
            minLength(propertyType, minLength){
                return (v) => (v && v.length >= minLength) || `${propertyType} must be more than ${minLength} characters`
            }
        }
    },
    methods:{
        submit(){

            let data = {nom:this.nom, surnom:this.surnom, nbHeures: {min : Number(this.nbHeuresMin), max: Number(this.nbHeuresMax)}, nbHeuresSup : {min : Number(this.nbHeuresSupMin), max : Number(this.nbHeuresSupMax) } }

            axios
                .post("http://localhost:3000/addStatut", data, {
                    headers:{
                        'content-type': 'application/json'
                    }
                })
                this.$router.push({ name : 'Home'})
        }
    },
  }
</script>