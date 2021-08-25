<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <v-row align="center" v-for="item in items" v-bind:key="item._id">
          <v-checkbox hide-details class="shrink mr-2 mt-0" @change="addOrRemove(item._id)"></v-checkbox>
          <v-text>{{item.nom}}</v-text>
        </v-row>
        <br>
        <v-btn @click="submit">Add</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
  import axios from "axios";

  export default {
    name: 'ListEnseignantForAddProjet',

    data(){
        return {
            projectID:"",
            items: [],
            selectedTeacherIDs:[],
        }    
    },
    methods:{
        addOrRemove(id){
            if(this.selectedTeacherIDs.includes(id)){
                this.selectedTeacherIDs.splice(this.selectedTeacherIDs.indexOf(id), 1)
                console.log(this.selectedTeacherIDs)
            }
            else{
                this.selectedTeacherIDs.push(id)
                console.log(this.selectedTeacherIDs)
            }

        },
        submit(){
            let data = {projectID:this.projectID, teachersIDs:this.selectedTeacherIDs}

            axios
            .post("http://localhost:3000/addEnseignantsToProjet", data, {
                headers:{
                    'content-type': 'application/json'
                }
            })
        }
    },
    created: function(){
        this.projectID = this.$route.params.projectID
        axios
            .get("http://localhost:3000/getEnseignants")
            .then(res => {
                console.log(res.data)
                this.items = res.data
            })
    }
  }
</script>