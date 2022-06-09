<template>
  <el-form
    :model="formAviso"
    :rules="rules"
    ref="formAviso"
    label-width="120px"
  >
    <el-form-item label="Titulo" prop="name" class="align-item">
      <el-input v-model="formAviso.title"></el-input>
    </el-form-item>
    <el-form-item label="Descrição" prop="desc">
      <el-input type="textarea" v-model="formAviso.description"></el-input>
    </el-form-item>
    <el-form-item label="Configuração">
      <el-checkbox
        v-model="formAviso.important"
        label="Importante"
        name="type"
      ></el-checkbox>
      <el-checkbox
        v-model="formAviso.notExpire"
        label="Nunca expira"
        name="type"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label="Encerramento" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="Escolha uma data"
            v-model="formAviso.dtExpire"
            style="width: 100%"
            :disabled="formAviso.notExpire"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item class="custom-button">
      <el-button
        type="primary"
        @click="submitForm('formAviso')"
        class="custom-button"
        :disabled="!formAviso.notExpire && !formAviso.dtExpire"
        >Criar Evento</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { cadastrarAviso } from "@/services/avisoService";

export default {
  name: "formAviso",
  data() {
    return {
      formAviso: {
        title: "",
        dtExpire: "",
        important: false,
        notExpire: false,
        description: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "É necessario informar um titulo!",
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: "Insira entre 5 e 20 caracteres!",
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.cadastrarAviso(this.formAviso);
        }
      });
    },
    async cadastrarAviso(form) {
      let response = await cadastrarAviso(form);
      if (response) {
        window.location.reload(true);
      }
    },
  },
};
</script>

<style scoped>
.custom-button {
  display: flex;
  justify-content: flex-end;
}

.custom-width {
  margin: 50px;
}
</style>
