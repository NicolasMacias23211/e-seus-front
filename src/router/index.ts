import { createRouter, createWebHistory } from "vue-router";
import { SessionStorageService } from "../../services/SessionStorageService";
import Login from "../../views/Login.vue";
import Dashboard from "../../views/Dashboard.vue";
import KanvanBoard from "../../views/Board.vue";
import TicketsList from "../../views/TicketsList.vue";
import TicketDetail from "../../views/TicketDetail.vue";
import TimeTracking from "../../views/TimeTracking.vue";
import Backlog from "../../views/Backlog.vue";
import Team from "../../views/Team.vue";
import Proyects from "../../views/Proyects.vue";
import Reports from "../../views/Reports.vue";
import Settings from "../../views/Settings.vue";
import CreateTicket from "../../views/externalsUsers/CreateTicket.vue";
import ExternalTicketsList from "../../views/externalsUsers/TicketsList.vue";
import Profile from "../../views/externalsUsers/Profile.vue";
import Clients from "../../views/adminMenu/Clients.vue";
import Programs from "../../views/adminMenu/Programs.vue";
import SubPrograms from "../../views/adminMenu/SubPrograms.vue";
import Services from "../../views/adminMenu/Services.vue";
import ANS from "../../views/adminMenu/ANS.vue";
import ClosingCodes from "../../views/adminMenu/ClosingCodes.vue";
import TicketPriorities from "../../views/adminMenu/TicketPriorities.vue";
import EUsers from "../../views/adminMenu/EUsers.vue";
import Users from "../../views/adminMenu/Users.vue";
import Roles from "../../views/adminMenu/Roles.vue";

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
      component: Login,
      meta: { layout: "standalone" },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/backlog",
      name: "backlog",
      component: Backlog,
    },
    {
      path: "/board",
      name: "board",
      component: KanvanBoard,
    },
    {
      path: "/tickets",
      name: "tickets",
      component: TicketsList,
    },
    {
      path: "/ticket/:id",
      name: "ticket-detail",
      component: TicketDetail,
    },
    {
      path: "/timetracking",
      name: "timetracking",
      component: TimeTracking,
    },
    {
      path: "/team",
      name: "team",
      component: Team,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/settings/cliente-principal",
      name: "settings-clients",
      component: Clients,
    },
    {
      path: "/settings/programa",
      name: "settings-programs",
      component: Programs,
    },
    {
      path: "/settings/sub-programa",
      name: "settings-subprograms",
      component: SubPrograms,
    },
    {
      path: "/settings/tipos-servicio",
      name: "settings-services",
      component: Services,
    },
    {
      path: "/settings/ans",
      name: "settings-ans",
      component: ANS,
    },
    {
      path: "/settings/codigos-cierre",
      name: "settings-closing-codes",
      component: ClosingCodes,
    },
    {
      path: "/settings/estados-solicitud",
      name: "settings-priorities",
      component: TicketPriorities,
    },
    {
      path: "/settings/e-usuarios",
      name: "settings-eusers",
      component: EUsers,
    },
    {
      path: "/settings/usuarios",
      name: "settings-users",
      component: Users,
    },
    {
      path: "/settings/roles",
      name: "settings-roles",
      component: Roles,
    },
    {
      path: "/create-ticket",
      name: "create-ticket",
      component: CreateTicket,
      meta: { layout: "standalone" },
    },
    {
      path: "/created-tickets",
      name: "created-tickets",
      component: ExternalTicketsList,
      meta: { layout: "standalone" },
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    { path: "/projects", name: "proyects", component: Proyects },
    {
      path: "/reports",
      name: "reports",
      component: Reports,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userInfo = sessionStorage.getUserInfo();
  const isAuthenticated = userInfo !== null;

  const eUsersRoutes = ["/login"];

  const publicRoutes = ["/create-ticket", "/created-tickets", "/login"];

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
