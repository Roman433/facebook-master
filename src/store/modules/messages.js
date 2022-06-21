import axios from "axios";
export default {
  actions: {
    async getMessages({ commit }) {
      let res = await axios.get(
        "https://6282500ded9edf7bd882691b.mockapi.io/messages"
      );
      let newMessages = res.data;
      commit("updateMessages", newMessages);
    },
  },
  mutations: {
    updateMessages(state, newMessages) {
      state.messages = newMessages;
    },
  },
  state: {
    messages: null,
    currentUser: localStorage.getItem("loggedUser"),
  },
  getters: {
    sendMessages(state) {
      return state.messages;
    },
  },
};
