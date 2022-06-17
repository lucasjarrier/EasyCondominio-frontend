<template>
  <div>
    <!-- TABELA DAS RESERVAS  -->
    <div v-if="tableDatas">
      <el-table
        :data="
          tableDatas.filter(
            (data) =>
              !search ||
              (tipo == 'aviso'
                ? data.title.toLowerCase().includes(search.toLowerCase())
                : data.name.toLowerCase().includes(search.toLowerCase()))
          )
        "
        style="width: 100%"
        height="320"
      >
        <div v-for="item in columnsTable" :key="item.codigo">
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
                @click="extraButton(scope.$index, scope.row)"
                v-if="extraButton"
              >
                {{ extraButtonName }}</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Cancelar</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- DEMAIS TABELAS -->
    <div v-else>
      <el-table
        :data="
          tableDataPrincipal.filter(
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
                @click="extraButton(scope.$index, scope.row)"
                v-if="extraButton"
              >
                {{ extraButtonName }}</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Excluir</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllUsers, deletarUserById } from "@/services/usuarioService";
import { getAllAreas, deletarAreaById } from "@/services/areaComumService";
import { getAllAvisos, deletarAvisoById } from "@/services/avisoService";
import {
  getReservasByIdArea,
  cancelarReservasById,
} from "@/services/reservaService";

export default {
  name: "TableElement",
  props: {
    tableDatas: {
      type: Array,
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
    extraButton: {
      type: Function,
      required: false,
    },
    extraButtonName: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      tableDataPrincipal: [],
      columnsTable: [],
      search: "",
      idArea: 0,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    async handleDelete(index, row) {
      let response = null;
      if (this.tipo === "aviso") {
        response = await deletarAvisoById(row.id);
      } else if (this.tipo === "user") {
        response = await deletarUserById(row.id);
      } else if (this.tipo === "area") {
        response = await deletarAreaById(row.id);
      } else if (this.tipo === "reserva") {
        response = await cancelarReservasById(row.idReserva);
        if (response) {
          this.idArea = row.idArea;
        }
      }
      /**
       * Se a requisição funcionou, então chamamos novamente o atualizar dados.
       */
      if (response) {
        this.atualizaDados();
      }
    },
    async atualizaDados() {
      let response = null;
      if (this.tipo === "aviso") {
        response = await getAllAvisos();
      } else if (this.tipo === "user") {
        response = await getAllUsers();
      } else if (this.tipo === "area") {
        response = await getAllAreas();
      } else if (this.tipo === "reserva") {
        response = await getReservasByIdArea(this.idArea);
      }

      if (this.tableDatas && response) {
        this.tableDatas = response.data;
      } else if (response) {
        this.tableDataPrincipal = response.data;
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
        { codigo: "operatingTime", descricao: "Horário" },
      ];
    } else if (this.tipo === "reserva") {
      this.columnsTable = [
        { codigo: "userName", descricao: "Morador" },
        { codigo: "userApto", descricao: "Apartamento" },
        { codigo: "hrInicioReserva", descricao: "Inicio" },
        { codigo: "hrFimReserva", descricao: "Fim" },
      ];
    }
    if (response) {
      this.tableDataPrincipal = response.data;
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
