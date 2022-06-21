import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView";
import SingleProfile from "../views/SingleProfile";
import MessagesView from "../views/MessagesView";
import ChatView from "../views/ChatView";
import SetNotify from "../views/SetNotify";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/profile/:id",
    name: "single",
    component: SingleProfile,
  },
  {
    path: "/messages",
    name: "messages",
    component: MessagesView,
  },
  {
    path: "/messages/:id",
    name: "chat",
    component: ChatView,
  },
  {
    path: "/notifications",
    name: "notifications",
    component: SetNotify,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
