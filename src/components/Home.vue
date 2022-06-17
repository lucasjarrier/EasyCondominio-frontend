<template>
  <body>
    <div v-if="this.usuario">
      <b-navbar toggleable="lg" class="border" style="border-color: #000">
        <b-navbar-brand v-if="this.isAdmin" href="#" @click="activeTabIndex()"
          ><b>Olá {{ this.usuario.name }} </b>
        </b-navbar-brand>
        <!-- <b-navbar-brand v-else href="#" @click="activeTabIndex()"
          ><b>Bem vindo, Administrador! </b>
        </b-navbar-brand> -->
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" @click="activeTabIndex(1)"
              >Áreas Comuns</b-nav-item
            >
            <b-nav-item href="#" :disabled="1 < 0" @click="activeTabIndex(2)"
              >Quadro de Avisos</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Meu Perfil" right>
              <b-dropdown-item href="#"
                >Configurações do Perfil</b-dropdown-item
              >
              <b-dropdown-item href="#">Histórico de Reservas</b-dropdown-item>
              <b-dropdown-item href="#" @click="logout">Sair</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div v-if="this.activeIndex == 'AREA_COMUM'">
        <AreasComuns />
      </div>
      <div v-if="this.activeIndex == 'XABLAU'">
        <QuadroAvisos />
      </div>
      <div v-if="this.activeIndex == 'DEFAULT'">
        <div v-if="!this.isAdmin"><Table /></div>
        <div v-else>
          <Admin />
        </div>
      </div>
    </div>
    <div v-else>Você não está logado, efetue o login!</div>
  </body>
</template>

<script>
import { getUserByToken } from "@/services/usuarioService";
import { logout } from "@/services/authService";
import AreasComuns from "@/components/AreasComuns";
import Table from "@/components/Table";
import Admin from "@/components/AdminDashboard";
import QuadroAvisos from "@/components/QuadroAvisos";

export default {
  name: "Home",
  data() {
    return {
      usuario: {},
      activeIndex: "DEFAULT",
      isAdmin: true,
    };
  },
  components: {
    AreasComuns,
    Table,
    Admin,
    QuadroAvisos,
  },
  methods: {
    async logout() {
      let response = await logout();
      {
        if (response) {
          this.usuario = null;
          localStorage.removeItem("token");
          localStorage.removeItem("idUser");
          this.$router.push("/");
        }
      }
    },
    activeTabIndex(index) {
      if (index == 1) {
        this.activeIndex = "AREA_COMUM";
      } else if (index == 2) {
        this.activeIndex = "XABLAU";
      } else {
        this.activeIndex = "DEFAULT";
      }
    },
  },
  async mounted() {
    const response = await getUserByToken(localStorage.getItem("token"));
    if (response) {
      this.usuario = response.data;
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

b:hover {
  color: #b63781;
}
</style>
