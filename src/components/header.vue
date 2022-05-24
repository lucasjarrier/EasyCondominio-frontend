<template lang="pug">
  div
    el-menu.custom-menu(
      :default-active="activeIndex"
      mode="horizontal" 
      class="el-menu-demo" 
      text-color="aliceblue"
      background-color="blueviolet"
      active-text-color="#000"
      router
      @select="handleSelect")
      el-menu-item(index="CadastroUsuario").custom-item Usuário
      el-menu-item(index="CadastroDiretor").custom-item  Diretor
      el-menu-item(index="CadastroFilme").custom-item  Filme
</template>

<script>
export default {
  name: 'header',
  data() {
      return {
        activeIndex: '/',
      };
    },
    methods: {
      handleSelect(key) {
        this.$router.push(key)
    }
  }
}
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.15.1/lib/theme-chalk/index.css");

  .custom-item{
    font-size: 15px;
  }

  .custom-menu{
    border-color: black;
    border-width: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: monospace;
  }

</style>
