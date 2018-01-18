<template>
  <div id="app" :style="appStyle">
    <div v-if="$route.name==='login'" v-show="!isLoading">
      <router-view name="login" />
    </div>
    <template v-else>
      <!-- 导航栏 -->
      <div :style="topNavigationStyle">
        <navigation :default-active="$route.name"></navigation>
      </div>
      <!-- 页面中间主体 -->
      <div :style="centerMainStyle">
        <transition enter-active-class="animated fadeInLeftBig" leave-active-class="animated fadeOutLeftBig" mode="out-in" :duration="{leave:300}">
          <router-view :key="$route.path"></router-view>
        </transition>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import navigation from '@/components/navigation'

export default {
  components: {
    navigation
  },
  computed: {
    ...mapGetters('global', [
      'isLoading'
    ]),
    ...mapGetters('layout', [
      'appStyle',
      'centerMainStyle',
      'topNavigationStyle'
    ])
  }
}

</script>
<style>
#app {
  font-family: Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
