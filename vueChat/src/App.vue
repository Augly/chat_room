<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  name: "App"
};
</script>

<style>
#myStep .el-step__head.is-success {
  color: RGBA(0, 119, 255, 1) !important;
  border-color: RGBA(0, 119, 255, 1) !important;
}

#myStep .el-step__title.is-success {
  color: RGBA(0, 119, 255, 1) !important;
}

#app {
  font-family: " PingFang-SC-Regular";
  /* -webkit-font-smoothing: antialiased;
  /* -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
* {
  box-sizing: border-box;
}
* {
  box-sizing: border-box;
}
*:before,
*:after {
  box-sizing: inherit;
}
body,
html {
  height: 100%;
  overflow: hidden;
}
body,
ul {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

html,
body,
#app,
.wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
}
body {
  font: 14px/1.4em "Helvetica Neue", Helvetica, "Microsoft Yahei", Arial,
    sans-serif;
  background: #f5f5f5 url("../static/bg.jpg") no-repeat center;
  background-size: cover;
}
.wrapper {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 1);
}

body {
  font-family: " PingFang-SC-Regular";
  min-width: 1366px;
}

a {
  text-decoration: none;
}

.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}

.content {
  width: auto;
  padding: 0px;
  position: relative;
  width: 100%;
  height: 100%;
}

.content-collapse {
  left: 65px;
}

.container {
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

[v-cloak] {
  display: none;
}

/*自定义样式*/
</style>
