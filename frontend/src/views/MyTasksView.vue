<script setup lang="ts">
import { computed,onMounted,ref } from 'vue';
import type { Task,User } from '../types';
import { statuses,priorities,dateLabel,overdue } from '../types';
import { get } from '../services/api';
import { useUi } from '../stores/ui';
import TaskDialog from '../components/TaskDialog.vue';
import EmptyState from '../components/EmptyState.vue';
const tasks=ref<Task[]>([]),members=ref<User[]>([]),selected=ref<Task|null>(null),dialog=ref(false),loading=ref(true),search=ref(''),status=ref<string|null>(null),priority=ref<string|null>(null),ui=useUi();
const filtered=computed(()=>tasks.value.filter(t=>t.title.toLowerCase().includes(search.value.toLowerCase())&&(!status.value||t.status===status.value)&&(!priority.value||t.priority===priority.value)));
async function load(){loading.value=true;try{tasks.value=await get('/tasks/my');}catch(e){ui.fail(e);}finally{loading.value=false;}}
async function edit(task:Task){try{members.value=await get('/projects/'+task.project_id+'/members');selected.value=task;dialog.value=true;}catch(e){ui.fail(e);}}
onMounted(load);
</script>
<template><div class="page-heading"><div><div class="eyebrow">TAVS NĀKAMAIS SOLIS</div><h1>Mani uzdevumi</h1><p>Tev piešķirtie uzdevumi visos projektos.</p></div><v-btn to="/projects" variant="outlined" prepend-icon="mdi-folder-outline">Atvērt projektus</v-btn></div><div class="filter-toolbar"><v-text-field v-model="search" label="Meklēt uzdevumu" prepend-inner-icon="mdi-magnify" hide-details density="compact" class="search-field"/><v-select v-model="status" :items="statuses" label="Statuss" clearable hide-details density="compact" class="filter-select"/><v-select v-model="priority" :items="priorities" label="Prioritāte" clearable hide-details density="compact" class="filter-select"/></div><v-progress-linear v-if="loading" indeterminate color="primary"/><v-card v-else><v-table v-if="filtered.length" hover><thead><tr><th>Uzdevums</th><th>Projekts</th><th>Statuss</th><th>Prioritāte</th><th>Termiņš</th><th><span class="sr-only">Darbības</span></th></tr></thead><tbody><tr v-for="task in filtered" :key="task.id"><td><button class="table-task" @click="edit(task)">{{task.title}}</button></td><td><router-link :to="'/projects/'+task.project_id">{{task.project_name}}</router-link></td><td><v-chip size="small" :color="statuses.find(s=>s.value===task.status)?.color">{{statuses.find(s=>s.value===task.status)?.title}}</v-chip></td><td>{{priorities.find(p=>p.value===task.priority)?.title}}</td><td :class="{'text-error':overdue(task)}" class="text-no-wrap">{{dateLabel(task.due_date)}}</td><td><v-btn icon="mdi-pencil-outline" variant="text" size="small" aria-label="Rediģēt uzdevumu" @click="edit(task)"/></td></tr></tbody></v-table><EmptyState v-else title="Nav atbilstošu uzdevumu" description="Maini filtrus vai piešķir sev uzdevumu projekta lapā." icon="mdi-checkbox-marked-circle-outline"/></v-card><TaskDialog v-if="selected" v-model="dialog" :task="selected" :project-id="selected.project_id" :members="members" @saved="load"/></template>

