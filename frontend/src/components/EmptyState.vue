<script setup lang="ts">defineProps<{title:string;description?:string;icon?:string}>();</script><template><div class="empty-state"><v-avatar color="primary" variant="tonal" size="64" class="mb-4"><v-icon :icon="icon||'mdi-tray-arrow-up'" size="30"/></v-avatar><h3>{{title}}</h3><p>{{description}}</p><slot/></div></template>

