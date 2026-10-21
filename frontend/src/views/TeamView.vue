<script setup lang="ts">
import { onMounted,ref,watch,computed } from 'vue';
import type { Project,User } from '../types';
import { get } from '../services/api';
import { useUi } from '../stores/ui';
import MemberList from '../components/MemberList.vue';
import EmptyState from '../components/EmptyState.vue';
const projects=ref<Project[]>([]),projectId=ref<number|null>(null),members=ref<User[]>([]),loading=ref(true),ui=useUi();
const project=computed(()=>projects.value.find(p=>p.id===projectId.value));
let request=0;
async function loadMembers(){const version=++request;members.value=[];if(!projectId.value)return;loading.value=true;try{const data=await get<User[]>('/projects/'+projectId.value+'/members');if(version===request)members.value=data;}catch(e){ui.fail(e);}finally{if(version===request)loading.value=false;}}
watch(projectId,loadMembers);
onMounted(async()=>{try{projects.value=await get('/projects');projectId.value=projects.value[0]?.id||null;}catch(e){ui.fail(e);}finally{loading.value=false;}});
</script>
<template><div class="page-heading"><div><div class="eyebrow">KOPĀ VAR VAIRĀK</div><h1>Tava komanda</h1><p>Pārvaldi sadarbību katrā no saviem projektiem.</p></div></div><v-select v-if="projects.length" v-model="projectId" :items="projects" item-title="name" item-value="id" label="Izvēlies projektu" class="team-select"/><v-progress-linear v-if="loading" indeterminate color="primary"/><MemberList v-else-if="project" :members="members" :project-id="project.id" :owner="project.role==='owner'" @changed="loadMembers"/><v-card v-else><EmptyState title="Komanda sākas ar projektu" description="Izveido projektu un pievieno pirmo dalībnieku." icon="mdi-account-group-outline"><v-btn to="/projects" color="primary" class="mt-4">Atvērt projektus</v-btn></EmptyState></v-card></template>

