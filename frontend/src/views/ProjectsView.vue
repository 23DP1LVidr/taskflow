<script setup lang="ts">
import { computed,onMounted,ref } from 'vue';
import type { Project } from '../types';
import { get } from '../services/api';
import { useUi } from '../stores/ui';
import ProjectCard from '../components/ProjectCard.vue';
import ProjectDialog from '../components/ProjectDialog.vue';
import EmptyState from '../components/EmptyState.vue';
const projects=ref<Project[]>([]),loading=ref(true),search=ref(''),filter=ref('all'),dialog=ref(false),ui=useUi();
const filtered=computed(()=>projects.value.filter(p=>p.name.toLowerCase().includes(search.value.toLowerCase())&&(filter.value==='all'||(filter.value==='completed'?Number(p.progress)===100:Number(p.progress)<100))));
async function load(){loading.value=true;try{projects.value=await get('/projects');}catch(e){ui.fail(e);}finally{loading.value=false;}}
onMounted(load);
</script>
<template><div class="page-heading"><div><div class="eyebrow">NO IDEJAS LĪDZ REZULTĀTAM</div><h1>Mani projekti</h1><p>Plāno, sadarbojies un seko līdzi progresam.</p></div><v-btn color="primary" prepend-icon="mdi-plus" size="large" @click="dialog=true">Jauns projekts</v-btn></div><div class="filter-toolbar"><v-btn-toggle v-model="filter" mandatory color="primary" variant="text" density="comfortable"><v-btn value="all">Visi</v-btn><v-btn value="active">Aktīvie</v-btn><v-btn value="completed">Pabeigtie</v-btn></v-btn-toggle><v-text-field v-model="search" label="Meklēt projektu" prepend-inner-icon="mdi-magnify" hide-details density="compact" class="search-field"/></div><v-progress-linear v-if="loading" indeterminate color="primary"/><div v-else-if="filtered.length" class="project-grid projects-page"><ProjectCard v-for="project in filtered" :key="project.id" :project="project"/></div><v-card v-else><EmptyState title="Projekti nav atrasti" description="Maini meklēšanas nosacījumus vai izveido jaunu projektu."/></v-card><ProjectDialog v-model="dialog" @saved="load"/></template>

