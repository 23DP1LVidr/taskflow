<script setup lang="ts">
import { ref } from 'vue';
const show=ref(false),title=ref(''),text=ref('');let resolve:((v:boolean)=>void)|undefined;
function ask(t:string,d:string){title.value=t;text.value=d;show.value=true;return new Promise<boolean>(r=>resolve=r);}
function answer(v:boolean){show.value=false;resolve?.(v);}
defineExpose({ask});
</script>
<template><v-dialog :model-value="show" @update:model-value="answer(false)" max-width="440"><v-card class="pa-6"><h2 class="mb-3">{{title}}</h2><p class="text-medium-emphasis mb-6">{{text}}</p><div class="d-flex justify-end ga-2"><v-btn variant="text" @click="answer(false)">Atcelt</v-btn><v-btn color="error" @click="answer(true)">Dzēst</v-btn></div></v-card></v-dialog></template>

