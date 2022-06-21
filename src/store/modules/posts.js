import axios from "axios";
export default {
  actions: {
    async getPosts({ commit }) {
      let res = await axios.get(
        "https://6282500ded9edf7bd882691b.mockapi.io/posts"
      );
      let newPosts = res.data;
      commit("updatePosts", newPosts);
    },
  },
  mutations: {
    updatePosts(state, newPosts) {
      state.posts = newPosts;
    },
  },
  state: {
    posts: null,
    currentUser: localStorage.getItem("loggedUser"),
  },
  getters: {
    sendPosts(state) {
      return state.posts;
    },
    friendsPost(state, getters) {
      if (state.posts) {
        let arr = state.posts.filter((e) =>
          getters.activeUser[0].friends.includes(e.user_login)
        );
        let arrWithInfo = arr.map((post) => {
          post.info = getters.userFriends.find(
            (user) => post.user_login == user.email
          );
          return post;
        });
        return arrWithInfo;
      }
      return [];
    },
    userPosts(state) {
      if (state.posts === null) {
        return console.log("...");
      } else {
        return state.posts.filter((e) => e.user_login === state.currentUser);
      }
    },
  },
};
