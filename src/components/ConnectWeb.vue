<template>
  <div class="connect">
    <h1> Connecting to your robot </h1>
  </div>

</template>

<script>
export default {
  name: "ConnectWeb",
  props: {
    msg: String
  }
};
</script>
<script type="text/javascript">
// Add the address url connect to websocket
var ros = new ROSLIB.Ros({
  url: "ws://localhost:9090"
});
// Enable the ros connection with websocket
ros.on("connection", function() {
  console.log("Connected to websocket server.");
});
// Showing the error when connection error
ros.on("error", function(error) {
  console.log("Error connecting to websocket server: ", error);
});
// Ros close serve
ros.on("close", function() {
  console.log("Connection to websocket server closed.");
});

var cmdVel = new ROSLIB.Topic({
  ros: ros,
  name: "/cmd_vel",
  messageType: "geometry_msgs/Twist"
});

var twist = new ROSLIB.Message({
  linear: {
    x: 0.5,
    y: 0.0,
    z: 0.0
  },
  angular: {
    x: 0.0,
    y: 0.0,
    z: 0.5
  }
});
cmdVel.publish(twist);
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
