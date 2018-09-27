<template>
  <div>
    <div class="wrap">
      <div class="sidebar">
        <div class="card">
          <header>
            <img class="avatar" width="40" height="40" alt="coffce" v-lazy="adminLogo" :key="adminLogo">
            <p class="name">{{userId}}</p>
          </header>
          <footer>
            <input class="search" type="text" placeholder="search user..." v-model="serchData">
          </footer>
        </div>
        <div class="list">
          <ul>
            <li :class="item.check?'active':''" v-for="(item,index) in chatList" :key="index" @click="select(item.targetId,index)">
              <el-badge :value="item.unreadMessageCount" class="item" :hidden="item.unreadMessageCount==0">
                <img class="avatar" width="30" height="30" alt="示例介绍" v-lazy="item.avarImg">
              </el-badge>

                <p class="name">{{item.targetId}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <div class="message">
          <ul v-for="(item,index) in chatList" :key="index" v-if="item.check">

            <li v-for="(checkitem,checkindex) in item.record" :key="checkindex">
              <p class="time">
                <span>{{checkitem.sentTime}}</span>
              </p>
              <div class="other" :class="checkitem.senderUserId==userId?'self':''">
                <img class="avatar" width="30" height="30" v-lazy="checkitem.avarLogo" :key="checkitem.avarLogo">
                <div class="text">
                  <p v-if="checkitem.objectName=='RC:TxtMsg'">
                    {{checkitem.content.content}}
                  </p>
                  <div class="img" v-else>
                    <img v-lazy="checkitem.img" alt="">
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
          <textarea placeholder="按 Ctrl + Enter 发送" @keyup.ctrl.13="sumbit()" v-model="text"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// let conversationType = 1;

export default {
  data() {
    return {
      self: null,
      adminTitle: "",
      name: "",
      text: "",
      serchData: "",
      sevarUrl: "",
      adminLogo: "../../static/1.jpg",
      userId: "加载中...",
      personlOne: "../../static/2.png",
      activeIndex: 0,
      chatList: 0,
      targetId: null,
      chatRecord: [
        // {
        // timeData: "11:20",
        // list: [
        {
          id: "1",
          avarLogo: "../../static/1.jpg",
          status: 1,
          content:
            "Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我",
          img: "../../static/1.jpg"
        }
        // ]
        // }
      ]
    };
  },
  mounted() {
    var that = this;
    console.log(that);
    // 消息监听器
    RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: function(message) {
        // 判断消息类型
        console.log(RongIMClient.MessageType.TextMessage);
        switch (message.messageType) {
          case RongIMClient.MessageType.TextMessage:
            console.log(message.content.content);
            that.$notify({
              title: "提示",
              message: message.targetId + "发来一条信息",
              type: "success"
            });
            for (let n = 0; n < that.chatList.length; n++) {
              if (that.chatList[n].targetId == message.targetId) {
                that.chatList[n].record.push(message);
              }
            }
            that.scrollTop();
            // alert(1);
            // message.content.content => 消息内容
            break;
          case RongIMClient.MessageType.VoiceMessage:
            // 对声音进行预加载
            // message.content.content 格式为 AMR 格式的 base64 码
            break;
          case RongIMClient.MessageType.ImageMessage:
            // message.content.content => 图片缩略图 base64。
            // message.content.imageUri => 原图 URL。
            break;
          case RongIMClient.MessageType.DiscussionNotificationMessage:
            // message.content.extension => 讨论组中的人员。
            break;
          case RongIMClient.MessageType.LocationMessage:
            // message.content.latiude => 纬度。
            // message.content.longitude => 经度。
            // message.content.content => 位置图片 base64。
            break;
          case RongIMClient.MessageType.RichContentMessage:
            // message.content.content => 文本消息内容。
            // message.content.imageUri => 图片 base64。
            // message.content.url => 原图 URL。
            break;
          case RongIMClient.MessageType.InformationNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.ContactNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.ProfileNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.CommandNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.CommandMessage:
            // do something...
            break;
          case RongIMClient.MessageType.UnknownMessage:
            // do something...
            break;
          default:
          // do something...
        }
      }
    });
  },
  created() {
    var that = this;
    // console.log(localStorage["ry_userId"]);
    // console.log(this.$store.state.rcloud_userId);
    // this.userId = this.$store.state.rcloud_userId;
    let t = setInterval(function() {
      console.log(that.$store.state.rcloud_userId);
      if (that.$store.state.rcloud_userId != null) {
        that.userId = that.$store.state.rcloud_userId;
        that.getConversationList();
        that.getUnreadCount();
        that.getTotalUnreadCount();
        clearInterval(t);
      }
    }, 1000);
  },
  methods: {
    scrollTop() {
      setTimeout(function() {
        var s = document.querySelector(".message").clientHeight;
        var t = document.querySelector(".message ul").scrollHeight;
        var n = document.querySelector(".message ul").scrollTop;
        document.querySelector(".message").scrollTop = t;
      }, 100);

      // console.log(document.querySelector(".message").scrollTop);
      // console.log(s, t, n);
    },
    sendTextMessage(textContent) {
      console.log(textContent);
      var that = this;
      var msg = new RongIMLib.TextMessage({
        content: textContent,
        extra: "附加信息"
      });
      var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
      var targetId = that.targetId; // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
        onSuccess: function(message) {
          console.log(message);
          for (let i = 0; i < that.chatList.length; i++) {
            if (that.chatList[i].check) {
              that.chatList[i].record.push(message);
            }
          }
          that.scrollTop();
          console.log(that.chatList);
          //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
          console.log("Send successfully");
        },
        onError: function(errorCode, message) {
          var info = "";
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = "超时";
              break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = "未知错误";
              break;
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
              info = "在黑名单中，无法向对方发送消息";
              break;
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
              info = "不在讨论组中";
              break;
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
              info = "不在群组中";
              break;
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
              info = "不在聊天室中";
              break;
            default:
              info = x;
              break;
          }
          console.log("发送失败:" + info);
        }
      });
    },
    sumbit() {
      this.sendTextMessage(this.text);
      this.clearUnreadCount(this.targetId);
    },

    //清除当前未读数
    clearUnreadCount(targetId) {
      /*
	 	此方法清除当前端的未读数，并不会多端同步，
	 	多端同步需要发送 SyncReadStatusMessage：http://support.rongcloud.cn/kb/NjE0
	 */

      var start = Date.now();
      var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
      RongIMClient.getInstance().clearUnreadCount(conversationtype, targetId, {
        onSuccess: function() {
          console.log("清除未读数成功", "success", start);
        },
        onError: function(error) {
          console.log("清除未读数失败", error, start);
        }
      });
    },
    //获取单一用户消息条数
    getUnreadCount() {
      var that = this;
      /*
		阅读时间戳缓存在 localStorage 中，消息状态根据发送时间和阅读时间戳对比判断
		每次接受新消息后通过重新调用此方法计算
	 */
      var start = new Date().getTime();
      console.log(this.$userId);
      RongIMClient.getInstance().getUnreadCount(
        "PRIVATE",
        localStorage["ry_userId"],
        {
          onSuccess: function(count) {
            console.log("获取会话未读数成功", count, start);

            // console.log("获取会话未读数成功", count, start);
          },
          onError: function(error) {
            // console.log("获取会话未读数失败", error, start);
          }
        }
      );
    },
    //获取未读消息总条数
    getTotalUnreadCount() {
      var that = this;
      /*
		阅读时间戳缓存在 localStorage 中，消息状态根据发送时间和阅读时间戳对比判断
		每次接受新消息后通过重新调用此方法计算
	 */
      var start = new Date().getTime();
      RongIMClient.getInstance().getTotalUnreadCount({
        onSuccess: function(count) {
          count == 0
            ? that.$notify({
                title: "成功",
                message: "您暂无未读消息",
                type: "success"
              })
            : that.$notify({
                title: "成功",
                message: "您有" + count + "条信息未读",
                type: "success"
              });

          // console.log("获取总未读数成功", count, start);
        },
        onError: function(error) {
          // console.log("获取总未读数失败", error, start);
        }
      });
    },
    getConversationList() {
      var that = this;
      /*
	文档：http://www.rongcloud.cn/docs/web_api_demo.html#会话接口
		http://www.rongcloud.cn/docs/web.html#5_2、同步会话列表
		http://www.rongcloud.cn/docs/api/js/Conversation.html

	历史消息云存储开通位置：https://developer.rongcloud.cn/service/roam/rXxI4IAJjxRAD72SpQ==

	注意事项：
		1：一定一定一定要先开通 历史消息云存储 功能，本服务收费，测试环境可免费开通
		2：只有发过消息才能生成会话
	*/

      var conversationTypes = null; //具体格式设置需要补充
      var limit = null; //获取会话的数量，不传或传null为全部，暂不支持分页
      var start = new Date().getTime();
      RongIMClient.getInstance().getConversationList(
        {
          onSuccess: function(list) {
            console.log(list);
            for (let i = 0; i < list.length - 1; i++) {
              list[i].number = 0;
              list[i].check = false;
              list[i].record = [];
              for (let n = i + 1; n < list.length; n++) {
                if (list[i].targetId == list[n].targetId) {
                  list[i].number++;
                  console.log(list[i].number);
                  console.log(555);
                  list.splice(n, 1); //console.log(arr[j]);
                  n--;
                }
              }
            }
            console.log(list);
            list.sort(function(a, b) {
              return a.sentTime > b.sentTime;
            });

            var title = "成功获取 " + list.length + " 个会话";
            // console.log(list);
            list[that.activeIndex].check = true;
            that.targetId = list[that.activeIndex].targetId;
            that.chatList = list;
            // that.$notify({
            //   title: "成功",
            //   message: title,
            //   type: "success"
            // });
            // console.log(title, list, start);
          },
          onError: function(error) {
            // console.log("获取会话失败", error, start);
          }
        },
        conversationTypes,
        limit
      );
    },
    select(targetId, index) {
      this.targetId = targetId;

      this.activeIndex = index;

      for (let i = 0; i < this.chatList.length; i++) {
        this.chatList[i].check = false;
      }
      this.chatList[index].check = true;
      this.clearUnreadCount(targetId);
      this.scrollTop();
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





