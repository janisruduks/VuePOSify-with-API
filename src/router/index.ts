// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/items",
        name: "Items",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Items.vue"),
      },
      {
        path: "/orders",
        name: "Orders",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Orders.vue"),
      },
      {
        path: "/tables",
        name: "Tables",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Tables.vue"),
      },
      {
        path: "/test",
        name: "Test",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Test.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
