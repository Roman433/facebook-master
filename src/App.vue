<template>
  <div id="app">
    <regLog v-if="currentUser == null" />
    <div v-else>
      <div class="fixed border-r py-5 h-full bg-white w-14 left-0 top-0">
        <i
          @click="$router.push({ name: 'profile' })"
          class="
            fa-solid fa-user
            block
            text-center text-2xl
            my-2
            hover:cursor-pointer hover:text-main
          "
        ></i>
        <i
          @click="$router.push({ name: 'home' })"
          class="
            fa-solid fa-house
            block
            text-center text-2xl
            my-2
            hover:cursor-pointer hover:text-main
          "
        ></i>
        <i
          @click="$router.push({ name: 'messages' })"
          class="
            fa-solid fa-message
            block
            text-center text-2xl
            my-2
            hover:cursor-pointer hover:text-main
          "
        ></i>
        <i
          @click="$router.push({ name: 'notifications' })"
          class="
            fa-solid fa-bell
            block
            text-center text-2xl
            my-2
            hover:cursor-pointer hover:text-main
            relative
          "
          ><p
          v-if="setNotify.length > 0"
            class="
              absolute
              right-0
              top-0
              text-xs
              w-5
              h-5
              bg-red-500
              rounded-full
              text-white
            "
          >
            {{ setNotify.length }}
          </p></i
        >
      </div>
      <div class="absolute top-5 right-5 flex items-center flex-row-reverse">
        <p
          @click="logout()"
          class="
            p-2
            rounded-lg
            bg-slate-200
            text-black text-lg
            font-bold
            hover:cursor-pointer hover:bg-black hover:text-white
          "
        >
          Выйти
        </p>
        <i
          @click="showSearch()"
          class="
            fa-solid fa-magnifying-glass
            text-2xl
            hover:cursor-pointer
            mx-10
          "
        ></i>
        <div v-if="searchShow == 1" class="relative setFocus">
          <input
            v-model="search"
            @keyup="typeSearch()"
            type="text"
            class="p-2 rounded-lg w-full border"
            placeholder="Поиск..."
          />
          <div
            class="
              w-full
              absolute
              top-full
              left-0
              bg-white
              p-2
              rounded-lg
              anotherFocus
            "
          >
            <div
              class="my-1 flex items-center"
              v-for="user of filteredUsers"
              :key="user.id"
            >
              <img
                class="w-8 h-8 rounded-full object-cover mr-2"
                :src="user.avatar"
                alt=""
              />
              <p
                class="font-semibold text-sm"
                @click="$router.push({ name: 'single', params: { id: user } })"
              >
                {{ user.name + " " + user.surname }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import regLog from "./components/RegistrationLogin.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    regLog,
  },
  data() {
    return {
      currentUser: localStorage.getItem("loggedUser"),
      searchShow: 0,
      search: "",
      filteredUsers: [],
    };
  },
  computed: { ...mapGetters(["sendUsers", "setNotify"]) },
  methods: {
    ...mapActions(["getUsers", "getNotifications"]),
    typeSearch() {
      let a = this.sendUsers.filter((e) =>
        e.name.toLowerCase().includes(this.search.toLowerCase())
      );
      this.filteredUsers = a;
    },
    logout() {
      localStorage.removeItem("loggedUser");
      this.$router.go();
    },
    showSearch() {
      if (this.searchShow == 0) {
        this.searchShow = 1;
      } else {
        this.searchShow = 0;
      }
    },
  },
  async created() {
    this.getUsers();
    this.getNotifications();
  },
};
</script>