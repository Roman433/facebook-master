<template>
  <div class="w-full pl-14">
    <div class="bg-slate-100">
      <div class="container mx-auto">
        <div class="w-full h-80 rounded-xl">
          <img
            class="w-full h-full object-cover"
            :src="activeUser[0].background"
            alt=""
          />
        </div>
        <div class="block lg:flex pl-4 items-center justify-between py-3">
          <div class="block lg:flex items-center">
            <img
              class="h-20 w-20 object-cover mr-4 rounded-full"
              :src="activeUser[0].avatar"
              alt=""
            />
            <div>
              <p class="text-3xl font-bold">
                {{ activeUser[0].name + " " + activeUser[0].surname }}
              </p>
              <p class="font-bold mb-3">
                Друзья: {{ activeUser[0].friends.length }}
              </p>
              <div class="flex items-center justify-start">
                <img
                  class="w-7 h-7 rounded-full object-cover"
                  v-for="ava of userFriends"
                  :key="ava.id"
                  :src="ava.avatar"
                  alt=""
                />
              </div>
            </div>
          </div>
          <p class="font-bold bg-slate-200 p-2 rounded-lg w-max lg:w-auto mx-auto lg:mx-0 mt-4 hover:cursor-pointer">
            Редактировать профиль
          </p>
        </div>
      </div>
    </div>
    <div class="container mx-auto mt-5 pl-4 lg:pl-0">
      <div class="block lg:flex items-start justify-between">
        <div class="w-full lg:w-1/3 bg-slate-100 p-4 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Краткая информация</h2>
          <p>
            Работа:
            <span
              class="font-bold"
              v-if="activeUser[0].profileInfo.working != ''"
              >{{ activeUser[0].profileInfo.working }}</span
            >
            <span
              class="font-bold"
              v-if="activeUser[0].profileInfo.working === ''"
              >Данные отсутствуют</span
            >
          </p>
          <p>
            Информация о себе:
            <span
              class="font-bold"
              v-if="activeUser[0].profileInfo.aboutMe != ''"
              >{{ activeUser[0].profileInfo.aboutMe }}</span
            >
            <span
              class="font-bold"
              v-if="activeUser[0].profileInfo.aboutMe === ''"
              >Данные отсутствуют</span
            >
          </p>
          <p>
            Место проживания:
            <span
              class="font-bold"
              v-if="activeUser[0].profileInfo.city != ''"
              >{{ activeUser[0].profileInfo.city }}</span
            >
            <span class="font-bold" v-if="activeUser[0].profileInfo.city === ''"
              >Данные отсутствуют</span
            >
          </p>
        </div>
        <div class="w-full lg:w-2/3">
          <h2 class="font-bold text-xl mb-5">Публикации</h2>
          <div class="flex bg-slate-100 p-2 rounded-lg mb-4">
            <img
              class="w-10 h-10 my-auto mr-5 rounded-full"
              :src="activeUser[0].avatar"
              alt=""
            />
            <input
              v-model="newPost.text"
              class="w-full p-3 rounded-full mx-1 border"
              type="text"
              placeholder="Что у вас нового?"
            />
            <input
              v-model="newPost.image"
              class="w-full p-3 rounded-full mx-1 border"
              type="text"
              placeholder="Загрузите картинку"
            />
            <input
              v-model="newPost.video"
              class="w-full p-3 rounded-full mx-1 border"
              type="text"
              placeholder="Загрузите видео"
            />
            <button
              @click="sendPost()"
              class="bg-main px-3 ml-3 text-white font-bold rounded-lg"
            >
              Отправить
            </button>
          </div>
          <postsComp v-bind:setPosts="'userPosts'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postsComp from "../components/PostsComp.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "ProfileView",
  data() {
    return {
      newPost: {
        user_login: localStorage.getItem("loggedUser"),
        text: null,
        likes: [],
        comments: [],
        image: null,
        video: null,
      },
      currentUser: localStorage.getItem("loggedUser"),
    };
  },
  components: {
    postsComp,
  },
  computed: {
    ...mapGetters(["sendUsers", "activeUser", "userFriends"]),
  },
  async created() {
    this.getUsers();
    let posts = await axios.get(
      "https://6282500ded9edf7bd882691b.mockapi.io/posts"
    );
    this.posts = posts.data;
  },
  methods: {
    ...mapActions(["getUsers"]),
    async sendPost() {
      await axios.post(
        "https://6282500ded9edf7bd882691b.mockapi.io/posts",
        this.newPost
      );
      this.$router.go();
    },
  },
};
</script>