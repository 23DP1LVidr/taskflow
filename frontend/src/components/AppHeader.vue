<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import { useAuth } from '../stores/auth';
import { useUi } from '../stores/ui';
defineEmits(['menu']);
const route=useRoute(),router=useRouter(),theme=useTheme(),auth=useAuth(),ui=useUi();
function toggle(){ const name=theme.global.name.value==='dark'?'light':'dark';theme.change(name);localStorage.setItem('taskflow-theme',name); }
async function logout(){try{await auth.logout();await router.push('/login');}catch(e){ui.fail(e);}}
</script>
<template><v-app-bar flat border="b" height="76" class="px-sm-5"><v-app-bar-nav-icon class="d-lg-none" aria-label="Atvērt izvēlni" @click="$emit('menu')"/><v-app-bar-title class="header-title">{{route.meta.title}}</v-app-bar-title><v-btn :icon="theme.global.current.value.dark?'mdi-weather-sunny':'mdi-weather-night'" aria-label="Mainīt tēmu" @click="toggle"/><div class="header-divider"/><v-menu><template #activator="{props}"><v-btn v-bind="props" variant="text" class="profile-button"><v-avatar color="primary" size="34" class="mr-2">{{auth.user?.name.charAt(0)}}</v-avatar><span class="d-none d-sm-inline">{{auth.user?.name}}</span><v-icon icon="mdi-chevron-down" class="ml-2"/></v-btn></template><v-list><v-list-item title="Mans profils" prepend-icon="mdi-account-outline" to="/settings"/><v-list-item title="Izrakstīties" prepend-icon="mdi-logout" @click="logout"/></v-list></v-menu></v-app-bar></template>

