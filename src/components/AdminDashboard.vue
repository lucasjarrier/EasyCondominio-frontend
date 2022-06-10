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
                <TableElement options="true" tipo="aviso" :comBusca="true" />
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
              <el-row
                ><TableElement options="true" tipo="user" :comBusca="true" />
              </el-row>
            </el-card>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="Listagem de Áreas/Reservas" name="3">
          <el-row>
            <el-col :span="12">
              <el-row class="custom-width2">
                <el-card>
                  <TableElement
                    options="true"
                    tipo="area"
                    :extraButton="this.customButtonArea"
                    extraButtonName="Reservas"
                  />
                </el-card>
              </el-row>
            </el-col>
            <el-col :span="12"
              ><el-row class="custom-width2">
                <el-card>
                  <TableElement
                    options="true"
                    tipo="reserva"
                    :tableDatas="this.itens"
                  />
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
    <el-dialog :visible.sync="dialogTableVisible" width="50%">
      <FormAviso />
    </el-dialog>
  </div>
</template>

<script>
import TableElement from "@/components/TableElement";
import FormAviso from "@/components/FormAviso";
import {
  criarReservasDiarias,
  excluirReservasDiarias,
  getReservasByIdArea,
} from "@/services/reservaService";

export default {
  data() {
    return {
      activeName: "1",
      dialogTableVisible: false,
      itens: [],
    };
  },
  components: {
    TableElement,
    FormAviso,
  },
  methods: {
    async criarReservasAuto() {
      let response = await criarReservasDiarias();
      if (response) {
        console.log("Reservas Criadas!");
      }
    },
    async excluirReservas() {
      let response = await excluirReservasDiarias();
      if (response) {
        console.log("Reservas Excluidas!");
      }
    },
    async customButtonArea(index, row) {
      let response = await getReservasByIdArea(row.id);
      if (response) {
        this.itens = response.data;
      }
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
