<template>
  <div>
    <div
      class="bg-slate-100 mb-4 rounded-lg"
      v-for="(post, index) of setTypePosts"
      :key="post.id"
    >
      <div
        @click="$router.push({ name: 'single', params: { id: post } })"
        class="flex items-center p-3 hover:cursor-pointer"
      >
        <img
          class="w-12 h-12 rounded-full mr-4 object-cover"
          :src="post.info.avatar"
          alt=""
        />
        <div>
          <p class="font-semibold text-sm">
            {{ post.info.name + " " + post.info.surname }}
          </p>
          <p class="text-xs">{{ post.createdAt }}</p>
        </div>
      </div>
      <p class="my-2 text-sm px-3">{{ post.text }}</p>
      <img class="w-full" :src="post.image" alt="" />
      <p
        :class="{ 'text-blue-500': post.likes.includes(currentUser) }"
        class="hover:cursor-pointer p-3"
        @click="setLike(index)"
      >
        <i class="fa-regular fa-heart mr-2"></i>{{ post.likes.length }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PostsComp",
  data() {
    return {
      currentUser: localStorage.getItem("loggedUser"),
    };
  },
  props: ["setPosts"],
  computed: {
    ...mapGetters([
      "sendUsers",
      "activeUser",
      "userFriends",
      "sendPosts",
      "friendsPost",
      "userPosts",
    ]),
    setTypePosts() {
      if (this.setPosts == "userPosts") {
        return this.userPosts;
      } else {
        return this.friendsPost;
      }
    },
  },
  created() {
    this.getUsers();
    this.getPosts();
  },
  methods: {
    ...mapActions(["getUsers", "getPosts"]),
    async setLike(id) {
      let postID = this.setTypePosts[id].id;
      if (this.setTypePosts[id].likes.includes(this.currentUser)) {
        let myIndex = this.setTypePosts[id].likes.indexOf(this.currentUser);
        this.setTypePosts[id].likes.splice(myIndex, 1);
        await axios.put(
          "https://6282500ded9edf7bd882691b.mockapi.io/posts/" + postID,
          this.setTypePosts[id]
        );
      } else {
        console.log(postID);
        this.setTypePosts[id].likes.push(this.currentUser);
        await axios.put(
          "https://6282500ded9edf7bd882691b.mockapi.io/posts/" + postID,
          this.setTypePosts[id]
        );
      }
    },
  },
};
</script>
