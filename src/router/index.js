import Vue from "vue";
import VueRouter from "vue-router";
import NavBar from "../views/NavBar.vue";
import TopBar from "../views/TopBar.vue";
import View3d from "../views/View3d.vue";
import View3DMap from "../views/View3DMap.vue";

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
    path: "/view3d",
    name: "View3d",
    component: View3d
  },
  {
    path: "/view3dmap",
    name: "View3DMap",
    component: View3DMap
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
