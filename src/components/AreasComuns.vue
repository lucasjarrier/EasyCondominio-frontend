<template>
  <div>
    <h2>Listagem de Áreas Comuns</h2>
    <el-card v-if="this.quantidadeAreas" class="custom-margin">
      <b-row v-if="listaAreas.length" :cols="this.quantidadeAreas">
        <div v-for="(item, index) in listaAreas" :key="item.id">
          <b-col>
            <b-card
              :title="item.name"
              :img-src="
                item.photo != null
                  ? item.photo
                  : 'https://rafaturis.com.br/wp-content/uploads/2014/01/default-placeholder.png'
              "
              img-alt="Image"
              img-top
              style="width: 17rem"
            >
              <b-card-text>
                {{ item.description }}
              </b-card-text>
              <b-button
                href="#"
                pill
                variant="outline-danger"
                @click="handleSelect(index, item.id)"
                >Exibir Detalhes</b-button
              >
            </b-card>
          </b-col>
        </div>
      </b-row>
    </el-card>
        <el-card v-else class="custom-margin">
          <h3> Nenhuma área foi cadastrada, contate o administrador! </h3>
       </el-card>
    <div v-if="this.activeArea != null && this.listaAreas.length > 0">
      <el-card class="margin-top custom-margin">
        <b-row class="custom-label">
          <h3>Detalhes da {{ this.listaAreas[this.activeArea].name }}</h3>
        </b-row>
        <b-row>
          <b-col>
            <b class="margin-bottom">Reservas Confirmadas</b>
            <Table
              :items="this.reservasConfirmadas"
              :idUserLogado="this.idUserLogado"
            />
          </b-col>
        </b-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAllAreas } from "@/services/areaComumService";
import Table from "@/components/Table";
import { getReservasByIdArea } from "@/services/reservaService";

export default {
  name: "AreasComuns",
  components: {
    Table,
  },
  data() {
    return {
      listaAreas: [],
      quantidadeAreas: 0,
      modalShow: false,
      activeArea: null,
      idArea: null,
      reservasConfirmadas: [],
      reservasPendentes: {},
      idUserLogado: null,
    };
  },
  methods: {
    async handleSelect(index, idArea) {
      this.activeArea = index;
      this.idArea = idArea;
      let response = await getReservasByIdArea(idArea);
      this.reservasConfirmadas = response.data;
    },
  },
  async mounted() {
    this.idUserLogado = localStorage.getItem("idUser");
    const response = await getAllAreas();
    if (response) {
      this.listaAreas = response.data;
      this.quantidadeAreas = this.listaAreas.length;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

h2,
h3 {
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  color: $primary-color;
}

h3 {
  font-size: 20px;
}

.margin-top {
  margin-top: 3%;
}

.custom-label {
  justify-content: center;
  align-items: center;
  display: flex;
}

.custom-margin {
  margin: 20px;
}
</style>
