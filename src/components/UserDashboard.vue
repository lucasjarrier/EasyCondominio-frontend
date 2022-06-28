<template>
  <div class="custom-width">
    <el-row>
      <el-card>
        <b class="primary-color">Listagem de reservas ativas</b>
        <el-table
          :data="tableData"
          style="width: 100%"
          sort-by="hrInicioReserva"
          class="margin-top"
        >
          <el-table-column label="Data da Reserva">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.dtReserva }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nameArea" label="Name"> </el-table-column>
          <el-table-column prop="hrInicioReserva" label="Horário Inicio">
          </el-table-column>
          <el-table-column prop="hrFimReserva" label="Horário Fim">
          </el-table-column>
          <el-table-column align="right" label="Operação">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Cancelar</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-row class="margin-top">
      <el-card>
        <el-row>
          <b class="primary-color">Seu histórico de Reservas</b>
        </el-row>
        <b> Em desenvolvimento ...</b>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {
  getAllReservasByIdUser,
  cancelarReservasById,
} from "@/services/reservaService";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async handleDelete(index, row) {
      let response = await cancelarReservasById(row.idReserva);
      if (response) {
        let response = await getAllReservasByIdUser();
        this.tableData = response.data;
      }
    },
  },
  async mounted() {
    let response = await getAllReservasByIdUser();
    if (response) {
      this.tableData = response.data;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.custom-width {
  margin: 20px;
}

.margin-top {
  margin-top: 2%;
}

.primary-color {
  color: $primary-color;
}
</style>
