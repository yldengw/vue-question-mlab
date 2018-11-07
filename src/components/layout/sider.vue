<template lang="html">
<div>
   <div class="title-wrap">
      <span class="logo"></span>
      <h1 class="title">{{ msg }}</h1>
    </div>
 <Menu active-name="1-2"
          theme="dark"
          width="auto"
          :class="menuitemClasses" v-for="item in routeItems" :key="item.id">
          <router-link :to="item.link">
              <MenuItem name="1-1">
                  <Icon type="ios-navigate"></Icon>
                  <span>{{item.text}}</span>
              </MenuItem>
          </router-link>
    </Menu>
</div>

</template>

<script>
export default {
  name: 'layout-sider',
  data () {
    return {
      msg: '微型问卷调查平台',
      isLoading: false,
      routeItems: [
        {
          link: {
            path: '/platform/questionare',
            activeClass: 'is-crt'
          },
          icon: '&#xe61c;',
          text: '我的问卷'
        },
        {
          link: {
            path: '/platform/new/',
            activeClass: 'is-crt'
          },
          icon: '&#xe60f;',
          text: '新建问卷'
        }
      ]
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    signout () {
      this.isLoading = true
      window.fetch('/signout', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'same-origin'
      }).then(res => {
        return res.json()
      }).then(result => {
        if (result.code === 0) {
          this.$route.router.go({ path: '/login' })
        }
      })
    }
  }
}
</script>
