<template>
  <div class="custom-width">
      <el-row >
      <el-card>
        <b
          >Olá Morador, aqui estão suas reservas ativas no momento</b
        ></el-card
      ></el-row
    >
    <el-row>
        <el-card>
                    <el-table
          ref="filterTable"
          :data="tableDataFiltred"
          style="width: 100%"
        >
         <el-table-column prop="title" label="Área reservada">
          </el-table-column>
          <el-table-column prop="dtExpire" label="Data da Reserva">
          </el-table-column>
          <el-table-column prop="description" label="Horário de Inicio" >
          </el-table-column>
          <el-table-column prop="description" label="Horário de Término" >
          </el-table-column>
          <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Excluir</el-button
              >
          </template>
        </el-table>
        </el-card>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.custom-width {
  margin: 20px;
}

</style>