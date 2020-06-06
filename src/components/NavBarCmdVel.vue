<template>
  <div class="navbarcmdvel">
    <div>
      <button v-on:click="sendCmd(0.2, 0, 0, 0, 0, 0.0)">Forward</button>
    </div>
    <button v-on:click="sendCmd(0.0, 0, 0, 0, 0, 0.3)">Turn Left</button>
    <button v-on:click="sendCmd(0, 0, 0, 0, 0, 0.0)">Stop</button>
    <button v-on:click="sendCmd(0, 0, 0, 0, 0, -0.3)">Turn Right</button>
    <div>
      <button v-on:click="sendCmd(-0.2, 0, 0, 0, 0, 0.0)">Backward</button>
    </div>
    <div id="zone_joystick">This is joystick</div>
  </div>
</template>

<script>
import ROSLIB from "roslib";
import NIPPLEJS from "nipplejs";
export default {
  name: "NavBarCmdVel",
  data: () => ({
    ros: null,
    connected: false,
    createCmdVel: String,
    twist: String,
    static: null,
  }),
  methods: {
    sendCmd(x_linear, y_linear, z_linear, x_angular, y_angular, z_angular) {
      this.createCmdVel = new ROSLIB.Topic({
        ros: this.ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/Twist",
      });

      this.twist = new ROSLIB.Message({
        linear: {
          x: x_linear,
          y: y_linear,
          z: z_linear,
        },
        angular: {
          x: x_angular,
          y: y_angular,
          z: z_angular,
        },
      });

      this.createCmdVel.publish(this.twist);
    },
    showJostick() {
      this.static = NIPPLEJS.create({
        zone: document.getElementById("zone_joystick"),
        color: "blue",
        mode: "static",
        position: { left: "50%", top: "60%" },
      });

      console.log("[DEBUG] This is the joystick", this.static);
    },
  },
  mounted() {
    this.ros = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });
    this.ros.on("connection", () => {
      this.connected = true;
    });
    console.log("This ROSLIB connection", this.ros);
    this.sendCmd(0.0, 0, 0, 0, 0, 0.0);
    this.showJostick();
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
