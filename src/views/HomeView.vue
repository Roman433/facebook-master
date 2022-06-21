<template>
  <div class="home bg-white py-10">
    <div class="container mx-auto">
      <div class="w-full pr-2 pl-16 lg:w-1/2 mx-auto">
        <postsComp v-bind:setPosts="'friendsPost'" />
      </div>
    </div>
    <div class="hidden lg:block fixed right-5 top-20">
      <notFriends />
    </div>
  </div>
</template>

<script>
import postsComp from "../components/PostsComp.vue";
import notFriends from "../components/NotFriends.vue";

export default {
  name: "HomeView",
  components: {
    postsComp,
    notFriends,
  },
};
</script>
