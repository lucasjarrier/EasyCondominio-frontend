<template>
  <body>
    <div class="custom-body" v-if="this.usuario">
      <b-navbar toggleable="lg" class="border" style="border-color: #000">
        <b-navbar-brand href="#" @click="activeTabIndex()"
          ><b>Olá {{ this.usuario.name }} </b>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" @click="activeTabIndex(1)"
              >Áreas Comuns</b-nav-item
            >
            <b-nav-item href="#" @click="activeTabIndex(2)"
              >Quadro de Avisos</b-nav-item
            >
            <b-nav-item href="#" @click="activeTabIndex(3)"
              >Reclamações</b-nav-item
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
      <div v-if="this.activeIndex == 'QUADRO_AVISOS'">
        <QuadroAvisos />
      </div>
      <div v-if="this.activeIndex == 'RECLAMACOES'"> 
        TODO: QUADRO DE RECLAMAÇõES
      </div>
      <div v-if="this.activeIndex == 'DEFAULT'">
        <div v-if="!this.isAdmin">
          <User />
        </div>
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
import { getAllReservasByIdUser } from "@/services/reservaService";
import { logout } from "@/services/authService";
import AreasComuns from "@/components/AreasComuns";
import Admin from "@/components/AdminDashboard";
import User from "@/components/UserDashboard";
import QuadroAvisos from "@/components/QuadroAvisos";

export default {
  name: "Home",
  data() {
    return {
      usuario: {},
      activeIndex: "DEFAULT",
      isAdmin: false,
      tableData: [],
    };
  },
  components: {
    AreasComuns,
    Admin,
    QuadroAvisos,
    User,
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
        this.activeIndex = "QUADRO_AVISOS";
      } else if (index == 3) {
        this.activeIndex = "RECLAMACOES";
      } else {
        this.activeIndex = "DEFAULT";
      }
    },
  },
  async mounted() {
    const response = await getUserByToken(localStorage.getItem("token"));
    if (response) {
      this.usuario = response.data;
      this.isAdmin = response.data.admin;
      console.log(response.data);
      if(!this.isAdmin) {
        const tbd = await getAllReservasByIdUser(response.data.id);
        if(tbd) {
          this.tableData = tbd.data;
          console.log(this.tableData);
        }
      }
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

.custom-body {
  height: 150vh;
}

</style>
