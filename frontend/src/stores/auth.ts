import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';
import { api,get } from '../services/api';
export const useAuth = defineStore('auth',() => {
 const user=ref<User|null>(null),ready=ref(false);
 async function load() { user.value=await get<User|null>('/auth/me'); ready.value=true; }
 async function submit(mode:'login'|'register',data:object) { user.value=(await api.post('/auth/'+mode,data)).data.data; ready.value=true; }
 async function logout() { await api.post('/auth/logout'); user.value=null; ready.value=false; }
 return {user,ready,load,submit,logout};
});

