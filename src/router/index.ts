import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreatorView from "../views/CreatorView.vue";
import EditView from "../views/EditView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/new-collection",
    name: "new-collection",
    component: CreatorView,
  },
  {
    path: "/edit/:id",
    name: "edit-collection",
    component: EditView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
