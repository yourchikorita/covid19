import Vue from 'vue'
import VueRouter from 'vue-router';
import DashboardView from '../views/DashboardView'
import NewsListView from '../views/NewsListView'
Vue.use(VueRouter)

const router = new VueRouter({
    mode : "history",
    routes : [
        { path:'/' , component: DashboardView},
        { path: '/news', component: NewsListView},
    ]
})

export default router