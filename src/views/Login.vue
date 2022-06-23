<template>
  <div class="background-color">
    <el-row>
      <b-img center class="logo" :src="logo" alt="Center image"></b-img>
    </el-row>
    <el-row>
      <LoginBox />
    </el-row>
    <footer id="footer">
      <a class="link" href="https://www.linkedin.com/in/lucasjarrier/">
        Lucas Jarrier © 2022</a
      >
    </footer>
  </div>
</template>

<script>
import LoginBox from "@/components/login.vue";
import Logo from "@/assets/easycondominio.png";

export default {
  data() {
    return {
      logo: Logo,
    };
  },
  name: "app",
  components: { LoginBox },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.background-color {
  background-color: black;
}

.logo {
  width: 20%;
}

@media screen and (max-width: 1000px) {
  .logo {
    width: 40%;
  }
}

#footer {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

@media screen and (max-width: 1000px) {
  #footer {
    margin-top: 15%;
  }
}

.link {
  color: rgba(41, 41, 41, 0.616);
}
</style>
