<template>
<div class="threedmapping">
 <ros3d-viewer
    :ros="ros"
    ref="viewer" id="viewer"
    @hook:mounted="rosViewerMounted" 
    v-if="connected">

    <ros3d-axes />

    <ros3d-grid :numCells = '10' />
    <ros3d-arrow :x ="1" :y="1" :z="1"/>
    <ros3d-occupancy-grid-client />
    <ros3d-laser-scan />
  </ros3d-viewer  >
  </div>
</template>
 
<script>
import ROSLIB from 'roslib';
import Ros3dViewer from '@/Ros3D/Ros3dViewer.vue';
import Ros3dGrid from '@/Ros3D/Ros3dGrid.vue';
import Ros3dAxes from '@/Ros3D/Ros3dAxes.vue';
import Ros3dOccupancyGridClient from '@/Ros3D/Ros3dOccupancyGridClient.vue'
import Ros3dArrow from  '@/Ros3D/Ros3dArrow.vue';
import Ros3dLaserScan from '@/Ros3D/Ros3dLaserScan.vue';

export default {
  name:  'ThreeDMapping',
  components: {
    Ros3dViewer,
    Ros3dGrid,
    Ros3dAxes,
    Ros3dOccupancyGridClient,
    Ros3dArrow,
    Ros3dLaserScan
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  data: () => ({
    ros: null,
    connected: false
  }),
  mounted() {
    this.ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
    });
    this.ros.on('connection', () => {
      this.connected = true;
    });
  },
  methods: {
    handleResize() {
      if (this.$refs.viewer && this.$refs.viewer.viewer) this.$refs.viewer.viewer.resize(this.$el.clientWidth, this.$el.clientHeight);
    },
    rosViewerMounted () {
      this.handleResize();
    }
  }
}
</script>

<style>
html { overflow-y: auto ! important }
body { margin: 0; }
#viewer {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>