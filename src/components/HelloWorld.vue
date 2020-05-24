<template>
  <div class="hello"></div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
<script type="text/javascript">
// Here it goes our code!

var ros = new ROSLIB.Ros({
  url: "ws://localhost:9090"
});
ros.on("connection", function() {
  console.log("Connected to websocket server.");
});

ros.on("error", function(error) {
  console.log("Error connecting to websocket server: ", error);
});

ros.on("close", function() {
  console.log("Connection to websocket server closed.");
});
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
