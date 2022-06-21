<template>
  <div>
    <div
      class="
        flex
        items-center
        justify-between
        hover:cursor-pointer hover:text-blue-500
      "
      v-for="user of usersList"
      :key="user.id"
    >
      <div class="flex items-center my-2">
        <img
          class="w-9 h-9 object-cover rounded-full mr-2"
          :src="user.avatar"
          alt=""
        />
        <p class="text-sm font-semibold">
          {{ user.name + " " + user.surname }}
        </p>
      </div>
      <p @click="addToFriends(user.email)" class="ml-2">
        <i class="fa-solid fa-plus"></i>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NotFriends",
  data() {
    return {
      currentUser: localStorage.getItem("loggedUser"),
    };
  },
  computed: {
    ...mapGetters(["sendUsers", "activeUser", "userFriends", "usersList"]),
  },
  async created() {
    this.getUsers();
  },
  methods: {
    ...mapActions(["getUsers"]),
    async addToFriends(email) {
      this.activeUser[0].friends.push(email);
      await axios.put(
        "https://6282500ded9edf7bd882691b.mockapi.io/users/" +
          this.activeUser[0].id,
        this.activeUser[0]
      );
      this.$router.go();
    },
  },
};
</script>