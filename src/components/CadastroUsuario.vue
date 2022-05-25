<template lang="pug">
div.father
  .container
    .container-cadastro
      h1 Cadastro de Usuário
      el-row
        el-col
          el-form.custom-form
            el-row
              h3 Nome do usuário
              el-input.custom-input(placeholder="Digite o nome", v-model="usuario.nome", clearable)
            el-row
              h3 Sobrenome do usuário
              el-input.custom-input(
                placeholder="Digite o sobrenome",
                v-model="usuario.sobrenome",
                clearable
              )
            el-row
              h3 Email do usuário
              el-input.custom-input(placeholder="Digite o email", v-model="usuario.email", clearable)
            el-row
              h3 Sexo
              el-select(v-model="usuario.sexo", placeholder="Selecione o sexo", clearable)
                el-option(value="MASCULINO", label="Masculino")
                el-option(value="FEMININO", label="Feminino")
                el-option(value="NAO_INFORMADO", label="Não especificado")
            el-row
              h3 Data de nascimento
              el-date-picker(
                v-model="usuario.dataNascimento",
                type="date",
                placeholder="Selecione a data",
                clearable
              )
            el-row.spacing
              //- el-button.custom-button(type="primary", @click="salvarUsuario")
              el-button.custom-button(type="primary")
                span Salvar Usuário
                  i.el-icon-check
</template>

<script>
// import Usuario from "../services/usuarioService";

export default {
  name: "CadastroUsuario",
  data() {
    return {
      usuario: {
        id: "",
        nome: "",
        sobrenome: "",
        sexo: "",
        dataNascimento: "",
        email: "",
        filmes: []
      },
      tableData: [],
      filmes: [],
      id_filme: "",
      id_usuario: "",
      dialogTableVisible: false
    };
  },
  methods: {
    atualizarUsuario(usuario) {
      this.usuario = usuario;
    },
    manterUsuario(usuario) {
      this.id_usuario = usuario.id
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.2/lib/theme-chalk/index.css");

h1 {
  padding-top: 20px;
  font-family: monospace;
  color: #b63781;
}

h2 {
  font-family: monospace;
  padding-top: 15px;
  color: #b63781;
}

h3 {
  font-family: monospace;
  font-size: 15px;
  color: #b63781;
}

i {
  margin-left: 10px;
}

.custom-span{
  color: brown;
  font-size: small;
}

.offset {
  padding-top: 40px;
}

.father {
  background-color: black;
  min-height: 800px;
}

.custom-button {
  border-color: black;
  background-color: #b63781;
  color: black;
  font-family: monospace;
  font-size: 15px;
  margin-bottom: 20px;
}

.custom-button2 {
  padding: 5px;
  border-color: black;
  background-color: #b63781;
  color: rgb(243, 236, 236);
  font-family: monospace;
}


.custom-button2:hover {
  background-color: rgb(157, 88, 221);
}

.custom-button:hover {
  background-color: rgb(157, 88, 221);
}

.container {
  border-width: 2px;
  border-radius: 20px;
  border-style: solid;
  border-color: rgb(202, 176, 226);
}

.custom-spacing {
  padding-right: 50%;

}

.container-tabela {
  padding-top: 50px;
  padding-bottom: 50px;
}

.modal-input{
  padding-bottom: 20px;
}

.custom-input {
  max-width: 50%;
}

.spacing {
  padding-top: 20px;
}

.padding-bottom {
  margin-bottom: 20px;
}
</style>
