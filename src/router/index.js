import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomepageContent from '../components/HomepageContent.vue'
import MainPlayer from '../views/MainPlayer.vue'
import Search from '../views/Search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'luna',
      component: HomeView,
      children:[
        {
          path:'',
          name:'home',
          component: HomepageContent,
        },
        {
          path:'search/:id',
          name:'search',
          component: Search,
        }
      ]
      
    },
    {
      path:'/player',
      name:'player',
      component:MainPlayer,
    },
  ]
})


router.beforeEach((to, from, next) => {
  const targetView = to.meta.targetView;
  if (targetView) {
    router.app.$root.targetView = targetView;
  }
  next();
});

export default router
