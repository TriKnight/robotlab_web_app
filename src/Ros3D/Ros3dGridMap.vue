<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'
import * as ROSLIB from 'roslib'
export default {
  name: 'ros3d-grid-map',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    topic: {
      type: String,
      default: '/map',
      require: false,
    },
    continuous: {
      type: Boolean,
      default: true,
      require: false,
    },
  },
  watch: {
    topic(n) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
      console.log("[DEBUG] Show the map topic", this.object.topicName);
      
      
    },
    continuous(n) {
      this.object.continuous = n;
      if (n) this.object.subscribe();
    },
    x() {
      this.$nextTick(this.setOffset);
    },
    y() {
      this.$nextTick(this.setOffset);
    },
    z() {
      this.$nextTick(this.setOffset);
    },
    visible(newState) {
      if (newState) this.show();
      else this.hide();
    }
  },
  methods: {
    show() {
      this.$parent.viewer.scene.add(this.object.sceneNode);
    },
    hide() {
      if (this.object.sceneNode != null) this.$parent.viewer.scene.remove(this.object.sceneNode);
    },
    setOffset() {
      this.object.unsubscribe();
      this.object.offsetPose = new ROSLIB.Pose({position: {x: this.x, y: this.y, z: this.z} });
      this.object.subscribe();

    }
  },
  mounted() {
    this.object = new ROS3D.OccupancyGridClient({
      ros : this.$parent.ros,
      
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
      topic: this.topic,
      continuous: this.continuous,
      offsetPose: new ROSLIB.Pose({position: {x: this.x, y: this.y, z: this.z} })
    });
    console.log("[DEBUG] Show the map topic", this.object);
    
    this.object.name = this._uid;
  
    this.object.processMessage = (message) => {
      ROS3D.OccupancyGridClient.prototype.processMessage.call(this.object, message);
    };
    if (this.visible) this.show();
    
  },
  beforeDestroy() {
    this.hide();
  }
};
</script>