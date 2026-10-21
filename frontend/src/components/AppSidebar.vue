<script setup lang="ts">
const model=defineModel<boolean>();
const links=[['/','mdi-view-dashboard-outline','Informācijas panelis'],['/projects','mdi-folder-outline','Projekti'],['/tasks','mdi-checkbox-marked-circle-outline','Mani uzdevumi'],['/team','mdi-account-group-outline','Komanda'],['/settings','mdi-cog-outline','Iestatījumi']];
</script>
<template><v-navigation-drawer v-model="model" :width="254" class="sidebar"><router-link to="/" class="brand"><span class="brand-icon"><v-icon icon="mdi-transit-connection-variant"/></span>TaskFlow<span class="brand-dot">.</span></router-link><div class="nav-label">DARBA VIETA</div><v-list nav class="px-4"><v-list-item v-for="[to,icon,title] in links" :key="to" :to="to" :exact="to==='/'" :prepend-icon="icon" :title="title" color="primary" rounded="lg" class="mb-2"/></v-list><template #append><div class="sidebar-note"><v-icon icon="mdi-sprout-outline" color="primary"/><strong>Mazas darbības.<br>Lieli rezultāti.</strong><p>Dod savām idejām skaidru virzienu.</p></div><div class="sidebar-footer">TASKFLOW • TAVA KOMANDAS TELPA</div></template></v-navigation-drawer></template>

