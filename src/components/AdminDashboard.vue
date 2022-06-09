<template>
  <div>
    <el-row class="custom-width">
      <el-card>
        <b
          >Olá Administrador, seja bem vindo ao seu dashboard exclusivo!</b
        ></el-card
      ></el-row
    >
    <el-card class="custom-width">
      <el-collapse v-model="activeName">
        <el-collapse-item title="Quadro de Avisos" name="1">
          <el-row>
            <el-card>
              <el-row>
                <TableElement
                  colunaA="Titulo"
                  colunaB="Descrição"
                  colunaC="Importante"
                  colunaD="Expira"
                  options="true"
                  tipo="aviso"
                />
              </el-row>
            </el-card>
            <el-row class="custom-button2">
              <el-button @click="dialogTableVisible = true">
                Criar novo aviso
              </el-button>
            </el-row>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="Listagem de Moradores" name="2">
          <el-row>
            <el-card>
              <el-row><TableElement tipo="rola" /> </el-row>
            </el-card>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="Listagem de Áreas/Reservas" name="3">
          <el-row>
            <el-col :span="12">
              <el-row class="custom-width2">
                <el-card>
                  <TableElement tipo="pinto" />
                </el-card>
              </el-row>
            </el-col>
            <el-col :span="12"
              ><el-row class="custom-width2">
                <el-card>
                  <TableElement tipo="xonga" />
                </el-card>
              </el-row>
              <el-row class="custom-button2">
                <el-tooltip content="Cancela todas as Reservas" placement="top">
                  <el-button type="danger" @click="excluirReservas">
                    Excluir Reservas</el-button
                  ></el-tooltip
                >
                <el-tooltip
                  content="Preenche todas as Áreas com reservas vazias"
                  placement="top"
                >
                  <el-button @click="criarReservasAuto">
                    Criar Reservas</el-button
                  >
                </el-tooltip>
              </el-row>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-dialog
      title="Criar Aviso"
      :visible.sync="dialogTableVisible"
      width="50%"
    >
      <FormAviso />
    </el-dialog>
  </div>
</template>

<script>
import TableElement from "@/components/TableElement";
import FormAviso from "@/components/FormAviso";

export default {
  data() {
    return {
      activeName: "1",
      dialogTableVisible: false,
    };
  },
  components: {
    TableElement,
    FormAviso,
  },
  methods: {
    tempMethod() {
      console.log("TODO Criar Aviso!");
      this.criarAviso = true;
    },
    criarReservasAuto() {
      console.log("TODO Criar!");
    },
    excluirReservas() {
      console.log("TODO Excluir!");
    },
  },
};
</script>

<style scoped>
.custom-width {
  margin: 20px;
}

.custom-width2 {
  margin: 4px;
}

.custom-button2 {
  margin-top: 2%;
  display: flex;
  justify-content: flex-end;
}

.custom-button {
  display: flex;
  justify-content: flex-end;
}
</style>
