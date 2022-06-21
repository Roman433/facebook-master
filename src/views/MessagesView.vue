<template>
  <div class="my-10 pl-16 pr-2">
    <div class="container mx-auto">
      <div class="w-full lg:w-1/2 mx-auto bg-slate-100 p-5 rounded-lg">
        <h1 class="text-xl font-semibold">Сообщения</h1>
        <div
          class="my-4 flex items-center justify-between"
          v-for="user of userFriends"
          :key="user.id"
        >
          <div class="flex items-center">
            <img
              class="w-8 h-8 rounded-full object-cover mr-3"
              :src="user.avatar"
              alt=""
            />
            <p>{{ user.name + " " + user.surname }}</p>
          </div>
          <p
            @click="$router.push({ name: 'chat', params: { id: user.id } })"
            class="text-sm font-semibold text-main hover:cursor-pointer flex items-center"
          >
            <span class="hidden lg:flex">Перейти в чат</span> <i class="fa-solid fa-arrow-right flex"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MessagesView",
  data() {
    return {
      users: null,
      currentUser: localStorage.getItem("loggedUser"),
    };
  },
  computed: {
    activeUser() {
      if (this.users === null) {
        return console.log("...");
      } else {
        return this.users.filter((e) => e.email === this.currentUser);
      }
    },
    userFriends() {
      if (this.users != null) {
        return this.users.filter((i) =>
          this.activeUser[0].friends.includes(i.email)
        );
      } else {
        return console.log("no");
      }
    },
  },
  async created() {
    let res = await axios.get(
      "https://6282500ded9edf7bd882691b.mockapi.io/users"
    );
    this.users = res.data;
  },
};
</script>
