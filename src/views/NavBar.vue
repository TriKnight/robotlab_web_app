<template>
  <div class="navbar">
    <img alt="Vue logo" src="../assets/logo.png" />
    <NavBarCmdVel msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBarCmdVel from "@/components/NavBarCmdVel.vue";

export default {
  name: "NavBar",
  components: {
    NavBarCmdVel
  }
};
</script>
