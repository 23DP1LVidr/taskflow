<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../types';
import { api } from '../services/api';
import { useUi } from '../stores/ui';
import ConfirmDialog from './ConfirmDialog.vue';
const props=defineProps<{members:User[];projectId:number;owner:boolean}>(),emit=defineEmits(['changed']),email=ref(''),busy=ref(false),ui=useUi(),confirm=ref<InstanceType<typeof ConfirmDialog>>();
async function add(){busy.value=true;try{await api.post('/projects/'+props.projectId+'/members',{email:email.value});email.value='';emit('changed');ui.notify('Dalībnieks pievienots.');}catch(e){ui.fail(e);}finally{busy.value=false;}}
async function remove(user:User){if(!await confirm.value?.ask('Noņemt dalībnieku?',user.name+' zaudēs piekļuvi projektam. Uzdevumu piešķīrumi tiks noņemti.'))return;try{await api.delete('/projects/'+props.projectId+'/members/'+user.id);emit('changed');ui.notify('Dalībnieks noņemts.');}catch(e){ui.fail(e);}}
</script>
<template><v-card class="pa-5 pa-sm-7"><h2 class="mb-2">Projekta komanda</h2><p class="text-medium-emphasis mb-6">{{owner?'Pievieno reģistrētu lietotāju, norādot viņa e-pastu.':'Cilvēki, ar kuriem kopā veidojat rezultātu.'}}</p><form v-if="owner" class="member-form" @submit.prevent="add"><v-text-field v-model="email" type="email" label="Dalībnieka e-pasts" required hide-details/><v-btn color="primary" type="submit" :loading="busy" height="48" prepend-icon="mdi-account-plus-outline">Pievienot</v-btn></form><v-list class="mt-4"><v-list-item v-for="member in members" :key="member.id" :title="member.name" :subtitle="member.email" class="member-row"><template #prepend><v-avatar color="primary" variant="tonal" class="mr-3">{{member.name.charAt(0)}}</v-avatar></template><template #append><v-chip size="small" :color="member.role==='owner'?'primary':'slate'">{{member.role==='owner'?'Īpašnieks':'Dalībnieks'}}</v-chip><v-btn v-if="owner&&member.role!=='owner'" icon="mdi-account-remove-outline" variant="text" size="small" class="ml-2" :aria-label="'Noņemt '+member.name" @click="remove(member)"/></template></v-list-item></v-list></v-card><ConfirmDialog ref="confirm"/></template>

