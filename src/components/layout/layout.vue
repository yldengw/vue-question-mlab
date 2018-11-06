<template lang="html">
  <div class="layout" id="app">
    <layout-header></layout-header>
    <layout-content></layout-content>
  </div>
</template>

<script>
import layoutHeader from './header'
import layoutContent from './content'

export default {
  components: {
    layoutHeader,
    layoutContent
  }
}
</script>

<style lang="scss" scoped>
.layout {
    position: relative;
    height: 100%;
    padding-top: 6rem;
}
</style>
