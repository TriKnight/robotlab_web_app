<template>
  <div id="HelloWorld" class="container">
    <div class="jumbotron">
      <h1>Chào mừng đến với robotlab</h1>
    </div>

    <div class="row" style="max-height:200px;">
      <div class="col-md-6">
        <h3>Connection status</h3>

        <p class="text-success" v-if="connected">Connected!</p>
        <p class="text-danger" v-else>Not connected!</p>

        <label>Websocket server address</label>
        <input type="text" v-model="ws_address" />
        <br />
        <button @click="disconnect" class="btn btn-danger" v-if="connected">Disconnect!</button>
        <button @click="connect" class="btn btn-success" v-else>Connect!</button>
      </div>
      <div class="col-md-6" style="max-height:200px; overflow:auto;">
        <h3>Log messages</h3>
        <div>
          <p>{{ logs }};</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ROSLIB from "roslib";
export default {
  name: "HelloWorld",

  data: function() {
    return {
      connected: false,
      ros: null,
      ws_address: "ws://0.0.0.0:9090",
      logs: []
    };
  },
  // helper methods to connect to ROS
  methods: {
    connect: function() {
      this.logs.unshift("connect to rosbridge server!!");
      this.ros = new ROSLIB.Ros({
        url: this.ws_address
      });
      this.ros.on("connection", () => {
        this.connected = true;
        this.logs.unshift("Connected!");
        console.log("Connected!");
      });
      this.ros.on("error", () => {
        this.logs.unshift("Error connecting to websocket server");
        // console.log('Error connecting to websocket server: ', error)
      });
      this.ros.on("close", () => {
        this.connected = false;
        this.logs.unshift("Connection to websocker server closed");
        console.log("Connection to websocket server closed.");
      });
    },
    disconnect: function() {
      this.ros.close();
    }
  }
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
