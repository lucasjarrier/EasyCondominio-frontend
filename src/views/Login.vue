<template>
  <div class="main-div">
    <b-row class="justify-content-center main-row" align-v="center">
      <b-col sm="12" md="12" lg="8" xl="6">
        <b-img class="logo" :src="logo"></b-img>
        <LoginBox />
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 45%;
}

body {
  background-color: aquamarine;
}
.main-div {
  // background-image: url("~@/assets/campina.jpg");
  margin: 0;
  padding: 0;
  background-color: black;
  background-repeat: no-repeat;
  height:1000px;
  background-size: cover;
  width: 100%;
  position: relative;
}
</style>

<script>
import LoginBox from "@/components/login.vue";
import Logo from "@/assets/logo_gtchef.png";

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
