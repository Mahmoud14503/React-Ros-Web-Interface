# Prerequisites
The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

# How to run
Follow these steps:


Step 1: Clone the repository.
```sh
git clone <GIT_URL>
```

Step 2: Navigate to the project directory on your pc.
```sh
cd <YOUR_PROJECT_NAME>
```

Step 3: Install the necessary dependencies.
```sh
npm i
```

Step 4: Start the development server.
```sh
npm run dev
```
# Now Run Your Rosbridge Server

I assume you already have ROS 2 installed on your computer. Let's start by installing the rosbridge_server package:
```sh
$ sudo apt install ros-<ROS_DISTRO>-rosbridge-server
```

Next, you may have to source your development environment:
```sh
$ source /opt/ros/<ROS_DISTRO>/setup.bash
```

To launch the Rosbridge WebSocket server, run the launch file included with the Rosbridge install:
```sh
$ ros2 launch rosbridge_server rosbridge_websocket_launch.xml \
   [INFO] [1541100534.152110]: Rosbridge WebSocket server started on port 9090
```
### Refresh your web page to reconnect to the robot, and verify that your alert compnent now shows "Connected" with green background.
