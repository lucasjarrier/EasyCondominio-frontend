<template>
  <div>
    <!-- <b-alert v-if="this.successCadastro == true" variant="success" show>Usuário Cadastrado com Sucesso</b-alert>
    <b-alert v-else variant="danger" show>Erro ao criar usuário</b-alert> -->
    <b-container class="container-login col-xs-12 col-sm-6 col-md-8">
      <b-col>
        <div>
          <b-row>
            <label class="label-email email-psw">Email</label>
          </b-row>
          <b-row>
            <b-input-group class="input-email mr-auto ml-auto">
              <b-form-input
                id="email"
                class="email-campo"
                type="email"
                placeholder="Email"
                required
              />
            </b-input-group>
          </b-row>
          <b-row>
            <label class="label-senha email-psw">Senha</label>
          </b-row>
          <b-row>
            <b-input-group class="input-senha mr-auto ml-auto">
              <b-form-input
                id="senha"
                class="senha-campo"
                :type="login.showPassword ? 'text' : 'password'"
                placeholder="Senha"
                required
              />
              <b-input-group-prepend
                is-text
                class="eye-btn"
                @click="viewPassword"
              >
                <b-icon
                  v-if="!login.showPassword"
                  class="eye-icon"
                  icon="eye-fill"
                />
                <b-icon v-else class="eye-icon" icon="eye-slash-fill" />
              </b-input-group-prepend>
            </b-input-group>
          </b-row>
          <div id="container">
            <router-link class="entrar" to="/header">
              <div type="submit" id="entrar" class="btn-enter text-center">
                Entrar
              </div>
            </router-link>
          </div>
          <b-row>
            <label class="cadastro txt-cadastro"
              >Não tem uma conta?
              <a class="link" v-b-modal.modal-2>Cadastre-se</a>
              <b-modal v-model="modalShow" id="modal-2" title="Cadastrar novo Usuário" hide-footer>
                <b-row>
                  <b-form-group class="input-email mr-auto ml-auto">
                    <b-form-input
                      id="email"
                      class="email-campo"
                      type="email"
                      placeholder="Email"
                      v-model="form.login"
                      required
                    />
                  </b-form-group>
                  <b-form-group class="input-senha mr-auto ml-auto">
                    <b-form-input
                      id="senha"
                      class="senha-campo"
                      :type="login.showPassword ? 'text' : 'password'"
                      placeholder="Senha"
                      v-model="form.password"
                      required
                    />
                  </b-form-group>
                  <b-form-group class="input-senha mr-auto ml-auto">
                    <b-form-input
                      class="senha-campo"
                      type="text"
                      placeholder="Nome"
                      v-model="form.name"
                      required
                    />
                  </b-form-group>
                  <b-form-group class="input-senha mr-auto ml-auto">
                    <b-form-input
                      class="senha-campo"
                      type="text"
                      placeholder="Apartamento"
                      v-model="form.apartment"
                      v-mask="'###-#'"
                      required
                    />
                  </b-form-group>
                  <b-form-group class="input-senha mr-auto ml-auto">
                    <b-form-input
                      class="senha-campo"
                      type="text"
                      placeholder="Telefone"
                      v-model="form.phoneNumber"
                      v-mask="'+55 (##) #####-####'"
                      required
                    />
                  </b-form-group>
                  <b-form-group class="input-senha mr-auto ml-auto">
                    <b-form-select v-model="form.gender" :options="options"></b-form-select>  
                  </b-form-group>
                </b-row>
                <b-button class="mt-3" block @click="cadastrarUsuario">Cadastrar</b-button>
              </b-modal>
            </label>
          </b-row>
          <b-row>
            <label class="txt-cadastro">
              <a class="link" v-b-modal.modal-1>Esqueci minha senha</a>
              <b-modal id="modal-1" title="Recuperar Senha">
                <b-row>
                  <b-input-group class="input-email mr-auto ml-auto">
                    <b-form-input
                      id="email"
                      class="email-campo"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </b-input-group>
                </b-row>
              </b-modal>
            </label>
          </b-row>
        </div>
      </b-col>
    </b-container>
  </div>
</template>

<script>

import { cadastrarUsuario } from '@/services/usuarioService';

export default {
  data() {
    return {
      login: { showPassword: false },
      modalShow: false,
      variants: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark",
      ],
      selected: null,
      options: [
        { value: "", text: 'Selecione um Gênero' },
        { value: 'MASCULINO', text: 'Masculino' },
        { value: 'FEMININO', text: 'Feminino' },
        { value: 'NAO_INFORMADO', text: 'Prefiro não informar' }
      ],
      form: {
        "login": "",
        "password": "",
        "name": "",
        "gender": "",
        "apartment": "",
        "phoneNumber": ""
      },
      successCadastro: null,
    };
  },
  methods: {
    viewPassword() {
      this.login.showPassword = this.login.showPassword ? false : true;
    },
    async cadastrarUsuario() {
      let successCadastro = false;
      try {
        successCadastro =  await cadastrarUsuario(this.form)
      } catch (e) {
        console.alert(e.response.data);
      }
      if(successCadastro) {
        this.modalShow = false;
        this.successCadastro = true;
        this.clearCacheInputs();
      }
      console.log(this.form);
    },
    clearCacheInputs() {
      this.form.login = "",
      this.form.password = "",
      this.form.name = "",
      this.form.gender = "",
      this.form.apartment = "",
      this.form.phoneNumber = ""
      // this.successCadastro = null;
    }
  },
};
</script>

<style lang="scss" scoped>
@import url("//unpkg.com/element-ui@2.15.2/lib/theme-chalk/index.css");
@import "@/assets/styles/_variables.scss";

.eye-icon {
  color: rgb(94, 94, 94);
}
.eye-btn {
  height: 50px !important;
  width: 50px !important;
  cursor: pointer;
}

.container-login {
  width: 30rem;
}

.email-psw {
  margin-left: 12%;
}

.link {
  color: $primary-color;
}

.link:hover {
  color: #3fa9f0;
}

.input-email {
  width: 77%;
  height: 67px;
}

.email-campo {
  width: 77%;
  height: 50px;
}

.input-senha {
  width: 77%;
  height: 67px;
}

.senha-campo {
  width: 77%;
  height: 50px;
}

.entrar {
  width: 77% !important;
  text-decoration: none !important;
}

.btn-enter {
  font-size: 20px;
  border-radius: 5px;
  padding: 12px 0;
  color: #fff;
  border: none;
  width: 77%;
  margin-left: auto;
  margin-right: auto;
  background: $primary-color;
  margin-top: 1rem;
}

.btn-enter:hover {
  background-color: #3fa9f0;
}

.txt-cadastro {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: white;
}

.cadastro {
  margin-top: 2rem;
}

.label-senha,
.label-email {
  color: white;
}
</style>
