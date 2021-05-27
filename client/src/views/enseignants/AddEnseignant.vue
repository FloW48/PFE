<template>
    <v-app>
        <v-container ml-16 mr-16 mt-4>
            <v-row>
                <v-col>
                    <v-form v-model="valid">
                        <h1>Add Enseignant</h1>
                        <v-text-field name="prenom" v-model="prenom" v-on:input="changeSurnom" type="prenom" label="Prenom" :rules="[required('prenom'), minLength('prenom',2)]"></v-text-field>
                        <v-text-field name="nom" v-model="nom" v-on:input="changeSurnom" type="name" label="Nom" :rules="[required('name'), minLength('name',2)]"></v-text-field>
                        <v-text-field name="surnom" v-model="surnom" v-on:input="changeSurnom" type="surnom" label="Surnom" :rules="[required('surnom'), minLength('surnom',2)]"></v-text-field>
                        <v-text-field name="email" v-model="email" type="email" label="Email" :rules="[required('email'), minLength('email',2)]"></v-text-field>
                        <v-select name="statut" v-model="statut" label="Choisir un statut" type="statut" :items="items" :item-text="'nom'" :item-value="'_id'" :rules="[required('statut')]"></v-select>
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
    name: 'AddEnseignant',

    data(){
        return {
            valid: false,
            nom:"",
            prenom:"",
            surnom:"",
            email:"",
            statut:"",
            items: [],
            required(propertyType){
                return (v) => (v && v.length > 0) || `You must input a ${propertyType}`
            },
            minLength(propertyType, minLength){
                return (v) => (v && v.length >= minLength) || `${propertyType} must be more than ${minLength} characters`
            }
        }
    },
    methods:{
        changeSurnom(){
            if(this.prenom.includes("-")){
                let prenoms = this.prenom.replace(/\s/g, '').split("-")
                this.surnom = prenoms[0].charAt(0).toUpperCase() + prenoms[1].charAt(0).toUpperCase() +this.nom.charAt(0).toUpperCase()
            }
            else{
                this.surnom = this.prenom.charAt(0).toUpperCase() + this.nom.charAt(0).toUpperCase() + this.nom.charAt(1).toUpperCase()
            }
        },
        submit(){

            let data = {prenom:this.prenom, nom:this.nom, surnom:this.surnom, email:this.email, statut:this.statut}

            axios
                .post("http://localhost:3000/addEnseignant", data, {
                    headers:{
                        'content-type': 'application/json'
                    }
                })
                this.$router.push({ name : 'Home'})
        }
    },
    created: function(){
        axios
            .get("http://localhost:3000/getStatuts")
            .then(res => {
                console.log(res.data)
                this.items = res.data
            })
    }
  }
</script>