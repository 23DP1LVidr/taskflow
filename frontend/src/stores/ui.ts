import { defineStore } from 'pinia';
import { ref } from 'vue';
import { errorText } from '../services/api';
export const useUi = defineStore('ui',() => {
 const message=ref(''),visible=ref(false),color=ref('success');
 function notify(text:string,isError=false) { message.value=text;color.value=isError?'error':'success';visible.value=true; }
 const fail=(error:unknown)=>notify(errorText(error),true);
 return {message,visible,color,notify,fail};
});

