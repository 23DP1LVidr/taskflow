<script setup lang="ts">
import { ref } from 'vue';
import type { Task,Status } from '../types';
import { statuses } from '../types';
import TaskCard from './TaskCard.vue';
defineProps<{tasks:Task[]}>();
const emit=defineEmits<{edit:[task:Task];move:[id:number,status:Status];create:[status:Status]}>();
const over=ref<Status|null>(null);
function drag(event:DragEvent,id:number){if(event.dataTransfer){event.dataTransfer.setData('text/plain',String(id));event.dataTransfer.effectAllowed='move';}}
function drop(event:DragEvent,status:Status){over.value=null;const id=Number(event.dataTransfer?.getData('text/plain'));if(id)emit('move',id,status);}
</script>
<template><div class="kanban"><section v-for="column in statuses" :key="column.value" class="kanban-column" :class="{'drag-over':over===column.value}" @dragover.prevent="over=column.value" @dragleave="over=null" @drop.prevent="drop($event,column.value)"><div class="column-heading"><div class="d-flex align-center ga-2"><span class="status-dot" :class="column.value"/><h3>{{column.title}}</h3><span class="task-count">{{tasks.filter(t=>t.status===column.value).length}}</span></div><v-btn icon="mdi-plus" variant="text" size="x-small" :aria-label="'Pievienot: '+column.title" @click="emit('create',column.value)"/></div><TaskCard v-for="task in tasks.filter(t=>t.status===column.value)" :key="task.id" :task="task" draggable @drag="drag($event,task.id)" @edit="emit('edit',task)"/><button class="add-task" @click="emit('create',column.value)"><v-icon icon="mdi-plus" size="17"/> Pievienot uzdevumu</button></section></div></template>

