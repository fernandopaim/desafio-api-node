<template>
  <div id="app">
    <Body msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Body from './components/Body'

export default {
    name: 'App',
    components: {
        Body
    }
}
</script>

<style lang="sass">
    body
        font-family: Open Sans, Roboto
        font-size: 14px
        margin: 10px 20px
        color: #383737
        background: #fcfcfc
</style>
