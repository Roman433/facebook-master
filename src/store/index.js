import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import posts from "./modules/posts";
import messages from "./modules/messages";
import notifications from "./modules/notifications";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    posts,
    messages,
    notifications,
  },
});
