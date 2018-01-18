<template>
  <div class="nav-menu">
    <ul class="menu-ul">
      <li class="fir-menu" v-for="firMenu in firLevelMenu" :style="style" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave" @click="handleMenuClick(firMenu,firMenu)" :class="{'active-fir-menu':activeFirMenu&&activeFirMenu.args===firMenu.args}">
        <span class="fir-menu-name">{{firMenu.mname}}</span> <img v-if="firMenu.childMenu.length>0" class="arrow" src="static/nav_arrow_b_x.png" />
        <div class="menu-panel" v-if="firMenu.childMenu.length>0">
          <div class="sub-panel" v-for="secMenu in firMenu.childMenu">
            <div class="sec-menu" @click="handleMenuClick(secMenu,firMenu,secMenu)">
              <div class="sec-menu-title" :class="{'active-sub-menu':activeSubMenu&&activeSubMenu.args===secMenu.args}" :data-end="secMenu.childMenu.length>0?0:1">
                <span>{{secMenu.mname}}</span>
              </div>
              <div class="trd-panel" v-if="secMenu.childMenu.length>0">
                <div class="trd-menu" v-for="trdMenu in secMenu.childMenu">
                  <span class="trd-menu-title" :class="{'active-sub-menu':activeSubMenu&&activeSubMenu.args===trdMenu.args}" @click="handleMenuClick(trdMenu,firMenu,trdMenu)">{{trdMenu.mname}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  name: 'nav-menu',
  props: {
    menuData: {
      type: Array,
      default: () => []
    },
    firEndMenu: {
      type: Object
    }
  },
  data() {
    return {
      style: {
        width: '110px'
      },
      activeFirMenu: null, // 当前激活的一级菜单
      activeSubMenu: null // 当前激活的子级菜单
    }
  },
  computed: {
    firLevelMenu() {
      return this.menuData.filter(item => item.level === 1)
    }
  },
  created() {
    this.setActiveMenu()
  },
  mounted() {
    this.style.width = (this.$el.offsetWidth - 30) / this.firLevelMenu.length + 'px'
    $(this.$el).find('.menu-panel').hide()
  },
  methods: {
    handleMouseenter(e) {
      let firLevelMenuLi = $(e.currentTarget)
      firLevelMenuLi.find('.arrow').attr('src', 'static/nav_arrow_b_s.png')
      $(this.$el).find('.menu-panel').stop(true, false).animate({
        opacity: 0
      }, function() {
        $(this).hide()
      })
      if (firLevelMenuLi.find('.menu-panel').length > 0) {
        firLevelMenuLi.find('.menu-panel').stop(true, false).show().animate({
          opacity: 1
        })
      }
    },
    handleMouseleave(e) {
      let firLevelMenuLi = $(e.currentTarget)
      firLevelMenuLi.find('.arrow').attr('src', 'static/nav_arrow_b_x.png')
      $(this.$el).find('.menu-panel').stop(true, false).animate({
        opacity: 0
      }, function() {
        $(this).hide()
      });
    },
    handleMenuClick(menu, activeFirMenu, activeSubMenu) {
      if (menu.childMenu.length === 0 || !menu.childMenu) {
        this.$router.push({ name: menu.args })
        this.activeFirMenu = activeFirMenu
        this.activeSubMenu = activeSubMenu
        $(this.$el).find('.menu-panel').hide()
      }
    },
    setActiveMenu() {
      if (this.$route) {
        let menu = this.$route.meta.menu
        this.activeFirMenu = this.findFirLevelMenu(menu)
        if (menu.level !== 1) {
          this.activeSubMenu = menu
        }
      } else {
        this.$router.push({ name: this.firEndMenu.args })
        this.activeFirMenu = this.findFirLevelMenu(this.firEndMenu)
        if (this.firEndMenu.level !== 1) {
          this.activeSubMenu = this.firEndMenu
        }
      }
    },
    findFirLevelMenu(menu) {
      if (menu.level === 1) {
        return menu
      }
      let parentMenu = this.menuData.find(item => item.menuid === menu.parentid)
      return this.findFirLevelMenu(parentMenu)
    }
  }
}

