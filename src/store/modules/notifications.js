import axios from "axios";
export default {
  actions: {
    async getNotifications({ commit }) {
      let res = await axios.get(
        "https://6282500ded9edf7bd882691b.mockapi.io/notifications"
      );
      let newNotifications = res.data;
      commit("updateNotifications", newNotifications);
    }
  },
  mutations: {
    updateNotifications(state, newNotifications) {
      state.notifications = newNotifications;
    },
  },
  state: {
    notifications: null,
    currentUser: localStorage.getItem("loggedUser"),
  },
  getters: {
    sendNotifications(state) {
      return state.notifications;
    },
    filterNotifications(state) {
      if(state.notifications != null) {
        return state.notifications.filter((e) => e.user_login == state.currentUser)
      } else {
        return console.log('...')
      }
    },
    setNotify(state) {
      if(state.notifications != null) {
        return state.notifications.filter((e) => e.user_login == state.currentUser && e.status != 1)
      } else {
        return console.log('...')
      }
    }
  },
};
