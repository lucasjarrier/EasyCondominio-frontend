<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Olá {{this.usuario.name}} </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Áreas Comuns</b-nav-item>
        <b-nav-item href="#" :disabled="1 < 0">Quadro de Avisos</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Meu Perfil" right>
          <b-dropdown-item href="#">Configurações do Perfil</b-dropdown-item>
          <b-dropdown-item href="#">Histórico de Reservas</b-dropdown-item>
          <b-dropdown-item href="#">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <div>
    Olá
  </div>
  </div>
</template>

<script>

import { getUserByToken } from '@/services/usuarioService';

export default {
  name: "Home",
  data() {
    return {
      usuario: {},
    };
  },
  methods: {
  },
  async mounted() {
    const response = await getUserByToken(localStorage.getItem('token'));
    if (response) {
      this.usuario = response.data;
    }
  },
};
</script>

<style scoped>

</style>
