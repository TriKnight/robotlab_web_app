<template>
  <div class="view3d">
    <ThreeDMapping> </ThreeDMapping>
  </div>
</template>
<script>
// @ is an alias to /src
import ThreeDMapping from "@/components/ThreeDMapping.vue";

export default {
  name: "View3d",
  components: {
    ThreeDMapping
  }
};
</script>