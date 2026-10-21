<script setup lang="ts">defineProps<{label:string;value:number|string;icon:string;color?:string;hint?:string;to?:string}>();</script>
<template><v-card class="stat-card" :to="to" :class="{ 'stat-card-link': to }"><div class="stat-top"><span>{{label}}</span><v-avatar :color="color||'primary'" variant="tonal" rounded="lg" size="40"><v-icon :icon="icon" size="21"/></v-avatar></div><div class="stat-value">{{value}}</div><div class="stat-hint d-flex align-center justify-space-between">{{hint}}<v-icon v-if="to" icon="mdi-arrow-right" size="16" aria-hidden="true"/></div></v-card></template>


