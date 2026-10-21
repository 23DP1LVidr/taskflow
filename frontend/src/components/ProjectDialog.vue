<script setup lang="ts">
import { reactive,ref,watch } from 'vue';
import type { Project } from '../types';
import { api } from '../services/api';
import { useUi } from '../stores/ui';
const show=defineModel<boolean>({default:false}),props=defineProps<{project?:Project|null}>(),emit=defineEmits(['saved']);
const form=reactive({name:'',description:'',start_date:'',deadline:''}),busy=ref(false),ui=useUi();
watch(show,v=>{if(v)Object.assign(form,{name:props.project?.name||'',description:props.project?.description||'',start_date:props.project?.start_date||'',deadline:props.project?.deadline||''});});
async function save(){busy.value=true;try{const result=props.project?await api.put('/projects/'+props.project.id,form):await api.post('/projects',form);show.value=false;emit('saved',result.data.data);ui.notify('Projekts saglabāts.');}catch(e){ui.fail(e);}finally{busy.value=false;}}
</script>
<template><v-dialog v-model="show"><v-card class="pa-6 pa-sm-8"><h2 class="mb-6">{{project?'Rediģēt projektu':'Jauns projekts'}}</h2><form @submit.prevent="save"><v-text-field v-model="form.name" label="Projekta nosaukums" required maxlength="150" autofocus/><v-textarea v-model="form.description" label="Apraksts" rows="3" maxlength="10000"/><v-row><v-col cols="12" sm="6"><v-text-field v-model="form.start_date" label="Sākuma datums" type="date"/></v-col><v-col cols="12" sm="6"><v-text-field v-model="form.deadline" label="Termiņš" type="date" :min="form.start_date"/></v-col></v-row><div class="d-flex justify-end ga-2"><v-btn variant="text" :disabled="busy" @click="show=false">Atcelt</v-btn><v-btn color="primary" type="submit" :loading="busy">Saglabāt projektu</v-btn></div></form></v-card></v-dialog></template>

