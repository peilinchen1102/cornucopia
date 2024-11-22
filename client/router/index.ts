import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import AudioView from "../views/AudioView.vue";
import HomeView from "../views/HomeView.vue";
import InventoryView from "../views/InventoryView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import OrganizationView from "../views/OrganizationView.vue";
import PatronView from "../views/PatronView.vue";
import SettingView from "../views/SettingView.vue";
import TimesheetView from "../views/TimesheetView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/inventory",
      name: "Inventory",
      component: InventoryView,
      meta: { requiresAuth: true },
    },
    {
      path: "/patrons",
      name: "Patrons",
      component: PatronView,
      meta: { requiresAuth: true },
    },
    {
      path: "/audio",
      name: "Audio",
      component: AudioView,
      meta: { requiresAuth: true },
    },
    {
      path: "/timesheet",
      name: "Timesheet",
      component: TimesheetView,
      meta: { requiresAuth: true },
    },
    {
      path: "/organization",
      name: "Organization",
      component: OrganizationView,
      meta: { requiresAuth: true },
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
