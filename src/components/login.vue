<template>
  <div>
    <el-row>
      <b-col>
        <div class="center-login">
          <div class="custom-border">
            <el-alert
              v-if="this.exibeAlert"
              :title="this.alert.title"
              :type="String(this.alert.type)"
              :description="this.alert.description"
              center
              effect="dark"
              show-icon
              class="custom-alert"
            >
            </el-alert>
            <h3 class="align-center">Seja bem-vindo(a)</h3>
            <b-row>
              <label class="label-email email-psw">Login</label>
            </b-row>
            <b-row>
              <b-input-group class="input-email mr-auto ml-auto">
                <b-form-input
                  id="email"
                  class="email-campo"
                  type="email"
                  v-model="formLogin.login"
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
                  v-model="formLogin.password"
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
              <div
                type="submit"
                id="entrar"
                class="btn-enter text-center"
                @click="logarUsuario"
              >
                Entrar
              </div>
            </div>
            <div>
              <b-row>
                <label class="cadastro txt-cadastro"
                  >Não tem uma conta?
                  <a class="link" v-b-modal.modal-2>Cadastre-se</a>
                  <b-modal
                    v-model="modalShow"
                    id="modal-2"
                    title="Cadastrar novo Usuário"
                    hide-footer
                  >
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
                        <b-form-select
                          v-model="form.gender"
                          :options="options"
                        ></b-form-select>
                      </b-form-group>
                    </b-row>
                    <b-button class="mt-3" block @click="cadastrarUsuario"
                      >Cadastrar</b-button
                    >
                  </b-modal>
                </label>
              </b-row>
            </div>
            <b-row>
              <label class="txt-cadastro">
                <a class="link" v-b-modal.modal-1>Esqueci minha senha</a>
                <b-modal
                  id="modal-1"
                  v-model="modalShow2"
                  title="Recuperar Senha"
                  hide-footer
                >
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
                  <b-button class="mt-2" block @click="recuperarSenha"
                    >Enviar</b-button
                  >
                </b-modal>
              </label>
            </b-row>
          </div>
        </div>
      </b-col>
    </el-row>
  </div>
</template>

<script>
import { cadastrarUsuario } from "@/services/usuarioService";
import { login } from "@/services/authService";

export default {
  data() {
    return {
      login: { showPassword: false },
      modalShow: false,
      modalShow2: false,
      selected: null,
      successCadastro: null,
      options: [
        { value: "", text: "Selecione um Gênero" },
        { value: "MASCULINO", text: "Masculino" },
        { value: "FEMININO", text: "Feminino" },
        { value: "NAO_INFORMADO", text: "Prefiro não informar" },
      ],
      form: {
        login: "",
        password: "",
        name: "",
        gender: "",
        apartment: "",
        phoneNumber: "",
      },
      formLogin: {
        login: "",
        password: "",
      },
      exibeAlert: false,
      alert: {},
    };
  },
  methods: {
    viewPassword() {
      this.login.showPassword = this.login.showPassword ? false : true;
    },
    async cadastrarUsuario() {
      let successCadastro = false;
      try {
        successCadastro = await cadastrarUsuario(this.form);
      } catch (e) {
        this.modalShow = false;
        this.showAlert(
          "error",
          "Ah não!",
          "Ocorreu um erro ao cadastrar seu usuário."
        );
      }
      if (successCadastro) {
        this.modalShow = false;
        this.showAlert(
          "success",
          "Legal!",
          "Seu usuário foi criado com sucesso."
        );
        this.clearCacheInputs();
      }
    },
    clearCacheInputs() {
      (this.form.login = ""),
        (this.form.password = ""),
        (this.form.name = ""),
        (this.form.gender = ""),
        (this.form.apartment = ""),
        (this.form.phoneNumber = "");
    },
    showAlert(type, title, desc) {
      this.alert.type = type;
      this.alert.title = title;
      this.alert.description = desc;
      this.exibeAlert = true; // eslint-disable-line
      setTimeout(() => {
        this.exibeAlert = false;
      }, 5000);
    },
    async logarUsuario() {
      this.exibeAlert = false;
      let response = false;
      try {
        response = await login(this.formLogin);
      } catch (e) {
        this.showAlert(
          "error",
          "Senha Inválida!",
          "Por favor, digite a senha correta ou recupere sua senha."
        );
      }

      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("idUser", response.data.idUser);
        this.$router.push("/Home");
      }
    },
    recuperarSenha() {
      this.modalShow2 = false;
      alert("Uma nova senha será envida para seu e-mail.");
    },
  },
  mounted() {
    localStorage.clear();
  },
};
</script>

<style lang="scss" scoped>
@import url("//unpkg.com/element-ui@2.15.2/lib/theme-chalk/index.css");
@import "@/assets/styles/_variables.scss";

.align-center {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  color: white;
}
.eye-icon {
  color: black;
}
.eye-btn {
  height: 50px !important;
  width: 50px !important;
  cursor: pointer;
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

.custom-border {
  border-radius: 15px 50px;
  background: rgba(17, 17, 17, 0.253);
  width: 30%;
}

.center-login {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1000px) {
  .custom-border {
    width: 80%;
  }
}

.custom-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
</style>
