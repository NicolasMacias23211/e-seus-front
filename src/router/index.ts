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
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/cliente-principal",
      name: "settings-clients",
      component: () => import("../../views/adminMenu/Clients.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/programa",
      name: "settings-programs",
      component: () => import("../../views/adminMenu/Programs.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/sub-programa",
      name: "settings-subprograms",
      component: () => import("../../views/adminMenu/SubPrograms.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/tipos-servicio",
      name: "settings-services",
      component: () => import("../../views/adminMenu/Services.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/ans",
      name: "settings-ans",
      component: () => import("../../views/adminMenu/ANS.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/status",
      name: "settings-status",
      component: () => import("../../views/adminMenu/Status.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/codigos-cierre",
      name: "settings-closing-codes",
      component: () => import("../../views/adminMenu/ClosingCodes.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/estados-solicitud",
      name: "settings-priorities",
      component: () => import("../../views/adminMenu/TicketPriorities.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/e-usuarios",
      name: "settings-eusers",
      component: () => import("../../views/adminMenu/EUsers.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/usuarios",
      name: "settings-users",
      component: () => import("../../views/adminMenu/Users.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/roles",
      name: "settings-roles",
      component: () => import("../../views/adminMenu/Roles.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/horarios",
      name: "settings-horarios",
      component: () => import("../../views/adminMenu/WorkingHours.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/programacion",
      name: "settings-progamación",
      component: () => import("../../views/adminMenu/ScheduleDays.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/novedades",
      name: "settings-novelties",
      component: () => import("../../views/adminMenu/Novelties.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/settings/carga-masiva",
      name: "settings-massive-tickets-load",
      component: () => import("../../views/adminMenu/MassiveTicketsLoad.vue"),
      meta: { requiresAdmin: true },
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
      component: () => import("../../views/userInfo/Profile.vue"),
    },
    {
      path: "/reports",
      name: "reports",
      component: () => import("../../views/Reports.vue"),
      meta: { requiresAdmin: true },
    },
    {
      path: "/novelties",
      name: "novelties",
      component: () => import("../../views/Novelties.vue"),
    },
    {
      path: "/schedule",
      name: "schedule",
      component: () => import("../../views/Schedule.vue"),
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
  } else if (to.meta.requiresAdmin && userInfo.isAdmin !== true) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
