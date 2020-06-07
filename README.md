# robotlab_web_app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Connect with ROS and Publish 3D Map

```
   0.git clone https://github.com/GT-RAIL/rail_maps
   1 roscore
   2 rosrun map_server map_server catkin_ws/src/rail_maps/maps/ilab.pgm 0.05
   3 roslaunch rosbridge_server rosbridge_websocket.launch

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
