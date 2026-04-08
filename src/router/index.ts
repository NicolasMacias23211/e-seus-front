import { createRouter, createWebHistory } from "vue-router";
import { SessionStorageService } from "../../services/SessionStorageService";

const sessionStorage = new SessionStorageService();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../../views/Login.vue"),
      meta: { layout: "standalone" },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../../views/Dashboard.vue"),
    },
    {
      path: "/backlog",
      name: "backlog",
      component: () => import("../../views/Backlog.vue"),
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../../views/Board.vue"),
    },
    {
      path: "/tickets",
      name: "tickets",
      component: () => import("../../views/TicketsList.vue"),
    },
    {
      path: "/ticket/:id",
      name: "ticket-detail",
      component: () => import("../../views/TicketDetail.vue"),
    },
    {
      path: "/timetracking",
      name: "timetracking",
      component: () => import("../../views/TimeTracking.vue"),
    },
    {
      path: "/team",
      name: "team",
      component: () => import("../../views/Team.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../../views/Settings.vue"),
    },
    {
      path: "/settings/cliente-principal",
      name: "settings-clients",
      component: () => import("../../views/adminMenu/Clients.vue"),
    },
    {
      path: "/settings/programa",
      name: "settings-programs",
      component: () => import("../../views/adminMenu/Programs.vue"),
    },
    {
      path: "/settings/sub-programa",
      name: "settings-subprograms",
      component: () => import("../../views/adminMenu/SubPrograms.vue"),
    },
    {
      path: "/settings/tipos-servicio",
      name: "settings-services",
      component: () => import("../../views/adminMenu/Services.vue"),
    },
    {
      path: "/settings/ans",
      name: "settings-ans",
      component: () => import("../../views/adminMenu/ANS.vue"),
    },
    {
      path: "/settings/status",
      name: "settings-status",
      component: () => import("../../views/adminMenu/Status.vue"),
    },
    {
      path: "/settings/codigos-cierre",
      name: "settings-closing-codes",
      component: () => import("../../views/adminMenu/ClosingCodes.vue"),
    },
    {
      path: "/settings/estados-solicitud",
      name: "settings-priorities",
      component: () => import("../../views/adminMenu/TicketPriorities.vue"),
    },
    {
      path: "/settings/e-usuarios",
      name: "settings-eusers",
      component: () => import("../../views/adminMenu/EUsers.vue"),
    },
    {
      path: "/settings/usuarios",
      name: "settings-users",
      component: () => import("../../views/adminMenu/Users.vue"),
    },
    {
      path: "/settings/roles",
      name: "settings-roles",
      component: () => import("../../views/adminMenu/Roles.vue"),
    },
    {
      path: "/settings/horarios",
      name: "settings-horarios",
      component: () => import("../../views/adminMenu/WorkingHours.vue"),
    },
    {
      path: "/create-ticket",
      name: "create-ticket",
      component: () => import("../../views/externalsUsers/CreateTicket.vue"),
      meta: { layout: "standalone" },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../../views/externalsUsers/Profile.vue"),
    },
    {
      path: "/reports",
      name: "reports",
      component: () => import("../../views/Reports.vue"),
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const userInfo = sessionStorage.getUserInfo();
  const isAuthenticated = userInfo !== null;

  const eUsersRoutes = ["/login"];

  const publicRoutes = ["/create-ticket", "/login"];

  if (!isAuthenticated && !eUsersRoutes.includes(to.path)) {
    next("/login");
  } else if (
    isAuthenticated &&
    userInfo.isEUser === false &&
    !publicRoutes.includes(to.path)
  ) {
    next("/create-ticket");
  } else {
    next();
  }
});

export default router;
