<template>
  <div id="app">
    <template>
      <el-card class="custom-width">
        <el-row>
          <el-col>
            <h3>Listagem de Avisos</h3>
          </el-col>
          <el-col class="custom-radio">
            <el-radio-group
              v-model="filtroAvisos"
              size="mini"
              @change="orderTableByFilter"
            >
              <el-radio-button label="TODOS"> Todos</el-radio-button>
              <el-radio-button label="IMPORTANTE"> Importante</el-radio-button>
              <el-radio-button label="NUNCA_EXPIRA">
                Não Expira</el-radio-button
              >
            </el-radio-group>
          </el-col>
        </el-row>
        <el-table
          ref="filterTable"
          :data="tableDataFiltred"
          style="width: 100%"
        >
          <el-table-column
            prop="dtCreated"
            label="Data de Criação"
            sortable
            width="180"
            column-key="date"
          >
          </el-table-column>
          <el-table-column prop="title" label="Titulo" width="200">
          </el-table-column>
          <el-table-column prop="description" label="Descrição" width="350">
          </el-table-column>
        </el-table>
      </el-card>
    </template>
  </div>
</template>

<script>
import { getAllAvisos } from "@/services/avisoService";
export default {
  name: "QuadroAvisos",
  data() {
    return {
      tableData: [],
      tableDataFiltred: [],
      filtroAvisos: "TODOS",
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      console.log(column);
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    orderTableByFilter() {
      let array = [];
      if (this.filtroAvisos == "IMPORTANTE") {
        this.tableDataFiltred = this.tableData;
        var avisosImportantes = this.tableDataFiltred.filter(
          (produto) => produto.important == true
        );
        avisosImportantes.forEach((produto) => {
          array.push(produto);
        });
        this.tableDataFiltred = array;
      } else if (this.filtroAvisos == "NUNCA_EXPIRA") {
        this.tableDataFiltred = this.tableData;
        var avisosNuncaExpiram = this.tableDataFiltred.filter(
          (produto) => produto.dtExpire == null
        );
        avisosNuncaExpiram.forEach((produto) => {
          array.push(produto);
        });
        this.tableDataFiltred = array;
      } else {
        this.tableDataFiltred = this.tableData;
      }
    },
  },
  async mounted() {
    let response = await getAllAvisos();
    if (response) {
      this.tableData = response.data;
      this.tableDataFiltred = this.tableData;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

h3 {
  color: $primary-color;
}

.custom-width {
  margin: 20px;
}

.custom-radio {
  display: flex;
  justify-content: flex-end;
}
</style>
