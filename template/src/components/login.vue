<template>
  <el-row style="margin-top: 10%">
    <el-col :span="8" :offset="8">
      <el-card style="width: 450px;margin:0 auto">
        <el-form label-position="right" :rules="rules" label-width="70px" :model="userInfo" ref="loginForm">
          <el-form-item prop="username" label="用户名">
            <el-input v-model.trim="userInfo.username" placeholder="用户名" auto-complete="off" @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model.trim="userInfo.password" auto-complete="off" placeholder="密码" @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>
          <el-form-item v-if="enableValidCode" prop="validCode" label="验证码">
            <el-col :span="16">
              <el-input v-model.trim="userInfo.validCode" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img @click="getValidCode" ref="validCodeImg" style="height:100%;" :src="validCodeUrl" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember" label="记住密码"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%;" type="primary" @click="onSubmit" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import md5 from 'md5'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'login',
  props: {
    // 是否启用验证码
    enableValidCode: {
      type: Boolean,
      default: false
    },
    // 获取验证码的url地址
    validCodeUrl: {
      type: String
    },
    // 服务端返回的验证码cookie名称
    validCodeCookie: {
      type: String,
      default: 'checkCodeMD5'
    }
  },
  data () {
    return {
      loading: false,
      remember: true,
      userInfo: {
        username: '', // 用户名
        password: '', // 登录密码
        validCode: '' // 验证码
      },
      rules: {
        username: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入用户名'))
            } else {
              callback()
            }
          }
        }],
        password: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              callback()
            }
          }
        }],
        validCode: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入验证码'))
            } else {
              callback()
            }
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters('global', [
      'cookie',
      'firEndMenu'
    ])
  },
  mounted () {
    this.loadAccount()
  },
  methods: {
    ...mapMutations('global', [
      'setCookie',
      'removeCookie'
    ]),
    ...mapActions('global', [
      'loginByUserName'
    ]),
    onSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.enableValidCode) {
            let validCode = this.userInfo.validCode
            if (this.cookie[this.validCodeCookie].toUpperCase() !== md5(validCode.toUpperCase()).toUpperCase()) {
              this.$message.error('验证码有有误，请重新输入！')
              return
            }
          }
          this.loading = true
          this.loginByUserName(this.userInfo).then(resp => {
            this.loading = false // 登录成功
            this.remember ? this.rememberAccount() : this.removeAccount()
            this.enterSystem()
          }).catch(err => {
            this.loading = false
            this.$message.error(err.result) // 登录失败
          })
        }
      })
    },
    /**
     * 获取验证码
     * @return {[type]} [description]
     */
    getValidCode () {
      this.$refs.validCodeImg.src = this.validCodeUrl + '?random=' + Math.random()
    },
    /**
     * [rememberAccount 记住密码]
     */
    rememberAccount () {
      this.setCookie({ name: 'rememberAccount', value: 1 })
      this.setCookie({ name: 'accountInfo', value: escape(JSON.stringify(this.userInfo)) })
    },
    /**
     * [clearAccount 清除账户]
     * @return {[type]} [description]
     */
    removeAccount () {
      this.removeCookie('accountInfo')
      this.removeCookie('rememberAccount')
    },
    /**
     * [loadAccount 加载用户信息]
     */
    loadAccount () {
      if (this.cookie['rememberAccount']) {
        let accountInfo = JSON.parse(unescape(this.cookie['accountInfo']))
        this.userInfo.username = accountInfo.username
        this.userInfo.password = accountInfo.password
        this.remember = true
      }
    },
    enterSystem () {
      if (this.$route.params.module) {
        this.$router.push({ path: '/' + this.$route.params.module })
      } else {
        this.$router.push({ name: this.firEndMenu.args })
      }
    }
  }
}

</script>
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
}

</style>
