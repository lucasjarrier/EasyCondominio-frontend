<template>
  <div class="background">
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
            <router-link class="entrar" to="/">
              <div type="submit" id="entrar" class="btn-enter text-center">
                Entrar
              </div>
            </router-link>
          </div>
          <b-row>
            <label class="cadastro txt-cadastro"
              >Não tem uma conta?
              <router-link to="/">
                <a href="">Cadastre-se</a>
              </router-link>
            </label>
          </b-row>
          <b-row>
            <label class="txt-cadastro">
              <router-link to="/">
                <a href="">Esqueci minha senha</a>
              </router-link>
            </label>
          </b-row>
        </div>
      </b-col>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
.eye-icon {
  color: rgb(94, 94, 94);
}
.eye-btn {
  height: 50px !important;
  width: 50px !important;
  border-top-left-radius: 0px !important;
  cursor: pointer;
}

.container-login {
  width: 30rem;
}

.email-psw {
  margin-left: 12%;
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
  background: #b63781;
  margin-top: 1rem;
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

.label-senha , .label-email {
  color: white;
}
</style>

<script>
export default {
  data() {
    return {
      login: { showPassword: false },
    };
  },
  methods: {
    viewPassword() {
      this.login.showPassword = this.login.showPassword ? false : true;
    },
  },
};
</script>
