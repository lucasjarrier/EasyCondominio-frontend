<template>
  <body>
    <div class="background-image">
      <b-row class="justify-content-center main-row" align-v="center">
        <b-col xl="*">
          <b-img class="logo" :src="logo"></b-img>
          <LoginBox />
        </b-col>
      </b-row>
    </div>
  </body>
</template>

<style lang="scss" scoped>

  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 45%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .background-image{
    background-color: black;
    background-size: cover;
    background-repeat: no-repeat;
    height:100vh;
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
