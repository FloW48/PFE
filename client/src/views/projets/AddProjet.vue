<template>
    <v-app>
        <v-container ml-16 mr-16 mt-4>
            <v-row>
                <v-col>
                    <v-form v-model="valid">
                        <h1>Add Projet</h1>
                        <v-text-field name="nom" v-model="nom" type="name" label="Nom" :rules="[required('name'), minLength('name',2)]"></v-text-field>
                        <v-text-field name="date" v-model="date" type="text" label="Date" :rules="[required('date'), minLength('date',2)]"></v-text-field>
                        <v-btn @click="submit" :disabled="!valid">Submit</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>

import axios from 'axios'

  export default {
    name: 'AddProjet',

    data(){
        return {
            valid: false,
            nom:"",
            date:"",
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

            let data = {nom:this.nom, date:this.date, verrouille:false, archive:false}

            axios
            .post("http://localhost:3000/addProjet", data, {
                headers:{
                    'content-type': 'application/json'
                }
            })
                this.$router.push({ name : 'Home'})
        }
    },
  }
</script>