<template>
    <v-app>
        <v-container ml-16 mr-16 mt-4>
            <v-treeview activatable hoverable :items="data" item-key="id">
                <template v-slot:append="{ item }">
                    <v-icon @click="showForm( item.id )">mdi-plus-circle</v-icon>
                    <v-icon @click="modify(item._id)">mdi-pencil</v-icon>
                    <v-icon @click="insertVolume( item.id )">mdi-calendar</v-icon>
                </template>
            </v-treeview>
            <v-icon @click="showForm()">mdi-plus-circle</v-icon>


            <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Create Element</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            v-model="nom"
                            label="Nom*"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            v-model="surnom"
                            label="Surnom"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            v-model="code"
                            label="Code"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                        <span>VolumeHeureProgPedag</span>
                            <v-text-field
                            v-model="volumeProgCM"
                            label="CM*"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="volumeProgTD"
                            label="TD*"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="volumeProgTP"
                            label="TP*"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                            v-model="modeSaisie"
                            :items="['Pas de saisie', 'Saisie hebdomadaire', 'Saisie globale']"
                            label="Saisie"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            v-model="nbSemaines"
                            label="Nombre Semaines"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                        <span>Groupe par défaut</span>
                            <v-text-field
                            v-model="groupeCM"
                            label="CM*"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="groupeTD"
                            label="TD*"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="groupeTP"
                            label="TP*"
                            required
                            ></v-text-field>
                            <v-text-field
                            v-model="groupePartiel"
                            label="Partiel*"
                            required
                            ></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="createModifyElement()"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


            <v-dialog v-model="volumeDialog" persistent max-width="1080px">
                <v-card>
                    <v-card-title>
                        <v-row justify="space-around">
                            <v-col cols="12">
                                <span class="headline">{{ modeSaisie }} - {{ nom }}</span>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                        <v-row justify="space-around">
                            <v-col cols="auto" >
                                <v-btn
                                    icon
                                    class="ma-2"
                                    @click="changeWeek(-1)"
                                >
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn
                                    icon
                                    class="ma-2"
                                    @click="changeWeek(1)"
                                >
                                    <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-col>
                            <v-container>
                                <v-simple-table>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th v-for="i in 5" :key="i">
                                                    {{week + i-1}}
                                                </th>
                                                <th>
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>CM</td>
                                                <td v-for="item in volumeHeureHebdoShown" :key="item.nbSemaines"><v-text-field v-model="item.cm"></v-text-field></td>
                                                <td> {{ total.cm }}</td>
                                            </tr>
                                            <tr>
                                                <td>TD</td>
                                                <td v-for="item in volumeHeureHebdoShown" :key="item.nbSemaines"><v-text-field v-model="item.td"></v-text-field></td>
                                                <td> {{ total.td }}</td>
                                            </tr>
                                            <tr>
                                                <td>TP</td>
                                                <td v-for="item in volumeHeureHebdoShown" :key="item.nbSemaines"><v-text-field v-model="item.tp"></v-text-field></td>
                                                <td> {{ total.tp }}</td>
                                            </tr>
                                            <tr>
                                                <td>Partiel</td>
                                                <td v-for="item in volumeHeureHebdoShown" :key="item.nbSemaines"><v-text-field v-model="item.partiel"></v-text-field></td>
                                                <td> {{ total.partiel }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                                <v-icon v-if="showEnseignants == false" @click="toggleShowEnseignant()">mdi-plus-circle</v-icon>
                                <v-icon v-if="showEnseignants" @click="toggleShowEnseignant()">mdi-minus-circle</v-icon>
                                <v-simple-table class="mt-10" dense v-for="item in groupeParEnseignant" :key="item._id">
                                    <template v-if="showEnseignants" v-slot:default>
                                        <thead>
                                            <span class="text-uppercase text-subtitle-1">{{item.intervenant.enseignant.nom}}</span>
                                            Supprimer : <v-icon @click="removeIntervenant(item.intervenant)">mdi-minus-circle</v-icon>
                                            <tr>
                                                <th></th>
                                                <th v-for="i in 5" :key="i">
                                                    {{week + i-1}}
                                                </th>
                                                <th>
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>CM</td>
                                                <td v-for="info in validWeek(item.info)" :key="info.nSemaines"><v-text-field v-model="info.nbGroupes.cm"></v-text-field></td>
                                                <td> {{ totalGroupe(item.info).cm }}</td>
                                            </tr>
                                            <tr>
                                                <td>TD</td>
                                                <td v-for="info in validWeek(item.info)" :key="info.nSemaines"><v-text-field v-model="info.nbGroupes.td"></v-text-field></td>
                                                <td> {{ totalGroupe(item.info).td }}</td>
                                            </tr>
                                            <tr>
                                                <td>TP</td>
                                                <td v-for="info in validWeek(item.info)" :key="info.nSemaines"><v-text-field v-model="info.nbGroupes.tp"></v-text-field></td>
                                                <td> {{ totalGroupe(item.info).tp }}</td>
                                            </tr>
                                            <tr>
                                                <td>Partiel</td>
                                                <td v-for="info in validWeek(item.info)" :key="info.nSemaines"><v-text-field  v-model="info.nbGroupes.partiel"></v-text-field></td>
                                                <td> {{ totalGroupe(item.info).partiel }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                                <v-autocomplete
                                v-model="intervenantToAddId"
                                v-if="showEnseignants" 
                                :items="intervenants" 
                                item-text="enseignant.nom" 
                                item-value="_id"
                                label="Ajouter un intervenant du projet"
                                @keydown="addIntervenant"
                                ></v-autocomplete>
                            </v-container>
                        </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="volumeDialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="saveVolume()"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>







        </v-container>
    </v-app>
</template>

<script>

  import axios from 'axios'

  export default {
    name: 'Decomposition',
    data: () => ({
        intervenants: undefined,
        intervenantToAddId: undefined,
      idVolume: undefined,
      idAdd: undefined,
      idToModify: undefined,
      modifyElement: false,
      data: [],
      dialog: false,
      volumeDialog : false,
      nom: undefined,
      surnom: undefined,
      volumeProgCM: undefined,
      volumeProgTD: undefined,
      volumeProgTP:undefined,
      modeSaisie:undefined,
      code:undefined,
      nbSemaines: undefined,
      groupeCM: undefined,
      groupeTD: undefined,
      groupeTP: undefined,
      groupePartiel: undefined,
      week : 1,
      headers: [],
      volumeHeureHebdo: [],
      showEnseignants: false,
      groupeParEnseignant: [],
    }),

    methods:{
        showForm(id){
            this.idAdd = id,
            this.dialog = true
            this.nom = undefined,
            this.surnom = undefined,
            this.volumeProgCM = undefined,
            this.volumeProgTD = undefined,
            this.volumeProgTP = undefined,
            this.modeSaisie = undefined,
            this.code = undefined,
            this.modifyElement = undefined,
            this.nbSemaines = undefined
            this.groupeCM = undefined,
            this.groupeTD = undefined,
            this.groupeTP = undefined,
            this.groupePartiel = undefined
        },
        createModifyElement(){
            this.dialog = false         
            if(this.modifyElement != undefined){
                let data = {
                    titre:this.nom,
                    idFormation : this.$route.params.idFormation,
                    surnom:this.surnom,
                    code:this.code,
                    volumeHeureProgPedag:{
                        cm:this.volumeProgCM,
                        td:this.volumeProgTD,
                        tp:this.volumeProgTP
                    },
                    modeSaisie:this.modeSaisie,
                    nbSemaines: this.nbSemaines,
                    nbGroupes: {
                        cm:this.groupeCM,
                        td:this.groupeTD,
                        tp:this.groupeTP,
                        partiel: this.groupePartiel
                    }
                }
                axios
                .post("http://localhost:3000/modifyElement/"+this.idToModify, data, {
                    headers:{
                        'content-type': 'application/json'
                    }
                })
            }
            else{
                for(let i = 1; i <= 52; i++){
                    this.volumeHeureHebdo.push({nSemaine:i, cm:0, td:0, tp:0, partiel:0})
                }   
                let data = {
                    elementPere: this.idAdd,
                    titre:this.nom,
                    idFormation : this.$route.params.idFormation,
                    surnom:this.surnom,
                    code:this.code,
                    volumeHeureProgPedag:{
                        cm:this.volumeProgCM,
                        td:this.volumeProgTD,
                        tp:this.volumeProgTP
                    },
                    modeSaisie:this.modeSaisie,
                    nbSemaines: this.nbSemaines,
                    nbGroupes: {
                        cm:this.groupeCM,
                        td:this.groupeTD,
                        tp:this.groupeTP,
                        partiel: this.groupePartiel
                    },
                    volumeHeureHebdo: this.volumeHeureHebdo
                }
                axios
                .post("http://localhost:3000/createElement", data, {
                    headers:{
                        'content-type': 'application/json'
                    }
                })
            }

            this.$router.go()
        },
        modify(id){
            this.getDataModify(id)
            this.showDialogCreateElement()
        },
        getDataModify(id){
            this.idToModify = id
            axios
            .get("http://localhost:3000/getElement/"+id)
            .then(res => {
                this.nom = res.data.titre
                this.surnom = res.data.surnom
                if(res.data.volumeHeureProgPedag){
                    this.volumeProgCM = res.data.volumeHeureProgPedag.cm
                    this.volumeProgTD = res.data.volumeHeureProgPedag.td
                    this.volumeProgTP = res.data.volumeHeureProgPedag.tp
                }
                this.modeSaisie = res.data.modeSaisie
                this.code = res.data.code
                this.nbSemaines = res.data.nbSemaines
                if(res.data.nbGroupes){
                    this.groupeCM = res.data.nbGroupes.cm
                    this.groupeTD = res.data.nbGroupes.td
                    this.groupeTP = res.data.nbGroupes.tp
                    this.groupePartiel = res.data.nbGroupes.partiel
                }
                if(res.data.volumeHeureHebdo){
                    this.volumeHeureHebdo =  res.data.volumeHeureHebdo
                }
                this.groupeParEnseignant = res.data.groupeParEnseignant
                console.log(this.groupeParEnseignant)
            })
        },
        showDialogCreateElement(){
            this.dialog = true
        },
        insertVolume(id){
            this.idVolume = id
            this.getDataModify(id)
            this.headers = [
                { text: "Type", align: 'start', value: "nSemaine"},
                { text: this.week, align: 'right', value: 'cm' },
                { text: this.week+1, value: 'td', align: 'right' },
                { text: this.week+2, value: 'tp', align: 'right' },
                { text: this.week+3, value: 'partiel', align: 'right' },
                { text: "Total", value: 'total', align: 'right'}
            ]
            this.volumeDialog = true
        },
        changeWeek(i){
            let weekN = Number(this.week)
            let iN = Number(i)
            if(weekN + iN > 0 && weekN + iN <= Number(this.nbSemaines)-4){
                this.week = weekN + iN
            }
            else if(weekN + iN >= this.nbSemaines-4){
                this.week = 1
            }
            else if(weekN + iN == 0){
                this.week = Number(this.nbSemaines)-4
            }
        },

        saveVolume(){
            let data = {
                id: this.idVolume,
                volumeHeureHebdo: this.volumeHeureHebdo,
                groupeParEnseignant: this.groupeParEnseignant
            }
            axios
            .post("http://localhost:3000/modifyVolumeHebdo", data,  {
                    headers:{
                        'content-type': 'application/json'
                    }
            })
        },
        toggleShowEnseignant(){
            this.showEnseignants = !this.showEnseignants
        },
        addIntervenant(event){
            if(event.key == "Enter"){
                if(this.intervenantToAddId && this.intervenantToAddId != ""){
                    for(let i = 0; i < this.intervenants.length; i++){
                        if(this.intervenants[i]._id == this.intervenantToAddId){
                            let infoDefault = []
                            for(let j = 1; j <= 52; j++){
                                infoDefault.push({nSemaine:j, nbGroupes:{cm:0, td:0, tp:0, partiel:0}})
                            }
                            let data = {
                                idElement: this.idVolume,
                                groupeParEnseignant: {
                                    intervenant:this.intervenantToAddId,
                                    info:infoDefault
                                }
                            }
                            console.log(data)

                            axios
                            .post("http://localhost:3000/addIntervenantToElement", data,  {
                                    headers:{
                                        'content-type': 'application/json'
                                    }
                            })
                            this.groupeParEnseignant.push(
                                {
                                    intervenant:this.intervenants[i],
                                    info:infoDefault
                                }
                            )
                            break;
                        }
                    }
                }
                console.log(this.groupeParEnseignant)
            }
        },
        validWeek(array){
            return array.slice(this.week-1, this.week+4)
        },
        totalGroupe(info){
            let total = {cm:0, td:0, tp:0, partiel:0}
            for(let realInfo of info){
                total.cm += Number(realInfo.nbGroupes.cm)
                total.td += Number(realInfo.nbGroupes.td)
                total.tp = Number(realInfo.nbGroupes.tp)
                total.partiel = Number(realInfo.nbGroupes.partiel)
            }
            return total
        },
        removeIntervenant(inter){
            console.log("ici")
            for(let i = 0; i < this.groupeParEnseignant.length; i++){
                if(this.groupeParEnseignant[i].intervenant._id == inter._id){
                    console.log(i)
                    this.groupeParEnseignant.splice(i,1)
                    console.log(this.groupeParEnseignant)
                }
            }
        }

    },
    computed:{
        total: function(){
            let totalArray = {cm:0, td:0, tp:0, partiel:0}
            for(let item of this.volumeHeureHebdo){
                totalArray.cm += Number(item.cm)
                totalArray.td += Number(item.td)
                totalArray.tp += Number(item.tp)
                totalArray.partiel += Number(item.partiel)
            }
            return totalArray
        },
        volumeHeureHebdoShown: function(){
            return this.volumeHeureHebdo.slice(this.week-1, this.week+4)
        },
        groupeParEnseignantShown: function(item){
            return item.slice(this.week-1, this.week+4)
        },
    },
    created(){
        console.log(this.$route.params.idFormation)
        axios
        .get("http://localhost:3000/getElements/"+this.$route.params.idFormation)
        .then(res => {
            this.data = res.data
        })
        axios
        .get("http://localhost:3000/getFormation/"+this.$route.params.idFormation)
        .then(res => {
            axios
            .get("http://localhost:3000/getIntervenants/"+res.data.projet)
            .then(res => {
                this.intervenants = [res.data]
            })
        })
    }
  }
</script>