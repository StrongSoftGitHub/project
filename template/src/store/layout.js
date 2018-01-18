export default {
  namespaced: true,
  state: {
    /* --------------------------根级容器Begin-------------------------- */
    app: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      overflow: 'hidden'
    },
    /* --------------------------根级容器End-------------------------- */

    /* -------------------------顶部导航栏Begin------------------------- */
    topNavigation: { // 顶部导航栏
      top: 0,
      left: 0,
      right: 0,
      zIndex: 199201092417,
      height: '80px',
      position: 'absolute'
    },
    /* -------------------------顶部导航栏Begin------------------------- */

    /* ------------------------中间内容主体Begin------------------------ */
    centerMain: { // 中间主体内容部分
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'visible',
      position: 'absolute'
    }
    /* -------------------------中间内容主体End------------------------- */

  },
  getters: {
    /**
     * [appStyle 返回根级容器最终的样式]
     */
    appStyle (state) {
      return [state.app]
    },
    /**
     * [topNavigationStyle 返回顶部导航栏最终的样式]
     */
    topNavigationStyle (state) {
      return [state.topNavigation]
    },
    /**
     * [centerMainStyle 返回中间主体内容最终的样式]
     */
    centerMainStyle (state) {
      return [state.centerMain, {top: state.topNavigation.height}]
    }
  }
}
