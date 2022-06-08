<template>
  <div class="background">
    <h2>Listagem de Áreas Comuns</h2>
    <b-container class="bv-example-row mb-3">
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
              style="width: 17rem; border-color: rgb(94, 94, 94)"
              class="mb-2"
            >
              <b-card-text>
                {{ item.description }}
              </b-card-text>
              <b-button
                href="#"
                variant="primary"
                @click="handleSelect(index, item.id)"
                >Exibir Detalhes</b-button
              >
            </b-card>
          </b-col>
        </div>
      </b-row>
      <div v-if="this.activeArea != null && this.listaAreas.length > 0">
        <b-row class="custom-border">
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
        <!-- <b-row style="margin-top: 20px">
          <b-col>
            <b>Reservas Pendentes</b>
            <Table :items="this.reservasPendentes" />
          </b-col>
        </b-row> -->
      </div>
    </b-container>
  </div>
</template>

<script>
import { getAllAreas } from "@/services/areacomunService";
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
      quantidadeAreas: 3,
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

h2 {
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  color: $primary-color;
}

.custom-border {
  margin: 15px 0;
  border-top: 1px solid #000;
}
</style>
