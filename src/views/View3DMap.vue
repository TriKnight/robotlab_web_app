<template>
  <div class="view3dmap">
    <Show3DMap> </Show3DMap>
  </div>
</template>
<script>
// @ is an alias to /src
import Show3DMap from "@/components/Show3DMap.vue";

export default {
  name: "View3DMap",
  components: {
    Show3DMap
  }
};
</script>