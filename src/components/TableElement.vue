<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <div v-for="item in this.tableData" :key="item.id">
      <el-table-column v-if="colunaA" :label="colunaA" prop="title" sortable>
      </el-table-column>
    </div>

    <el-table-column v-if="colunaA" :label="colunaA" prop="title" sortable>
    </el-table-column>
    <el-table-column
      v-if="colunaB"
      :label="colunaB"
      prop="description"
      sortable
    >
    </el-table-column>
    <el-table-column v-if="colunaC" :label="colunaC" prop="dtCreated" sortable>
    </el-table-column>
    <el-table-column v-if="colunaD" :label="colunaD" prop="notExpire" sortable>
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <div v-if="scope"></div>
        <div v-if="comBusca">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </div>
      </template>
      <template slot-scope="scope">
        <div v-if="options">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getAllUsers } from "@/services/usuarioService";
import { getAllAreas } from "@/services/areaComumService";
import { getAllAvisos } from "@/services/avisoService";
import { getReservasByIdArea } from "@/services/reservaService";

export default {
  name: "TableElement",
  props: {
    colunaA: {
      type: String,
      required: false,
    },
    colunaB: {
      type: String,
      required: false,
    },
    colunaC: {
      type: String,
      required: false,
    },
    colunaD: {
      type: String,
      required: false,
    },
    comBusca: {
      type: Boolean,
      required: false,
    },
    options: {
      type: String,
      required: false,
    },
    // Recebe o tipo de dado que vai popular a tabela, Usuário, Área, Reserva ou Aviso.
    tipo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tableData: [],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  async mounted() {
    let response = null;
    if (this.tipo === "aviso") {
      response = await getAllAvisos();
    } else if (this.tipo === "morador") {
      response = await getAllUsers();
    } else if (this.tipo === "area-comum") {
      response = await getAllAreas();
    } else if (this.tipo === "reserva") {
      response = await getReservasByIdArea(0);
    }
    if (response) {
      this.tableData = response.data;
      console.log(this.tableData);
    }
  },
};
</script>

<style scoped>
.custom-width {
  margin: 50px;
}
</style>

<style></style>
