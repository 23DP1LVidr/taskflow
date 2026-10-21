import { createRouter,createWebHistory } from 'vue-router';
import { useAuth } from '../stores/auth';
import { useUi } from '../stores/ui';
const router=createRouter({ history:createWebHistory(),routes:[
 {path:'/login',component:()=>import('../views/AuthView.vue'),meta:{public:true,title:'Pieteikšanās'}},
 {path:'/register',component:()=>import('../views/AuthView.vue'),meta:{public:true,title:'Reģistrācija'}},
 {path:'/',component:()=>import('../layouts/AppLayout.vue'),children:[
 {path:'',component:()=>import('../views/DashboardView.vue'),meta:{title:'Informācijas panelis'}},
 {path:'projects',component:()=>import('../views/ProjectsView.vue'),meta:{title:'Projekti'}},
 {path:'projects/:id',component:()=>import('../views/ProjectView.vue'),meta:{title:'Projekta pārskats'}},
 {path:'tasks',component:()=>import('../views/MyTasksView.vue'),meta:{title:'Mani uzdevumi'}},
 {path:'team',component:()=>import('../views/TeamView.vue'),meta:{title:'Komanda'}},
 {path:'settings',component:()=>import('../views/SettingsView.vue'),meta:{title:'Iestatījumi'}}
 ]},
 {path:'/:pathMatch(.*)*',redirect:'/'}
]});
router.beforeEach(async to=>{
 const auth=useAuth();
 if(!auth.ready) { try { await auth.load(); } catch(e) { useUi().fail(e); if(!to.meta.public) return '/login'; } }
 if(!to.meta.public&&!auth.user) return '/login';
 if(to.meta.public&&auth.user) return '/';
 document.title=String(to.meta.title || 'TaskFlow')+' · TaskFlow';
});
export default router;

