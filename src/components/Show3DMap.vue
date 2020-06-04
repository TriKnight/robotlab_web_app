<template>
<div class="show3dmap">
    <div id="map" />
  </div>
</template>

 <script>

import * as ROS3D from 'ros3d';
import * as ROSLIB from 'roslib';

export default {
  name: "Show3DMap",
  data: () =>({
    ros: null,
    connected: false,
    mapConnected: false,
    clientWidth: 800,
    clientHeight: 700,
    antialias:true,
    continuous: true,
    map: "/map"
  }),
  mounted(){
    // Add ROS connection
    //------------------------------
    this.ros = new ROSLIB.Ros({
      url:"ws://localhost:9090"
    });
    this.ros.on("connection", ()=>{
      this.connected =true;
    });
    console.log("This ROSLIB connection", this.ros);

    // Add 3D viewer
    //-----------------------------
    this.viewer = new ROS3D.Viewer({
      divID : 'map',
      width : this.clientWidth,
      height : this.clientHeight,
      antialias : this.antialias,
      displayPanAndZoomFrame: true,
      cameraPose: {
        x: 8,
        y: 7,
        z: 50
      }
    });
     // Add a grid.
    this.viewer.addObject(new ROS3D.Grid());
     // Add a tf frame
   /* this.tfClient = new ROSLIB.TFClient({
      ros : this.ros,
      angularThres : 0.01,
      transThres : 0.01,
      rate : 10.0,
      fixedFrame : this.fixedFrame
    });
    */
    // Add Map
    //-----------------------------
    this.map= new ROS3D.OccupancyGridClient({
      ros : this.ros,
      tfClient : this.tfClient,
      rootObject : this.viewer.scene,
      continuous: this.continuous,
    });
    console.log("[DEBUG] Map", this.map)

  },
};
</script>
