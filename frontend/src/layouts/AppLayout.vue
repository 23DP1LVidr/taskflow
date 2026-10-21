<script setup lang="ts">
import { ref,watch } from 'vue';
import { useDisplay } from 'vuetify';
import AppSidebar from '../components/AppSidebar.vue';
import AppHeader from '../components/AppHeader.vue';
const display=useDisplay(),drawer=ref(display.lgAndUp.value);
watch(display.lgAndUp,v=>drawer.value=v);
</script>
<template><AppSidebar v-model="drawer"/><AppHeader @menu="drawer=!drawer"/><v-main><main class="page-content"><router-view/></main></v-main></template>

