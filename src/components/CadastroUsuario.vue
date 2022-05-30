<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Pagina Inicial</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Áreas Comuns</b-nav-item>
        <b-nav-item href="#" :disabled="1 < 0">Quadro de Avisos</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="'Olá ' + this.user" right>
          <b-dropdown-item href="#">Configurações do Perfil</b-dropdown-item>
          <b-dropdown-item href="#">Histórico de Reservas</b-dropdown-item>
          <b-dropdown-item href="#">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
// import Usuario from "../services/usuarioService";

export default {
  name: "CadastroUsuario",
  data() {
    return {
      user: "Lucas",
      usuario: {
        id: "",
        nome: "",
        sobrenome: "",
        sexo: "",
        dataNascimento: "",
        email: "",
        filmes: []
      },
      tableData: [],
      filmes: [],
      id_filme: "",
      id_usuario: "",
      dialogTableVisible: false
    };
  },
  methods: {
    atualizarUsuario(usuario) {
      this.usuario = usuario;
    },
    manterUsuario(usuario) {
      this.id_usuario = usuario.id
    }
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
