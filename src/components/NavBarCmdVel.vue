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
    <div>
      Linear Speed: {{ linear_speed }} and Angular Speed:{{ angular_speed }}
    </div>
    <div ref="nippleRef" class="nipple"></div>
  </div>
</template>

<script>
import ROSLIB from "roslib";
import NIPPLEJS from "nipplejs";
export default {
  name: "NavBarCmdVel",
  data: () => ({
    //ROS connection
    ros: null,
    connected: false,
    // Ros topic cmd_vel
    createCmdVel: String,
    twist: String,
    //  joystick: null,
    //ROS twist message data
    linear_speed: String,
    angular_speed: String,
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
    // This is ros connection
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
    vm.nippleHandle = vm.$refs.nippleRef; // assign a reference ID to the child component using the ref attribute
    let options = {
      zone: vm.nippleHandle,
      color: "red",
      mode: "static",
      position: { left: "50%", top: "60%" },
    };
    vm.manager = NIPPLEJS.create(options);
    console.log("mounted nipple with options: ", options, vm.manager);
    //Add timmer
    let timer;
    vm.linear_speed = 0;
    vm.angular_speed = 0;
    //Start working with the joystick
    vm.manager.on("start", function() {
      timer = setInterval(function() {
        vm.sendCmd(vm.linear_speed, 0, 0, 0, 0, vm.angular_speed);
      }, 25);
    });
    //Move the joystick
    vm.manager.on("move", function(event, data) {
      let max_linear = 5.0; // m/s
      let max_angular = 2.0; // rad/s
      let max_distance = 75.0; // pixels;
      vm.linear_speed =
        (Math.sin(data.angle.radian) * max_linear * data.distance) /
        max_distance;
      vm.angular_speed =
        (-Math.cos(data.angle.radian) * max_angular * data.distance) /
        max_distance;
    });
    // Release the joystick
    vm.manager.on("end", function() {
      if (timer) {
        clearInterval(timer);
        vm.linear_speed = 0;
        vm.angular_speed = 0;
      }
      vm.sendCmd(vm.linear_speed, 0, 0, 0, 0, vm.angular_speed);
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
