<script setup lang="ts">defineProps<{value:number|string;completed?:number;total?:number}>();</script>
<template><div class="progress-label"><span>{{total!==undefined ? completed+' no '+total+' uzdevumiem' : 'Kopējais progress'}}</span><strong>{{value}}%</strong></div><v-progress-linear :model-value="Number(value)" color="primary" bg-color="primary" :bg-opacity=".08" height="6" rounded/></template>

