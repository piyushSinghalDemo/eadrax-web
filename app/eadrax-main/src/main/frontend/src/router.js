import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/auth/Login.vue";
import FindCrew from "./components/profile/FindCrew.vue";
import Profile from "./components/profile/Profile.vue";
import CustomerProfile from "./components/profile/CustomerProfile.vue";
import Logout from "./components/auth/Logout.vue";
import Projects from "./components/projects";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/findCrew",
      name: "findCrew",
      component: FindCrew
    },
    {
      path: "/customerprofile",
      name: "customerprofile",
      component: CustomerProfile
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/forgot",
      name: "forgot",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/auth/ForgotPassword.vue")
    },
    {
      path: "/reset",
      name: "reset",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/auth/ResetPassword.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/auth/Register.vue")
    }
  ]
});