</script>
<style scoped lang="less">
.nav-menu {
  font-family: 'Microsoft YaHei';
  width: 100%;
  height: 100%;
  .menu-ul {
    margin: 0;
    list-style: none;
    .arrow {
      vertical-align: middle;
    }
    .active-fir-menu {
      width: 112.875px;
      border-bottom: 6px solid #259cf0;
      box-sizing: border-box;
    }
    .fir-menu {
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      float: left;
      height: 80px;
      width: 110px;
      line-height: 80px;
      text-align: center;
      letter-spacing: 0;
      box-sizing: border-box;
      transition: all 150ms linear 0s;
    }
    .fir-menu:after {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border: 1px solid rgba(255, 255, 255, 0);
      bottom: 6px;
      content: " ";
      display: block;
      margin: 0 auto;
      position: relative;
      -webkit-transition: all 280ms ease-in-out;
      transition: all 280ms ease-in-out;
      width: 0;
    }
    .fir-menu:hover {
      letter-spacing: 3px;
    }
    .fir-menu:hover:after {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-color: #D1DDEB;
      border-width: 3px;
      -webkit-transition: width 350ms ease-in-out;
      transition: width 350ms ease-in-out;
      width: 95%;
    }
    .menu-panel {
      text-align: left;
      display: flex;
      flex-wrap: wrap;
      position: fixed;
      left: 0;
      right: 0;
      letter-spacing: normal;
      background-color: #F4F8FB;
      padding: 20px 30px 20px 30px;
      .sub-panel {
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 0 20px 20px 0;
        box-sizing: border-box;
        .sec-menu {
          color: #7793AE;
          line-height: 50px;
          .sec-menu-title {
            border-bottom: solid 1px #E5EBF2;
            box-sizing: border-box;
            height: 53px;
          }
          .sec-menu-title.active-sub-menu {
            color: #259cf0;
            border-bottom: solid 6px #259cf0;
          }
          .sec-menu-title[data-end='1']:after {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border: 1px solid rgba(255, 255, 255, 0);
            content: " ";
            bottom: 3px;
            display: block;
            margin: 0 auto;
            position: relative;
            -webkit-transition: all 280ms ease-in-out;
            transition: all 280ms ease-in-out;
            width: 0;
          }
          .sec-menu-title[data-end='1']:hover {
            border-bottom: none;
          }
          .sec-menu-title[data-end='1']:hover:after {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-color: #D1DDEB;
            border-width: 3px;
            -webkit-transition: width 350ms ease-in-out;
            transition: width 350ms ease-in-out;
            width: 100%;
          }
          .trd-panel {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .trd-menu {
              font-size: 15px;
              color: #424F57;
              margin-right: 20px;
              height: 40px;
              width: 105px;
              line-height: 40px;
              box-sizing: border-box;
              display: inline;
              .trd-menu-title {
                height: 40px;
                position: absolute;
                box-sizing: border-box;
              }
              .trd-menu-title.active-sub-menu {
                color: #259cf0;
                border-bottom: solid 6px #259cf0;
              }

              .trd-menu-title:after {
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                border: 1px solid rgba(255, 255, 255, 0);
                bottom: 6px;
                content: " ";
                display: block;
                margin: 0 auto;
                position: relative;
                -webkit-transition: all 280ms ease-in-out;
                transition: all 280ms ease-in-out;
                width: 0;
              }
              .trd-menu-title:hover:after {
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                border-color: #D1DDEB;
                border-width: 3px;
                -webkit-transition: width 350ms ease-in-out;
                transition: width 350ms ease-in-out;
                width: 100%;
              }
            }
          }
        }
      }
    }
    .xqjc-menu {
      margin-top: 10px;
      height: 164px;
      width: 224px;
      box-sizing: border-box;
    }
    .xqjc-menu.active-img-menu {
      border: 2px solid #259cf0;
    }
    .xqjc-menu:hover {
      border: 2px solid #259cf0;
    }
  }
}

</style>
