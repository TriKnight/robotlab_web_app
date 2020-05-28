import Vue from "vue";
import VueRouter from "vue-router";
import NavBar from "../views/NavBar.vue";
import TopBar from "../views/TopBar.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "NavBar",
    component: NavBar
  },
  {
    path: "/topbar",
    name: "TopBar",
    component: TopBar
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
