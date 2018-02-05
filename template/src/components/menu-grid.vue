<template>
  <div class="menu-grid" style="background-image: url(static/bj.png);">
    <div class="menu-item" v-for="menu in menuData" :key="menu.args" @click="handleMenuClick(menu)">{{menu.mname}}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'menu-grid',
  props: {
    menuData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters('global', [
      'rawMenu'
    ])
  },
  methods: {
    handleMenuClick (menu) {
      this.$router.push({ name: menu.args })
    }
  }
}

</script>
<style scoped lang="less">
.menu-grid {
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 100px;
  background-size: 100%;
  background-position: center;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .menu-item {
    text-align: center;
    width: 33%;
    height: 100px;
  }
}

</style>
