<template>
  <div class="border" style="border-radius: 1px; border-color: #000">
    <b-table
      :fields="fields"
      class="text-black bg-white"
      sticky-header
      striped
      hover
      :items="this.items"
    >
      <template v-slot:cell(reserv)="data">
        <div v-if="!data.item.idUser">
          <b-button @click="reservarHorario(data)" variant="success">
            Reservar
          </b-button>
        </div>
        <div v-if="data.item.idUser == idUserLogado">
          <b-button @click="cancelarReserva(data)" variant="danger">
            Cancelar
          </b-button>
        </div>
        <div
          v-if="data.item.idUser != idUserLogado && data.item.idUser != null"
        >
          <b-button disabled> Reservado </b-button>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import {
  cancelarReservasById,
  fazerReservasById,
  getReservasByIdArea,
} from "@/services/reservaService";

export default {
  name: "Table",
  props: {
    items: {
      type: Array,
      required: true,
    },
    idUserLogado: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: "userName", label: "Morador" },
        { key: "userApto", label: "Apartamento" },
        { key: "hrInicioReserva", label: "Horário Inicio" },
        { key: "hrFimReserva", label: "Horário Fim" },
        { key: "dtReserva", label: "Data" },
        { key: "reserv", label: "Reservar " },
      ],
    };
  },
  methods: {
    async reservarHorario(data) {
      let response = await fazerReservasById(data.item.idReserva);
      if (response) {
        let response = await getReservasByIdArea(data.item.idArea);
        this.items = response.data;
      }
    },
    async cancelarReserva(data) {
      let response = await cancelarReservasById(data.item.idReserva);
      if (response) {
        let response = await getReservasByIdArea(data.item.idArea);
        this.items = response.data;
      }
    },
    printarData(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
</style>
