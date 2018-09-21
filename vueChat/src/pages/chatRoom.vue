<template>
  <div>
    <div class="wrap">
      <div class="sidebar">
        <div class="card">
          <header>
            <img class="avatar" width="40" height="40" alt="coffce" v-lazy="adminLogo">
            <p class="name">仇益阳</p>
          </header>
          <footer>
            <input class="search" type="text" placeholder="search user..." v-model="serchData">
          </footer>
        </div>
        <div class="list">
          <ul>
            <li :class="activeIndex==index?'active':''" v-for="(item,index) in chatList" :key="index" @click="select(item.id,index)">
              <img class="avatar" width="30" height="30" alt="示例介绍" v-lazy="item.avarImg">
              <p class="name">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <div class="message">
          <ul>
            <li v-for="(item,index) in chatRecord" :key="index">
              <p class="time">
                <span>{{item.timeData}}</span>
              </p>
              <div class="other" v-for="(chatItem,chatIndex) in item.list" :key="chatIndex" :class="chatItem.id==userId?'self':''">
                <img class="avatar" width="30" height="30" v-lazy="chatItem.avarLogo">
                <div class="text">
                  <p v-if="chatItem.status==1">
                    {{chatItem.content}}
                  </p>
                  <div class="img" v-else>
                    <img v-lazy="chatItem.img" alt="">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="chartGroup">
          <el-upload class="img-upload" style="display:none" :action="sevarUrl" :on-remove="upremove" :on-success="upSuccess">
          </el-upload>
          <i class="el-icon-picture" @click="upload"></i>
        </div>
        <div id="text">
          <textarea placeholder="按 Ctrl + Enter 发送" @keyup.ctrl.13="sumbit()"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serchData: "",
      sevarUrl: "",
      adminLogo: "../../static/1.jpg",
      userId: "1",
      personlOne: "../../static/2.png",
      activeIndex: 0,
      chatList: 0,
      chatRecord: [
        {
          timeData: "11:20",
          list: [
            {
              id: "1",
              avarLogo: "../../static/1.jpg",
              status: 1,
              content:
                "Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我",
              img: "../../static/1.jpg"
            },
            {
              id: "1",
              avarLogo: "../../static/1.jpg",
              status: 1,
              content: "",
              img: ""
            },
            {
              id: "2",
              avarLogo: "../../static/1.jpg",
              status: 1,
              content: "",
              img: ""
            }
          ]
        }
      ]
    };
  },
  mounted() {
    //环信登录

    // var register = function() {
    //   var option = {
    //     username: "bossffffsasdfasgrewgeg",
    //     password: "a",
    //     nickname: "clock",
    //     appKey: WebIM.config.appkey,
    //     success: function() {
    //       console.log("regist success!");
    //     },
    //     error: function() {
    //       console.log("regist error");
    //     },
    //     apiUrl: WebIM.config.apiURL
    //   };
    //   this.$imConn.signup(option);
    // };
    console.log(localStorage["hx_userName"], localStorage["hx_pwd"]);
    if (
      localStorage["hx_userName"] != "" &&
      localStorage["hx_userName"] != undefined &&
      localStorage["hx_userName"] != null &&
      localStorage["hx_pwd"] != "" &&
      localStorage["hx_pwd"] != undefined &&
      localStorage["hx_pwd"] != null
    ) {
      console.log(111);
      // this.$imConn.open({
      //   apiUrl: WebIM.config.apiURL,
      //   user: localStorage["hx_userName"],
      //   pwd: localStorage["hx_pwd"],
      //   appKey: WebIM.config.appkey
      // });
    }

    var that = this;
    // console.log(this.$imConn);
    this.$imConn.listen({
      onOpened: function(message) {
        // console.log(message);
        console.log("连接成功!");
        //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();
      },
      onClosed: function(message) {
        console.log("连接关闭!");
      }, //连接关闭回调
      onTextMessage: function(message) {
        console.log(message);
        console.log("收到文本信息!");
      }, //收到文本消息
      onEmojiMessage: function(message) {
        console.log("收到表情信息!" + message);
      }, //收到表情消息
      onPictureMessage: function(message) {
        console.log("收到图片信息");
      }, //收到图片消息
      onCmdMessage: function(message) {
        console.log("收到命令信息!");
      }, //收到命令消息
      onAudioMessage: function(message) {
        console.log("收到音频信息");
      }, //收到音频消息
      onLocationMessage: function(message) {
        console.log("收到位置信息");
      }, //收到位置消息
      onFileMessage: function(message) {
        console.log("收到文件信息");
      }, //收到文件消息
      onVideoMessage: function(message) {
        var node = document.getElementById("privateVideo");
        var option = {
          url: message.url,
          headers: {
            Accept: "audio/mp4"
          },
          onFileDownloadComplete: function(response) {
            var objectURL = WebIM.utils.parseDownloadResponse.call(
              this.$imConn,
              response
            );
            node.src = objectURL;
          },
          onFileDownloadError: function() {
            console.log("File down load error.");
          }
        };
        WebIM.utils.download.call(this.$imConn, option);
      }, //收到视频消息
      onPresence: function(message) {
        //添加好友函数
        this.addFriends(message);
        console.log("处理广播信息!");
      }, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onRoster: function(message) {
        console.log("处理好友申请");
      }, //处理好友申请
      onInviteMessage: function(message) {
        console.log("处理群组邀请");
      }, //处理群组邀请
      onOnline: function() {
        console.log("网络链接成功");
      }, //本机网络连接成功
      onOffline: function() {
        console.log("网络掉线");
      }, //本机网络掉线
      onError: function(message) {
        console.log("失败回调");
      }, //失败回调
      onBlacklistUpdate: function(list) {
        //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
      },
      onReceivedMessage: function(message) {
        console.log("收到消息送达服务器回执");
      }, //收到消息送达服务器回执
      onDeliveredMessage: function(message) {
        console.log("收到消息送达客户端回执");
      }, //收到消息送达客户端回执
      onReadMessage: function(message) {
        console.log("收到消息已读回执");
      }, //收到消息已读回执
      onCreateGroup: function(message) {
        console.log("创建群组成功回执（需调用createGroupNew）");
      }, //创建群组成功回执（需调用createGroupNew）
      onMutedMessage: function(message) {
        console.log(
          "如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员"
        );
      } //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    });

    // ===========================添加/删除好友请求====================
    //easemobwebim-sdk中收到联系人订阅请求的处理方法，具体的type值所对应的值请参考xmpp协议规范
    // var handlePresence = function(e) {
    //   //（发送者希望订阅接收者的出席信息），即别人申请加你为好友
    //   if (e.type === "subscribe") {
    //     //若e.status中含有[resp:true],则表示为对方同意好友后反向添加自己为好友的消息，demo中发现此类消息，默认同意操作，完成双方互为好友；如果不含有[resp:true]，则表示为正常的对方请求添加自己为好友的申请消息。
    //   }

    //   //(发送者允许接收者接收他们的出席信息)，即别人同意你加他为好友
    //   if (e.type === "subscribed") {
    //   }

    //   //（发送者取消订阅另一个实体的出席信息）,即删除现有好友
    //   if (e.type === "unsubscribe") {
    //   }

    //   //（订阅者的请求被拒绝或以前的订阅被取消），即对方单向的删除了好友
    //   if (e.type === "unsubscribed") {
    //   }
    // };

    // ============添加好友============
    // 添加好友
    // var addFriends = function() {
    //   this.$imConn.subscribe({
    //     to: "username",
    //     // Demo里面接收方没有展现出来这个message，在status字段里面
    //     message: "加个好友呗!"
    //   });
    // };
  },
  created() {
    console.log(this.chatList, 111);
    let that = this;
    console.log(55555);

    //获取我的好友列表
    console.log(55555);
    setTimeout(function() {
      console.log(121);
      console.log(that.$imConn.getRoster);
      that.$imConn.getRoster({
        success: function(roster) {
          let that = this;
          this.chatList = roster;
          console.log(roster);
          // for (var i = 0, l = roster.length; i < l; i++) {
          //   console.log(22121212121);
          //   var ros = roster[i];
          //   console.log(ros);
          //   //ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
          //   if (ros.subscription === "both" || ros.subscription === "to") {
          //     this.chatList.push(ros);
          //     console.log(this.chatList);
          //   }
          // }
          // console.log(this.chatList);
        }
      });
    }, 2000);

    console.log(this.chatList);
  },
  methods: {
    // 单聊发送文本消息
    sendPrivateText() {
      var id = this.$imConn.getUniqueId(); // 生成本地消息id
      var msg = new WebIM.message("txt", id); // 创建文本消息
      msg.set({
        msg: "message content", // 消息内容
        to: "username", // 接收消息对象（用户id）
        roomType: false,
        success: function(id, serverMsgId) {
          console.log("send private text Success");
        },
        fail: function(e) {
          console.log("Send private text error");
        }
      });
      msg.body.chatType = "singleChat";
      this.$imConn.send(msg.body);
    },
    //收到联系人订阅请求的处理方法，具体的type值所对应的值请参考xmpp协议规范
    handlePresence(e) {
      //对方收到请求加为好友
      if (e.type === "subscribe") {
        /*同意添加好友操作的实现方法*/
        this.$imConn.subscribed({
          to: "username",
          message: "[resp:true]"
        });
        this.$imConn.subscribe({
          //需要反向添加对方好友
          to: e.from,
          message: "[resp:true]"
        });
        /*拒绝添加好友的方法处理*/
        this.$imConn.unsubscribed({
          to: "username",
          message: "rejectAddFriend"
        });
      }
    },
    // 删除好友
    removeFriends() {
      this.$imConn.removeRoster({
        to: "username",
        success: function() {
          // 删除成功
          this.$imConn.unsubscribed({
            to: "username"
          });
        },
        error: function() {
          // 删除失败
        }
      });
    },
    sumbit() {
      //发送信息
      alert(11);
    },
    select(id, index) {
      this.activeIndex = index;
    },
    upload() {
      document.querySelector(".img-upload input").click();
    },
    //图片上传成功函数
    upSuccess(response, file, fileList) {},
    upremove(file, fileList) {}
  }
};
</script>
<style scoped>
.wrap {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px;
}
.wrap .sidebar {
  float: left;
  width: 200px;
  color: #f4f4f4;
  background-color: #2e3238;
  height: 100%;
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
.list li {
  padding: 12px 15px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  -webkit-transition: background-color 0.1s;
  transition: background-color 0.1s;
}
.list li.active {
  background-color: hsla(0, 0%, 100%, 0.1);
}
.list .avatar {
  border-radius: 2px;
}
.list .name {
  display: inline-block;
  margin: 0 0 0 15px;
}
.list .avatar,
.list .name {
  vertical-align: middle;
}
.wrap .main {
  position: relative;
  overflow: hidden;
  height: 100%;
  background-color: #eee;
}
.card footer {
  margin-top: 10px;
}
.main .message {
  height: calc(100% - 160px);
  padding: 10px 15px;
  overflow-y: scroll;
}
.main .message li {
  margin-bottom: 15px;
}
.main .message li .time {
  margin: 7px 0;
  text-align: center;
}
.main .message li .time > span {
  display: inline-block;
  padding: 0 18px;
  font-size: 12px;
  color: #fff;
  border-radius: 2px;
  background-color: #dcdcdc;
}
.main .message li .avatar {
  float: left;
  margin: 0 10px 0 0;
  border-radius: 3px;
}
.main .message li .text {
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
.main .message li .text:before {
  content: " ";
  position: absolute;
  top: 9px;
  right: 100%;
  border: 6px solid transparent;
  border-right-color: #fafafa;
}
.main .message li .self {
  text-align: right;
}
.main .message li .self .avatar {
  float: right;
  margin: 0 0 0 10px;
}
.main .message .self .text {
  background-color: #b2e281;
}
.main .message .self .text:before {
  right: inherit;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #b2e281;
}
.wrap #text {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 130px;
  border-top: 1px solid #ddd;
}
.wrap #text textarea {
  padding: 10px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-family: Micrsofot Yahei;
  resize: none;
}
.chartGroup {
  width: 100%;
  height: 30px;
  padding: 0px 20px;
  line-height: 30px;
  background-color: rgba(255, 255, 255, 1);
}
.chartGroup .el-icon-picture {
  font-size: 20px;
  line-height: 30px;
}
.other {
  margin-top: 15px;
}
.other .img {
  max-width: 200px;
  height: auto;
  padding: 10px 0;
}
.other .img img {
  width: 100%;
  height: auto;
}
</style>





