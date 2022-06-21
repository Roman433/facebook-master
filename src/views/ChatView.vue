<template>
  <div class="my-10 h-full pl-16 lg:pl-0 pr-2 lg:pr-0">
    <div class="container mx-auto">
      <div class="w-full lg:w-1/2 mx-auto">
        <p class="font-semibold mb-7">
          {{ chatUser[0].name + " " + chatUser[0].surname }}
        </p>

        <div class="bg-slate-100 h-full p-5 rounded-lg">
          <div v-for="message of currentChat" :key="message.id">
            <div class="w-full my-3" v-for="msg of message.text" :key="msg.id">
              <div>
                <p
                  :class="{ 'text-main text-right': msg.from === currentUser }"
                  class="font-semibold"
                >
                  {{ msg.from }}
                </p>
                <p :class="{ 'text-right': msg.from === currentUser }">
                  {{ msg.msg }}
                </p>
              </div>
              <i v-if="msg.status == 1" class="fa-solid fa-check"></i>
              <i v-if="msg.status == 2" class="fa-solid fa-check-double"></i>
            </div>
          </div>
          <div class="flex">
            <input
              v-model="message.text[0].msg"
              type="text"
              placeholder="Напишите сообщение"
              class="w-full p-3 rounded-full mx-1 border"
            />
            <button
              @click="sendMessage()"
              class="bg-main px-3 ml-3 text-white font-bold rounded-lg"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ChatView",
  data() {
    return {
      currentUser: localStorage.getItem("loggedUser"),
      curID: this.$route.params.id,
      message: {
        personOne: null,
        personTwo: null,
        text: [
          {
            from: null,
            msg: null,
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      "sendUsers",
      "activeUser",
      "userFriends",
      "usersList",
      "sendMessages",
    ]),
    chatUser() {
      if (this.sendUsers === null) {
        return console.log("...");
      } else {
        return this.sendUsers.filter((e) => e.id === this.curID);
      }
    },
    currentChat() {
      if (this.sendMessages != null) {
        return this.sendMessages.filter(
          (e) =>
            (e.personOne == this.currentUser ||
              e.personOne == this.chatUser[0].email) &&
            (e.personTwo == this.chatUser[0].email ||
              e.personTwo == this.currentUser)
        );
      } else {
        return console.log("no messages");
      }
    },
  },
  created() {
    this.getUsers();
    this.getMessages();

    this.message.text[0].from = this.activeUser[0].email;
    this.message.personOne = this.currentUser;
    this.message.personTwo = this.chatUser[0].email;
  },
  methods: {
    ...mapActions(["getUsers", "getMessages"]),
    async sendMessage() {
      if (this.currentChat.length <= 0) {
        await axios.post(
          "https://6282500ded9edf7bd882691b.mockapi.io/messages",
          this.message
        );
        console.log("отправлено");
      } else {
        this.currentChat[0].text.push(this.message.text[0]);
        await axios.put(
          "https://6282500ded9edf7bd882691b.mockapi.io/messages/" +
            this.currentChat[0].id,
          this.currentChat[0]
        );
      }
    },
  },
};
</script>
