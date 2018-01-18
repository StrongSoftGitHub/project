<template>
  <transition appear enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
    <div class="navigation">
      <div class="logo" style="background-image:url(static/top_log_new.png)"></div>
      <div class="menu">
        <nav-menu :menu-data="rawMenu" :first-end-menu="firEndMenu"></nav-menu>
      </div>
      <div class="login">
        <span style="color:#fff">{{ userInfo&&userInfo.realname||'' }}&nbsp;&nbsp;</span>
        <img src="static/login_out.png" @click="loginOutSystem">
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import NavMenu from './nav-menu'

export default {
  name: 'navigation',
  components: {
    NavMenu
  },
  computed: {
    ...mapGetters('global', [
      'userInfo',
      'firEndMenu',
      'rawMenu'
    ])
  },
  methods: {
    ...mapActions('global', [
      'loginOut'
    ]),
    loginOutSystem () {
      this.loginOut().then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}

</script>
<style scoped lang="less">
.navigation {
  display: flex;
  height: 80px;
  border-bottom: 1px solid #ccc;
  background-color: rgba(12, 19, 42, .8);
  .logo {
    width: 500px;
    height: 100%;
    background-repeat: no-repeat;
  }
  .menu {
    width: 100%;
    z-index: 100;
  }
  .login {
    cursor: pointer;
    width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
  .login:before {
    content: '';
    position: relative;
    right: 25px;
    background: #a7bde0;
    width: 1px;
    height: 20px;
  }
}

</style>
