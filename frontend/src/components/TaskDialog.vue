<script setup lang="ts">
import { reactive,ref,watch } from 'vue';
import type { Task,User,Status } from '../types';
import { statuses,priorities } from '../types';
import { api } from '../services/api';
import { useUi } from '../stores/ui';
import ConfirmDialog from './ConfirmDialog.vue';
const show=defineModel<boolean>({default:false}),props=defineProps<{task?:Task|null;projectId:number;members:User[];initialStatus?:Status}>(),emit=defineEmits(['saved']);
const form=reactive({title:'',description:'',assigned_user_id:null as number|null,status:'todo' as Status,priority:'medium',due_date:''}),busy=ref(false),ui=useUi(),confirm=ref<InstanceType<typeof ConfirmDialog>>();
watch(show,v=>{if(v)Object.assign(form,{title:props.task?.title||'',description:props.task?.description||'',assigned_user_id:props.task?.assigned_user_id||null,status:props.task?.status||props.initialStatus||'todo',priority:props.task?.priority||'medium',due_date:props.task?.due_date||''});},{immediate:true});
async function save(){busy.value=true;try{if(props.task)await api.put('/tasks/'+props.task.id,form);else await api.post('/projects/'+props.projectId+'/tasks',form);show.value=false;emit('saved');ui.notify('Uzdevums saglabāts.');}catch(e){ui.fail(e);}finally{busy.value=false;}}
async function remove(){if(!props.task||!await confirm.value?.ask('Dzēst uzdevumu?','Šo darbību nevar atsaukt.'))return;busy.value=true;try{await api.delete('/tasks/'+props.task.id);show.value=false;emit('saved');ui.notify('Uzdevums dzēsts.');}catch(e){ui.fail(e);}finally{busy.value=false;}}
</script>
<template><v-dialog v-model="show"><v-card class="pa-6 pa-sm-8"><h2 class="mb-6">{{task?'Rediģēt uzdevumu':'Jauns uzdevums'}}</h2><form @submit.prevent="save"><v-text-field v-model="form.title" label="Uzdevuma nosaukums" required maxlength="200" autofocus/><v-textarea v-model="form.description" label="Apraksts" rows="3" maxlength="10000"/><v-select v-model="form.assigned_user_id" :items="[{id:null,name:'Nav piešķirts'},...members]" item-title="name" item-value="id" label="Atbildīgais"/><v-row><v-col cols="6"><v-select v-model="form.status" :items="statuses" label="Statuss"/></v-col><v-col cols="6"><v-select v-model="form.priority" :items="priorities" label="Prioritāte"/></v-col></v-row><v-text-field v-model="form.due_date" label="Termiņš" type="date"/><div class="d-flex ga-2 flex-wrap"><v-btn v-if="task" color="error" variant="text" :disabled="busy" @click="remove">Dzēst</v-btn><v-spacer/><v-btn variant="text" :disabled="busy" @click="show=false">Atcelt</v-btn><v-btn type="submit" color="primary" :loading="busy">Saglabāt</v-btn></div></form></v-card></v-dialog><ConfirmDialog ref="confirm"/></template>


