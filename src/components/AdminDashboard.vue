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
              <el-button
                class="custom-button2"
                @click="dialogTableVisible2 = true"
              >
                Criar Área Comum
              </el-button>
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
    <el-dialog
      :visible.sync="dialogTableVisible2"
      width="50%"
      title="Criar Área Comum"
    >
      <el-form
        :rules="rules"
        ref="formArea"
        :model="formArea"
        label-width="150px"
        size="mini"
        label-position="top"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="Nome" prop="name">
              <el-input v-model="formArea.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" class="custom-margin-left">
            <el-form-item label="Foto">
              <b-form-file
                v-model="formArea.photoArea"
                :state="Boolean(formArea.photoArea)"
                placeholder="Escolha uma foto ou Arraste..."
                drop-placeholder="Solte aqui..."
              ></b-form-file>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Descrição" prop="description">
          <el-input type="textarea" v-model="formArea.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8"
            ><el-form-item label="Tempo por Reserva" prop="tempoPorReserva">
              <el-input-number
                size="mini"
                v-model="formArea.tempoPorReserva"
                :min="1"
                :max="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="Horário de Funcionamento">
              <el-radio-group
                v-model="formArea.operatingTime"
                size="mini"
                prop="operatingTime"
              >
                <div class="custom-radio">
                  <el-radio-button label="MATUTINO"> Manhã</el-radio-button>
                  <el-radio-button label="VESPERTINO"> Tarde</el-radio-button>
                  <el-radio-button label="DIURNO"> Integral</el-radio-button>
                </div>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item size="large" class="custom-button">
          <el-button
            type="primary"
            @click="submitForm('formArea')"
            :disabled="!formArea.description || !formArea.name"
            >Criar Área</el-button
          >
          <el-button>Cancelar</el-button>
        </el-form-item>
      </el-form>
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
import { criarAreaComum } from "@/services/areaComumService";

export default {
  data() {
    return {
      activeName: "1",
      dialogTableVisible: false,
      dialogTableVisible2: false,
      itens: [],
      formArea: {
        name: "",
        description: "",
        photoArea: [],
        operatingTime: "DIURNO",
        tempoPorReserva: 1,
      },
      formPhoto: {
        file: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: "É necessario informar nome!",
            trigger: "blur",
          },
          {
            min: 4,
            max: 25,
            message: "Insira entre 4 e 25 caracteres!",
            trigger: "blur",
          },
        ],

        description: [
          {
            required: true,
            message: "É necessario adicionar uma descrição!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    TableElement,
    FormAviso,
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.criarAreaComum(this.formArea);
        }
      });
    },
    async criarAreaComum(form) {
      let response = await criarAreaComum(form);
      if (response) {
        window.location.reload(true);
      }
    },
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
  flex-wrap: wrap;
}

.custom-radio {
  display: flex;
  justify-content: space-between;
}

.custom-margin-left {
  padding-left: 2%;
}
</style>
