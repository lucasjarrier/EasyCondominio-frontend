<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            (tipo == 'aviso'
              ? data.title.toLowerCase().includes(search.toLowerCase())
              : data.name.toLowerCase().includes(search.toLowerCase()))
        )
      "
      style="width: 100%"
    >
      <div div v-for="item in columnsTable" :key="item.codigo">
        <el-table-column :label="item.descricao" :prop="item.codigo">
        </el-table-column>
      </div>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <div v-if="scope"></div>
          <div v-if="comBusca">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Digite para pesquisar"
            />
          </div>
        </template>
        <template slot-scope="scope">
          <div v-if="options">
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
  </div>
</template>

<script>
import { getAllUsers } from "@/services/usuarioService";
import { getAllAreas } from "@/services/areaComumService";
import { getAllAvisos, deletarAvisoById } from "@/services/avisoService";
import { getReservasByIdArea } from "@/services/reservaService";

export default {
  name: "TableElement",
  props: {
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
      columnsTable: [],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(row.id);
      let response = deletarAvisoById(row.id);
      if (response) {
        this.atualizaDados();
      }
    },
    async atualizaDados() {
      let response = await getAllAvisos();
      if (response) {
        this.tableData = response.data;
      }
    },
  },
  async mounted() {
    let response = null;
    if (this.tipo === "aviso") {
      response = await getAllAvisos();
      this.columnsTable = [
        { codigo: "title", descricao: "Titulo" },
        { codigo: "description", descricao: "Descricão" },
        { codigo: "dtCreated", descricao: "Inicio" },
        { codigo: "dtExpire", descricao: "Fim" },
      ];
    } else if (this.tipo === "user") {
      response = await getAllUsers();
      this.columnsTable = [
        { codigo: "name", descricao: "Nome" },
        { codigo: "apartment", descricao: "Apartamento" },
        { codigo: "phoneNumber", descricao: "Telefone" },
        { codigo: "gender", descricao: "Gênero" },
      ];
    } else if (this.tipo === "area") {
      response = await getAllAreas();
      this.columnsTable = [
        { codigo: "name", descricao: "Nome" },
        { codigo: "description", descricao: "Descrição" },
        { codigo: "tempoPorReserva", descricao: "Tempo por Reserva" },
        { codigo: "operatingTime", descricao: "Horário" },
      ];
    } else if (this.tipo === "reserva") {
      response = await getReservasByIdArea(0);
      this.columnsTable = [
        { codigo: "userName", descricao: "Morador" },
        { codigo: "userApto", descricao: "Apartamento" },
        { codigo: "hrInicioReserva", descricao: "Inicio" },
        { codigo: "hrFimReserva", descricao: "Fim" },
      ];
      this.tipoBusca = "userName";
    }
    if (response) {
      this.tableData = response.data;
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
