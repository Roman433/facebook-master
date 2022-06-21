<template>
  <div class="py-44 bg-slate-100">
    <div class="container mx-auto">
      <div class="block lg:flex items-center justify-between">
        <div class="w-full lg:w-1/2 mb-5 lg:mb-0 mx-2">
          <img
            class="w-1/2 mb-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/1200px-Facebook_Logo_%282019%29.svg.png"
            alt=""
          />
          <p class="text-sm lg:text-2xl font-medium">
            Facebook помогает вам всегда оставаться на связи и общаться со
            своими знакомыми.
          </p>
        </div>
        <div class="px-2">
          <div class="w-full lg:w-1/2 bg-white rounded-xl p-5">
            <div v-if="setForm === 1">
              <input
                v-model="login.email"
                class="w-full p-3 rounded-lg border my-2"
                placeholder="Электронный адрес"
                type="email"
              />
              <input
                v-model="login.password"
                class="w-full p-3 rounded-lg border my-2"
                placeholder="Пароль"
                type="text"
              />
              <button
                @click="loginUser()"
                class="
                  bg-main
                  p-3
                  text-xl
                  font-medium
                  mt-2
                  text-center
                  w-full
                  rounded-lg
                  text-white
                "
              >
                Вход
              </button>
            </div>
            <div v-if="setForm === 2">
              <input
                v-model="registration.name"
                class="w-full p-3 rounded-lg border my-2"
                placeholder="Имя"
                type="text"
              />
              <input
                v-model="registration.surname"
                class="w-full p-3 rounded-lg border my-2"
                placeholder="Фамилия"
                type="text"
              />
              <input
                v-model="registration.email"
                class="w-full p-3 rounded-lg border my-2"
                placeholder="Email"
                type="text"
              />
              <input
                v-model="registration.phone"
                class="w-full p-3 rounded-lg border my-2"
                placeholder="Телефон"
                type="text"
              />
              <div class="flex items-center justify-between">
                <div>
                  <label class="mr-2" for="">Мужчина</label>
                  <input
                    v-model="registration.gender"
                    type="radio"
                    name="gender"
                    value="male"
                  />
                </div>
                <div>
                  <label class="mr-2" for="">Женщина</label>
                  <input
                    v-model="registration.gender"
                    type="radio"
                    name="gender"
                    value="female"
                  />
                </div>
              </div>
              <input
                v-model="registration.password"
                class="w-full p-3 rounded-lg border my-2"
                placeholder="Пароль"
                type="text"
              />
              <button
                @click="regiterUser()"
                class="
                  bg-main
                  p-3
                  text-xl
                  font-medium
                  mt-2
                  text-center
                  w-full
                  rounded-lg
                  text-white
                "
              >
                Регистрация
              </button>
            </div>
            <div class="w-full border-b my-2"></div>
            <button
              @click="setForm = 2"
              v-if="setForm === 1"
              class="
                bg-green-500
                p-3
                text-xl
                font-medium
                text-center
                w-full
                rounded-lg
                text-white
              "
            >
              Регистрация
            </button>
            <button
              @click="setForm = 1"
              v-if="setForm === 2"
              class="
                bg-green-500
                p-3
                text-xl
                font-medium
                text-center
                w-full
                rounded-lg
                text-white
              "
            >
              Вход
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
  name: "RegistrationLogin",
  data() {
    return {
      setForm: 1,
      registration: {
        name: null,
        surname: null,
        email: null,
        phone: null,
        gender: null,
        password: null,
        background: "https://cdn.wallpapersafari.com/19/16/i0afrx.jpg",
        avatar:
          "https://www.pngitem.com/pimgs/m/575-5759580_anonymous-avatar-image-png-transparent-png.png",
        friends: ["oljasalidarov@gmail.com"],
        profileInfo: {
          aboutMe: "",
          working: "",
          city: "",
        },
        photos: [],
      },
      login: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters(["sendUsers"]),
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions(["getUsers"]),
    async regiterUser() {
      await axios.post(
        "https://6282500ded9edf7bd882691b.mockapi.io/users",
        this.registration
      );
      this.$router.go();
    },
    loginUser() {
      this.sendUsers.forEach((element) => {
        if (
          element.email == this.login.email &&
          element.password == this.login.password
        ) {
          localStorage.setItem("loggedUser", element.email);
          this.$router.go();
        } else {
          console.log("...");
        }
      });
    },
  },
};
</script>