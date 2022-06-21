import axios from "axios";

export default {
  actions: {
    async getUsers({ commit }) {
      let res = await axios.get(
        "https://6282500ded9edf7bd882691b.mockapi.io/users"
      );
      let newUsers = res.data;
      commit("updateUsers", newUsers);
    },
  },
  mutations: {
    updateUsers(state, newUsers) {
      state.users = newUsers;
    },
  },
  state: {
    users: null,
    currentUser: localStorage.getItem("loggedUser"),
  },
  getters: {
    sendUsers(state) {
      return state.users;
    },
    activeUser(state) {
      if (state.users === null) {
        return console.log("...");
      } else {
        return state.users.filter((e) => e.email === state.currentUser);
      }
    },
    userFriends(state, getters) {
      if (state.users != null) {
        return state.users.filter((i) =>
          getters.activeUser[0].friends.includes(i.email)
        );
      } else {
        return console.log("...");
      }
    },
    usersList(state, getters) {
      if (state.users != null) {
        return state.users.filter(
          (i) => !getters.activeUser[0].friends.includes(i.email)
        );
      } else {
        return console.log("...");
      }
    },
  },
};
