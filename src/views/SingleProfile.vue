<template>
  <div>
    <div class="bg-slate-100">
      <div class="container mx-auto">
        <div class="w-full h-80 rounded-xl">
          <img
            class="w-full h-full object-cover"
            :src="currentFriend.info.background"
            alt=""
          />
        </div>
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center">
            <img
              class="h-20 w-20 object-cover mr-4 rounded-full"
              :src="currentFriend.info.avatar"
              alt=""
            />
            <div>
              <p class="text-3xl font-bold">
                {{ currentFriend.info.name + " " + currentFriend.info.surname }}
              </p>
              <p class="font-bold mb-3">
                Друзья: {{ currentFriend.info.friends.length }}
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
        </div>
      </div>
    </div>
    <!-- <div class="container mx-auto mt-5">
      <div class="flex items-start justify-between">
        <div class="w-1/3 bg-slate-100 p-4 rounded-lg">
        <h2 class="text-xl font-bold mb-4">Краткая информация</h2>
          <p>Работа: 
            <span class="font-bold" v-if="activeUser[0].profileInfo.working != ''">{{ activeUser[0].profileInfo.working }}</span>
            <span class="font-bold" v-if="activeUser[0].profileInfo.working === ''">Данные отсутствуют</span></p>
          <p>Информация о себе: 
            <span class="font-bold" v-if="activeUser[0].profileInfo.aboutMe != ''">{{ activeUser[0].profileInfo.aboutMe }}</span>
            <span class="font-bold" v-if="activeUser[0].profileInfo.aboutMe === ''">Данные отсутствуют</span></p>
          <p>Место проживания: 
            <span class="font-bold" v-if="activeUser[0].profileInfo.city != ''">{{ activeUser[0].profileInfo.city }}</span>
            <span class="font-bold" v-if="activeUser[0].profileInfo.city === ''">Данные отсутствуют</span></p>
        </div>
        <div class="w-2/3 pl-4">
          <h2 class="font-bold text-xl mb-5">Публикации</h2>
          <div class="flex bg-slate-100 p-2 rounded-lg mb-4">
            <img class="w-10 h-10 my-auto mr-5 rounded-full" :src="activeUser[0].avatar" alt="">
            <input v-model="newPost.text" class="w-full p-3 rounded-full mx-1 border" type="text" placeholder="Что у вас нового?">
            <input v-model="newPost.image" class="w-full p-3 rounded-full mx-1 border" type="text" placeholder="Загрузите картинку">
            <input v-model="newPost.video" class="w-full p-3 rounded-full mx-1 border" type="text" placeholder="Загрузите видео">
            <button @click="sendPost()" class="bg-main px-3 ml-3 text-white font-bold rounded-lg">Отправить</button>
          </div>
          <div class="flex flex-wrap flex-col-reverse">
            <div class="bg-slate-100 w-full p-4 rounded-lg mb-4" v-for="(post, index) of userPosts" :key="post.id">
              <div class="flex items-start mb-3">
                <img class="w-14 h-auto mr-5 rounded-full" :src="activeUser[0].avatar" alt="">
                <div>
                  <p class="text-xl font-bold">{{ activeUser[0].name + " " + activeUser[0].surname }}</p>
                  <p>{{ post.createdAt }}</p>
                </div>
              </div>
              <div>
                <p class="mb-4">{{ post.text }}</p>
                <img class="w-full" :src="post.image" alt="">
                <div class="my-2 flex items-center">
                  <p class="block my-auto text-whitet bg-main mr-2 text-center text-white rounded-full w-7 h-7">
                    <i class="fa-regular fa-thumbs-up"></i></p> <span class="font-bold">{{ post.likes.length }}</span></div>
              </div>
              <div>
                <p @click="setLike(index)" :class="{ 'text-blue-500' : post.likes.includes(currentUser) }" 
                class="text-base font-bold hover:cursor-pointer">Нравится</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "SingleProfile",
  data() {
    return {
      currentFriend: this.$route.params.id,
    };
  },
};
</script>