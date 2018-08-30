<template>
  <div>
    <div class="wrap">
      <div class="sidebar">
        <div class="card">
          <header>
            <img class="avatar" width="40" height="40" alt="coffce" src="dist/images/1.jpg">
            <p class="name">coffce</p>
          </header>
          <footer>
            <input class="search" type="text" placeholder="search user...">
          </footer>
        </div>
        <div class="list">
          <ul>
            <li class="active">
              <img class="avatar" width="30" height="30" alt="示例介绍" src="dist/images/2.png">
              <p class="name">示例介绍</p>
            </li>
            <li>
              <img class="avatar" width="30" height="30" alt="webpack" src="dist/images/3.jpg">
              <p class="name">webpack</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <div class="message">
          <ul>
            <li>
              <p class="time">
                <span>0:20</span>
              </p>
              <div class="main">
                <img class="avatar" width="30" height="30" src="dist/images/2.png">
                <div class="text">Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。
                </div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>0:20</span>
              </p>
              <div class="main_other">
                <img class="avatar" width="30" height="30" src="dist/images/2.png">
                <div class="text">项目地址: https:github.com/coffcer/vue-chat</div>
              </div>
            </li>
            <li>
              <p class="time">
                <span>1:6</span>
              </p>
              <div class="main self">
                <img class="avatar" width="30" height="30" src="dist/images/1.jpg">
                <div class="text">121</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="text">
          <textarea placeholder="按 Ctrl + Enter 发送"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.sidebar {
  float: left;
  width: 200px;
  color: #f4f4f4;
  background-color: #2e3238;
}
.sidebar .card {
  padding: 12px;
  border-bottom: 1px solid #24272c;
}
.sidebar .card .avatar {
  border-radius: 2px;
  vertical-align: middle;
}
.sidebar .card .name {
  display: inline-block;
  margin: 0 0 0 15px;
  font-size: 16px;
  vertical-align: middle;
}
.sidebar .card .search {
  padding: 0 10px;
  width: 100%;
  font-size: 12px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  outline: none;
  background-color: #26292e;
}
.list {
}
li {
  padding: 12px 15px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  -webkit-transition: background-color 0.1s;
  transition: background-color 0.1s;
}
li.active {
  background-color: hsla(0, 0%, 100%, 0.1);
}
.avatar {
  border-radius: 2px;
}
.name {
  display: inline-block;
  margin: 0 0 0 15px;
}
.avatar,
.name {
  vertical-align: middle;
}

.message {
  height: calc(100% - 160px);
  padding: 10px 15px;
  overflow-y: scroll;
}
li {
  margin-bottom: 15px;
}
.time {
  margin: 7px 0;
  text-align: center;
}
.time > span {
  display: inline-block;
  padding: 0 18px;
  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  background-color: #dcdcdc;
}
.avatar {
  float: left;
  margin: 0 10px 0 0;
  border-radius: 3px;
}
.text {
  display: inline-block;
  position: relative;
  padding: 0 10px;
  max-width: calc(100% - 40px);
  min-height: 30px;
  line-height: 2.5;
  font-size: 12px;
  text-align: left;
  word-break: break-all;
  background-color: #fafafa;
  border-radius: 4px;
}
.text:before {
  content: " ";
  position: absolute;
  top: 9px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fafafa;
}
.self {
  text-align: right;
}
.avatar {
  float: right;
  margin: 0 0 0 10px;
}
.text {
  background-color: #b2e281;
}
.text:before {
  right: inherit;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #b2e281;
}
.main {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
.text {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 160px;
  border-top: 1px solid #ddd;
}
textarea {
  padding: 10px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-family: Micrsofot Yahei;
  resize: none;
}
.wrap {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px;
}
</style>





