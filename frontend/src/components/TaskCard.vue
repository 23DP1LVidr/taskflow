<script setup lang="ts">
import type { Task } from '../types';
import { dateLabel,overdue,priorities } from '../types';
defineProps<{task:Task;draggable?:boolean}>();
defineEmits(['edit','drag']);
</script>
<template><v-card class="task-card" tabindex="0" role="button" :aria-label="'Rediģēt: '+task.title" :draggable="draggable" @dragstart="$emit('drag',$event)" @click="$emit('edit',task)" @keydown.enter="$emit('edit',task)" @keydown.space.prevent="$emit('edit',task)"><div class="d-flex justify-space-between align-center mb-3"><v-chip :color="task.priority==='high'?'error':task.priority==='medium'?'warning':'slate'" size="x-small" label>{{priorities.find(p=>p.value===task.priority)?.title}}</v-chip><v-icon icon="mdi-dots-horizontal" color="slate" size="19"/></div><h4>{{task.title}}</h4><p v-if="task.description" class="task-description">{{task.description}}</p><div class="task-bottom"><span :class="{'text-error':overdue(task)}"><v-icon icon="mdi-calendar-blank-outline" size="15" class="mr-1"/>{{dateLabel(task.due_date)}}</span><v-avatar size="27" color="primary" variant="tonal" :title="task.assigned_name||'Nav piešķirts'">{{task.assigned_name?.charAt(0)||'–'}}</v-avatar></div></v-card></template>

