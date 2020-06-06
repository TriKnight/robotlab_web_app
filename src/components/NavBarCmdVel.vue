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
    <div>{{ linear_speed_x }} and {{ linear_speed_y }}</div>
    <div id="zone_joystick">This is joystick</div>
    <div ref="nippleRef" class="nipple"></div>
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
    //  joystick: null,
    linear_speed_x: Number,
    linear_speed_y: Number,
    angular_speed: Number,
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
    // This is the code for Joystick
    let vm = this;
    vm.nippleHandle = vm.$refs.nippleRef;
    let options = {
      zone: vm.nippleHandle,
      color: "blue",
      mode: "static",
      position: { left: "50%", top: "60%" },
    };
    vm.manager = NIPPLEJS.create(options);
    console.log("mounted nipple with options: ", options, vm.manager);
    vm.manager.on("added", (event, data) => vm.$emit("added", (event, data)));
    vm.manager.on("removed", (event, data) =>
      vm.$emit("removed", (event, data))
    );
    vm.manager.on("start", (event, data) => vm.$emit("start", (event, data)));
    vm.manager.on("end", (event, data) => vm.$emit("end", (event, data)));

    vm.manager.on("move", function(event, data) {
      vm.linear_speed_x = data.position.x;
      vm.linear_speed_y = data.position.y;
      console.log(vm.linear_speed_x, vm.linear_speed_y);
    });
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
