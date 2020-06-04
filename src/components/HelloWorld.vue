<template>
  <div class="hello">
    <div>
    <button v-on:click="sendCmd(0.2, 0, 0, 0, 0, 0.0)">Forward</button>
    </div>
    <button v-on:click="sendCmd(0.0, 0, 0, 0, 0, 0.3)">Turn Left</button>
    <button v-on:click="sendCmd(0, 0, 0, 0, 0, 0.0)">Stop</button>
    <button v-on:click="sendCmd(0, 0, 0, 0, 0, -0.3)">Turn Right</button>
    <div>
    <button v-on:click="sendCmd(-0.2, 0, 0, 0, 0, 0.0)">Backward</button>
    </div>
    
  </div>
</template>

<script>
import ROSLIB from "roslib"
export default {
  name: "HelloWorld",
  data: () =>({
    ros: null,
    connected: false,
    createCmdVel: String,
    twist: String
  }),
  methods:{
    sendCmd(x_linear, y_linear, z_linear,x_angular, y_angular, z_angular ){
      this.createCmdVel = new ROSLIB.Topic({
      ros: this.ros,
      name:"/cmd_vel",
      messageType:"geometry_msgs/Twist"
    });
    
    this.twist = new ROSLIB.Message({
      linear:{
        x:x_linear,
        y:y_linear,
        z:z_linear
      },
      angular:{
        x:x_angular,
        y:y_angular,
        z:z_angular
      }
    });

    this.createCmdVel.publish(this.twist);
    }
  },
  mounted(){
    this.ros = new ROSLIB.Ros({
      url:"ws://localhost:9090"
    });
    this.ros.on("connection", ()=>{
      this.connected =true;
    });
    console.log("This ROSLIB connection", this.ros);
    this.sendCmd(0.0, 0, 0, 0, 0, 0.0);
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
