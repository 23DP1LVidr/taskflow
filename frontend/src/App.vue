<script setup lang="ts">
import { useUi } from './stores/ui';
const ui=useUi();
</script>
<template><v-app><router-view/><v-snackbar v-model="ui.visible" :color="ui.color" timeout="6000">{{ui.message}}<template #actions><v-btn variant="text" @click="ui.visible=false">Aizvērt</v-btn></template></v-snackbar></v-app></template>

