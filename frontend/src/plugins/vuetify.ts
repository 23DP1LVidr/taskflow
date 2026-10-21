import 'vuetify/styles';
import { VAlert, VApp, VAppBar, VAppBarNavIcon, VAppBarTitle, VAvatar, VBtn, VBtnToggle, VCard, VChip, VCol, VDialog, VDivider, VIcon, VList, VListItem, VMain, VMenu, VNavigationDrawer, VProgressCircular, VProgressLinear, VRow, VSelect, VSnackbar, VSpacer, VTab, VTable, VTabs, VTextarea, VTextField } from 'vuetify/components';
import { Ripple } from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { lv } from 'vuetify/locale';
export default createVuetify({ components: { VAlert, VApp, VAppBar, VAppBarNavIcon, VAppBarTitle, VAvatar, VBtn, VBtnToggle, VCard, VChip, VCol, VDialog, VDivider, VIcon, VList, VListItem, VMain, VMenu, VNavigationDrawer, VProgressCircular, VProgressLinear, VRow, VSelect, VSnackbar, VSpacer, VTab, VTable, VTabs, VTextarea, VTextField }, directives: { Ripple },
 locale:{ locale:'lv',messages:{lv} },
 theme:{ defaultTheme:localStorage.getItem('taskflow-theme')==='dark'?'dark':'light',themes:{
 light:{ colors:{ primary:'#5352df',background:'#f5f6fa',surface:'#ffffff',success:'#229b76',warning:'#dc912e',error:'#db5264',slate:'#718096' } },
 dark:{ dark:true,colors:{ primary:'#a5a2ff',background:'#111827',surface:'#1b2537',success:'#54c69c',warning:'#efb75a',error:'#f48191',slate:'#a0aec0' } }
 }},
 defaults:{ VBtn:{ rounded:'lg',elevation:0 },VTextField:{ variant:'outlined',density:'comfortable',color:'primary' },VTextarea:{ variant:'outlined',color:'primary' },VSelect:{ variant:'outlined',density:'comfortable',color:'primary' },VCard:{ rounded:'xl',elevation:0 },VDialog:{ maxWidth:580 } }
});



