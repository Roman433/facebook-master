<template>
  <div class="my-10">
    <div class="container mx-auto">
      <div class="w-1/2 bg-slate-100 mx-auto p-4 rounded-lg">
        <h1 class="text-xl font-semibold">Уведомления</h1>
        <div @click="setStatus(item)" class="bg-white w-full rounded-lg p-2 my-3 flex items-center justify-between" v-for="item of filterNotifications" :key="item.id">
          <div>
            <p class="font-semibold">{{ item.title }}</p>
            <p>{{ item.text }}</p>
          </div>
          <p v-if="item.status == true" class="text-green-500 font-semibold">Прочитано</p>
          <p v-if="item.status == false" class="text-red-500 font-semibold">Непрочитано</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios'
export default {
  name: "SetNotify",
  computed: {
    ...mapGetters(["sendNotifications", "filterNotifications"])
  },
  methods: {
    ...mapActions(["getNotifications"]),
    async setStatus(it) {
      it.status = 1
      await axios.put("https://6282500ded9edf7bd882691b.mockapi.io/notifications/" + it.id, it)
    }
  },
  created() {
    this.getNotifications()
  }
};
</script>