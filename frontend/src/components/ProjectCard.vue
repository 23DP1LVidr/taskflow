<script setup lang="ts">
import type { Project } from '../types';
import { dateLabel } from '../types';
import ProgressIndicator from './ProgressIndicator.vue';
defineProps<{project:Project}>();
</script>
<template><v-card :to="'/projects/'+project.id" class="project-card"><div class="d-flex justify-space-between align-center mb-5"><v-avatar color="primary" variant="tonal" rounded="lg"><v-icon icon="mdi-folder-outline"/></v-avatar><v-chip size="small" :color="Number(project.progress)===100?'success':'primary'" variant="tonal">{{Number(project.progress)===100?'Pabeigts':'Aktīvs'}}</v-chip></div><h3>{{project.name}}</h3><p class="project-description">{{project.description||'Pievieno uzdevumus un sāc darbu kopā ar komandu.'}}</p><ProgressIndicator :value="project.progress" :completed="Number(project.completed_tasks)" :total="Number(project.total_tasks)"/><div class="project-footer"><span><v-icon icon="mdi-calendar-blank-outline" size="16" class="mr-1"/>{{dateLabel(project.deadline)}}</span><span>{{project.role==='owner'?'Īpašnieks':'Dalībnieks'}} <v-icon icon="mdi-arrow-top-right" size="17"/></span></div></v-card></template>

