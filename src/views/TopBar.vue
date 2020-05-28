<template>
  <div class="topbar">
     <ConnectWeb msg="Connecting your robot" />
  </div>
</template>

<script>
// @ is an alias to /src
import ConnectWeb from "@/components/ConnectWeb.vue";

export default {
  name: "TopBar",
  components: {
    ConnectWeb
  }
};
</script>
