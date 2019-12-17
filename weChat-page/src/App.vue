<template>
  <div class="app" ref="app"
   @click="isShow=false;isShowModifyName=false;isTXShow=false;">
    <div class="register center" v-if="!flag">
      <div class="register-top">
        <img src="../static/img/a.jpg" alt="">
      </div>
      <div class="register-form">
        <div class="user-icon">
          <img :src="current_touxiang_url" alt="" @click.stop="isTXShow=true;isShow=false;">
          <div class="touxiang" v-show="isTXShow">
            <ul>
              <li v-for="(item, index) in 30" :key="index" @click="setTouXiang(index)">
                <img :src="user_icon_url + index + '.png'" alt="">
              </li>
            </ul>
          </div>
        </div>
        <div class="user-input">
          <div class="shurukuang">
            <div class="input-group user-name">
              <span class="input-group-addon">昵称</span>
              <input type="text" class="form-control user-name-input" maxlength="10"
               v-focus v-model="user_name" placeholder="请输入昵称" name="name">
            </div>
            <div class="input-group user-password">
              <span class="input-group-addon">密码</span>
              <input type="password" class="form-control" v-model="user_password" placeholder="请输入密码" name="password">
            </div>
          </div>
          <div class="register-btn">
            <button @click="toRegister" type="button" class="btn btn-info">登录</button>
          </div>
        </div>
      </div>
    </div>

    <div class="center main" :class="['animated', doudongClass]" v-if="flag" ref="main">
      <div class="left" ref="left">
        <div class="left-top">
          <section class="top">
            <img :src="myself.icon" alt="" @click.stop="isTXShow=true;isShow=false;isShowModifyName=false;">
            <div class="touxiang" v-show="isTXShow">
              <ul>
                <li v-for="(item, index) in 30" :key="index" @click="setTouXiang(index, true)">
                  <img :src="user_icon_url + index + '.png'" alt="">
                </li>
              </ul>
            </div>
            <div class="left-top-left">
              <div class="name ellipsis" @click.stop="showModifyName">{{ myself.name }}</div>
              <div class="input-group modify-name" @click.stop  v-show="isShowModifyName">
                  <input type="text" class="form-control" maxlength="10" @keyup.enter="toModifyName"
                   ref="mynameInput" required v-model="myname">
                  <span class="input-group-addon" @click="toModifyName">确定</span>
              </div>
              <div class="dropdown" @click.stop>
                <span class="trigger" data-toggle="dropdown">
                  <i class="iconfont one icon-more"></i>
                  <i class="iconfont icon-xia"></i>
                </span>
                <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu"  style="margin-top: -5px;">
                  <li>
                    <label class="color-label" for="color1">
                      <span>设置背景颜色</span>
                      <input type="color" v-model="bgColor" id="color1" ref="color1" style="display:none;">
                    </label>
                  </li>

                  <li>
                    <label class="color-label" for="color2">
                      <span>设置字体颜色</span>
                      <input type="color" v-model="textColor" id="color2" ref="color2" style="display:none;">
                    </label>
                  </li>

                  <li class="dropdown-submenu">
                    <a href="javascript:;">设置字体</a>
                    <ul class="dropdown-menu scroll">
                      <li v-for="(item, index) in allZiTi" :key="index" @click="alterZiTi(index)">
                        <a href="javascript:;" :style="'font-family:' + item.fontFamily">
                          {{ item.name }}(123ABC)
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li class="dropdown-submenu">
                    <a href="javascript:;">设置聊天字号</a>
                    <ul class="dropdown-menu scroll">
                      <li v-for="(item, index) in 21" :key="index" @click="alterZiHao(item + 9)">
                        <a href="javascript:;" class="zihao">
                          {{ item + 9 }}号字体
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li><a href="http://localhost:8080/">退出聊天</a></li>
                </ul>
              </div>
            </div>
          </section>
          <section class="search">
            <div class="input-group">
              <span class="input-group-addon" ref="searchSpan">
                <i class="glyphicon glyphicon-search"></i>
              </span>
              <input ref="search" @keyup="searchName" type="text" class="form-control search-input" v-model="searchText" placeholder="搜索">
            </div>
          </section>
          <section class="selection">
            <ul>
              <li>
                <a href="javascript:;">
                  <img src="../static/img/wx_select_img/message.png" alt="">
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="../static/img/wx_select_img/read.png" alt="">
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img src="../static/img/wx_select_img/tongxunlu.png" alt="">
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div class="list">
          <ul>
            <li @click="getCurrentUser()">
              <div class="list-item">
                <img :src="qunliao.icon">
                <section class="list-item-right">
                  <div class="first">
                    <div class="name ellipsis">{{ qunliao.name }}(人数：{{ qunliao.people_number }})</div>
                    <span class="message-number">
                      <span class="badge" v-if="qunliao.message_number">{{ qunliao.message_number }}</span>
                    </span>
                  </div>
                  <span :id="qunliao.id" style="display: none;"></span>
                </section>
              </div>
            </li>
            <li v-for="(user, index) in result" :key="index" @click="getCurrentUser(user)">
              <div class="list-item">
                <img :src="user.icon">
                <section class="list-item-right">
                  <div class="first">
                    <div class="name ellipsis">{{ user.name }}</div>
                    <span class="message-number">
                      <span class="badge" v-if="user.message_number">{{ user.message_number }}</span>
                    </span>
                  </div>
                  <div class="state" :class="user.state ? 'greenColor' : 'grayColor'">{{ user.state ? '[在线]' : '[离线] '}}</div>
                  <span :id="user.id" style="display: none;"></span>
                </section>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="right" id="right" ref="right">
        <section v-if="currentUser.name">
          <div class="right-top">
            {{currentUser.name}}
            <span v-if="currentUser.id === qunliao.id">(在线人数：{{users.length }})</span>
            <div class="more dropdown" @click.stop>
              <span data-toggle="dropdown">
                <i class="iconfont icon-more1"></i>
              </span>
              <ul class="dropdown-menu nomingzi" role="menu" aria-labelledby="dropdownMenu">
                <li><a href="javascript:;" @click="clearChat(currentUser.id)">清除聊天记录</a></li>
              </ul>
            </div>
          </div>

          <div class="right-center" id="chuangkou">
            <div v-for="(item, index) in messages" :key="index">
              <!-- 群聊 -->
              <div v-if="(item.id === currentUser.id) && (currentUser.id === qunliao.id)">
                <div v-for="(message, index2) in item.messages" :key="index2">

                  <div class="serverTip" v-if="message.type === 0">{{ message.text }}</div>

                  <div class="my-message"  v-if="message.type === 1">
                    <div class="message">
                      <div class="timeAndName">
                        <span>{{ message.time }}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{{ message.name }}</span>
                      </div>
                      <div class="content" :style="{color: textColor, fontSize: zihao}" v-if="message.text">
                        {{ message.text }}
                      </div>
                      <div class="content-img" v-if="message.img">
                        <img :src="message.img" alt="">
                      </div>
                    </div>
                    <div class="jiantou" v-if="message.text"></div>
                    <div class="icon">
                      <img :src="myself.icon" alt="">
                    </div>
                  </div>

                  <div class="order-message" v-if="message.type === 2">
                    <div class="icon">
                      <img :src="message.icon" alt="">
                    </div>
                    <div class="jiantou" v-if="message.text"></div>
                    <div class="message">
                      <div class="timeAndName">
                        <span>{{ message.name }}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{{ message.time }}</span>
                      </div>
                      <div class="content" :style="{color: textColor, fontSize: zihao}" v-if="message.text">
                        {{ message.text }}
                      </div>
                      <div class="content-img" v-if="message.img">
                        <img :src="message.img" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 收到消息 -->
              <div v-if="(item.id === myself.id) && (currentUser.id !== qunliao.id) && (currentUser.id === item.sid) && (item.sid !== item.id)">
                <div v-for="(message, index2) in item.messages" :key="index2">
                  <div class="serverTip" v-if="message.type === 0">{{ message.text }}</div>

                  <div class="my-message"  v-if="message.type === 1">
                    <div class="message">
                      <div class="timeAndName">
                        <span>{{ message.time }}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{{ message.name }}</span>
                      </div>
                      <div class="content" :style="{color: textColor, fontSize: zihao}" v-if="message.text">
                        {{ message.text }}
                      </div>
                      <div class="content-img" v-if="message.img">
                        <img :src="message.img" alt="">
                      </div>
                    </div>
                    <div class="jiantou" v-if="message.text"></div>
                    <div class="icon">
                      <img :src="myself.icon" alt="">
                    </div>
                  </div>

                  <div class="order-message" v-if="message.type === 2">
                    <div class="icon">
                      <img :src="message.icon" alt="">
                    </div>
                    <div class="jiantou" v-if="message.text"></div>
                    <div class="message">
                      <div class="timeAndName">
                        <span>{{ message.name }}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{{ message.time }}</span>
                      </div>
                      <div class="content" :style="{color: textColor, fontSize: zihao}" v-if="message.text">
                        {{ message.text }}
                      </div>
                      <div class="content-img" v-if="message.img">
                        <img :src="message.img" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 发送消息 -->
              <div v-if="(item.sid === myself.id) && (currentUser.id !== qunliao.id) && (currentUser.id === item.id)">
                <div v-for="(message, index2) in item.messages" :key="index2">
                  <div class="serverTip" v-if="message.type === 0">{{ message.text }}</div>

                  <div class="my-message"  v-if="message.type === 1">
                    <div class="message">
                      <div class="timeAndName">
                        <span>{{ message.time }}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{{ message.name }}</span>
                      </div>
                      <div class="content" :style="{color: textColor, fontSize: zihao}" v-if="message.text">
                        {{ message.text }}
                      </div>
                      <div class="content-img" v-if="message.img">
                        <img :src="message.img" alt="">
                      </div>
                    </div>
                    <div class="jiantou" v-if="message.text"></div>
                    <div class="icon">
                      <img :src="myself.icon" alt="">
                    </div>
                  </div>

                  <div class="order-message" v-if="message.type === 2">
                    <div class="icon">
                      <img :src="message.icon" alt="">
                    </div>
                    <div class="jiantou" v-if="message.text"></div>
                    <div class="message">
                      <div class="timeAndName">
                        <span>{{ message.name }}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{{ message.time }}</span>
                      </div>
                      <div class="content" :style="{color: textColor, fontSize: zihao}" v-if="message.text">
                        {{ message.text }}
                      </div>
                      <div class="content-img" v-if="message.img">
                        <img :src="message.img" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="right-bottom">
            <div class="right-bottom-top">
              <span>
                <i @click.stop="isShow=true;isTXShow=false;isShowModifyName=false;" class="iconfont icon-smile"></i>
              </span>
              <span>
                <label for="upfls">
                  <i class="iconfont icon-wenjian"></i>
                  <input id="upfls" @change="sentImg" ref="upfls" type="file" style="display:none;"
                   accept="image/gif,image/jpeg,image/x-png,image/tiff,image/x-rgb,image/x-ms-bmp">
                </label>
              </span>
              <span @click="doudong" v-if="myself.id !== currentUser.id">
                <i class="iconfont icon-doudong"></i>
              </span>
            </div>
            <div class="text">
              <textarea class="content" name="content" v-model="textContent" ref="currentInput"
               @keyup.enter.exact="toSent" @keyup.shift.enter.stop @input="saveNoSend"></textarea>
            </div>
            <div class="sent">
              <button class="sent-button" @click="toSent">发送</button>
            </div>
            <div class="emoji" v-show="isShow">
              <div class="content">
                <div class="content-div" v-for="(item, index) in emoji" :key="index" :index="index" @click="biaoqing(index)">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="nochat" v-else>
          <h1>暂无聊天</h1>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current_touxiang_url: '../static/img/user_icon/1.png', // 当前用户头像
      isShow: false, // 是否显示表情框
      isTXShow: false, // 是否显示头像框
      user_name: '', // 保存用户名
      user_password: '', // 保存用户密码
      flag: false, // 主页面是否显示
      searchText: '', // 搜索内容
      bgColor: '#eeeeee', // 背景颜色
      textColor: '#333333', // 字体颜色
      users: [], // 用户列表
      result: [], // 搜索结果
      textContent: '', // 输入框内容
      currentUser: {}, // 当前用户
      myself: {}, // 自己
      myname: '', // 我的名字
      isShowModifyName: false, // 修改名字框是否显示
      qunliao: { // 群聊信息
        icon: '../static/img/qunliao.jpg',
        name: '群聊',
        state: 1,
        people_number: 0,
        message_number: 0,
        id: '*0000000000000000000000000000000000000000'
      },
      messages: [], // 保存所有消息

      user_icon_url: '../static/img/user_icon/', // 用户头像前缀
      emoji: [ // 表情
        '😀', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗',
        '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴',
        '😌', '😛', '😜', '😝', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟',
        '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠',
        '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓',
        '🍅', '🍆', '🌽', '🍄', '🐁', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒',
        '🐓', '🐕', '🐖', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑',
        '♒', '♓', '⛎', '🌰', '🍞', '🍖', '🍗', '🍔', '🍟', '🍕', '🍳', '🍲', '🍱',
        '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🍡', '🍦',
        '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '☕', '🍵',
        '🍶', '🍷', '🍸', '🍹', '🍺', '🍻', '🍴', '🎪', '🎭', '🎨', '🌹', '🍀', '🍎', '💰',
        '📱', '🌙', '🍁', '🍂', '🍃', '🌷', '💎', '🔪', '🔫', '🏀', '⚽', '⚡', '👄',
        '👍', '🔥', '👦', '👧', '👨', '👩', '👴', '👵', '👶', '👱', '👮', '👲', '👳',
        '👷', '👸', '💂', '🎅', '👰', '👼', '💆', '💇', '🙍', '🙎', '🙅', '🙆', '💁',
        '🙋', '🙇', '🙌', '🙏', '👤', '👥', '🚶', '🏃', '👯', '💃', '👫', '👬', '👭',
        '💏', '💑', '👪', '💪', '👈', '👉', '☝', '👆', '👇', '✌', '✋', '👌', '👍',
        '👎', '✊', '👊', '👋', '👏', '👐', '🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓',
        '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '☀', '🌝', '🌞', '⭐',
        '🌟', '🌠', '☁', '⛅', '☔', '⚡', '❄', '🔥', '💧', '🌊', '🚂', '🚃', '🚄',
        '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚌', '🚍', '🚎', '🚏',
        '🚐', '🚑', '🚒', '🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚚', '🚛', '🚜', '🚲',
        '⛽', '🚨', '🚥', '🚦', '🚧', '⚓', '⛵', '🚣', '🚤', '🚢', '✈', '💺', '🚁',
        '🚟', '🚠', '🚡', '🚀'
      ],
      allZiTi: [ // 所有字体
        {
          fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
          name: '默认'
        },
        {
          fontFamily: '宋体',
          name: '宋体'
        },
        {
          fontFamily: '黑体',
          name: '黑体'
        },
        {
          fontFamily: 'ZhanKuKuaiLeTi',
          name: '站酷快乐体'
        },
        {
          fontFamily: 'ZhanKuWenYiTi',
          name: '站酷文艺体'
        },
        {
          fontFamily: 'ZhanKuYiDaLiTi',
          name: '站酷意大利体'
        },
        {
          fontFamily: 'ChaoJiXiZiXing',
          name: '超极细字型'
        },
        {
          fontFamily: 'HanYiXianErTi',
          name: '汉仪贤二体'
        },
        {
          fontFamily: 'HuaKangErFengTi',
          name: '华康儿风体'
        },
        {
          fontFamily: 'HuaKangGangBiTi',
          name: '华康钢笔体'
        },
        {
          fontFamily: 'HuaKangWaWaTi',
          name: '华康娃娃体'
        },
        {
          fontFamily: 'LanHuZiTi',
          name: '濑户字体'
        },
        {
          fontFamily: 'MuYaoRuanBiShouXieTi',
          name: '沐瑶软笔手写体'
        },
        {
          fontFamily: 'QuanZiKuShuoWenXieZi',
          name: '全字库说文解字'
        },
        {
          fontFamily: 'YangRenDongZhuLinTi',
          name: '杨任东竹石体'
        },
        {
          fontFamily: 'YanJieMingChao',
          name: '源界明朝'
        }
      ],
      yanse: [ // 背景颜色
        {
          name: '默认',
          color: '#eeeeee'
        },
        {
          name: '透明',
          color: 'transparent'
        },
        {
          name: '白色',
          color: 'white'
        },
        {
          name: 'cyan',
          color: 'cyan'
        },
        {
          name: '红色',
          color: 'red'
        },
        {
          name: '黄色',
          color: 'yellow'
        },
        {
          name: 'beige',
          color: 'beige'
        },
        {
          name: '蓝色',
          color: 'blue'
        },
        {
          name: '绿色',
          color: 'green'
        },
        {
          name: '橙色',
          color: '#ff5722'
        },
        {
          name: '棕色',
          color: '#795548'
        },
        {
          name: '全透明聊天',
          color: 'all'
        }
      ],
      zihao: '', // 聊天窗口字号
      doudongClass: '', // 抖动相关类

      wsk: null // websocket
    }
  },

  mounted () {
    this.setTouXiang()
    this.getRandomName()
  },

  methods: {
    // 保存输入但未发送的信息
    saveNoSend () {
      document.getElementById(this.currentUser.id).innerHTML = this.textContent
    },

    // 选择头像，刚渲染页面时产生随机头像
    setTouXiang (n = Math.floor(Math.random() * 30), flag) {
      if (!flag) {
        this.current_touxiang_url = `../static/img/user_icon/${n}.png`
      } else {
        this.myself.icon = `../static/img/user_icon/${n}.png`
        const txmessage = {id: this.myself.id, name: this.myself.name, icon: this.myself.icon}
        this.wsk.send(JSON.stringify({code: 2, message: txmessage}))
      }
    },

    // 显示名字修改框
    showModifyName () {
      this.isShowModifyName = true
      this.isTXShow = false
      this.isShow = false
      this.$nextTick(() => {
        this.$refs.mynameInput.focus()
        this.$refs.mynameInput.select()
      })
      if (!this.myname.trim()) {
        this.myname = this.myself.name
      }
    },

    // 修改用户名
    toModifyName () {
      if (this.myname.trim() === '') {
        return window.alert('名字不能为空')
      } else if (this.myname.trim() === this.myself.name.trim()) {
        this.isShowModifyName = false
        return
      }
      const mnmessage = {id: this.myself.id, newName: this.myname, oldName: this.myself.name}
      this.myself.name = this.myname.trim()
      this.wsk.send(JSON.stringify({code: 3, message: mnmessage}))
      this.isShowModifyName = false
    },

    // 改变字体
    alterZiTi (index) {
      this.$refs.app.style.fontFamily = this.allZiTi[index].fontFamily
    },

    // 改变字号
    alterZiHao (index) {
      console.log(index)
      this.zihao = index + 'px'
    },

    // 登录
    async toRegister () {
      if (!this.user_name.trim()) {
        return window.alert('请输入昵称')
      }

      const user = {
        name: this.user_name,
        icon: this.current_touxiang_url,
        id: 'user-001',
        message_number: 0,
        state: 1
      }
      this.myself = user
      this.wsk = await new WebSocket('ws://127.0.0.1:3001')

      // 连接服务端时触发事件
      this.wsk.onopen = () => {
        this.wsk.send(JSON.stringify({message: user, code: 0, time: this.getCurrentTime(new Date())}))
      }
      // 接收服务端时数据时触发事件
      this.wsk.onmessage = (e) => {
        this.received(e)
      }
      this.flag = true
    },

    searchName () {
      let searchResult = this.users.filter(item => {
        return item.name.indexOf(this.searchText) !== -1
      })
      this.result = searchResult
    },

    // 当前聊天用户
    getCurrentUser (user) {
      this.currentUser = user || this.qunliao
      this.currentUser.message_number = 0
      this.toButtom()
      this.textContent = document.getElementById(this.currentUser.id).innerHTML
      this.$nextTick(() => {
        this.$refs.currentInput.focus()
      })
    },

    // 清除聊天记录
    clearChat (id) {
      this.messages = this.messages.filter((item) => {
        return item.id !== id
      })
    },

    // 点击表情
    biaoqing (index) {
      this.textContent += this.emoji[index]
      this.saveNoSend()
    },

    // 窗口抖动
    doudong () {
      this.doudongClass = ''
      this.doudongClass = 'shake'

      const time3 = this.getCurrentTime(new Date())
      let textData3 = {
        state: 0,
        text: '发送了窗口抖动',
        time: time3,
        receiveUser: this.currentUser,
        sendUser: this.myself
      }
      this.wsk.send(JSON.stringify({message: textData3, code: 5}))

      setTimeout(() => {
        this.doudongClass = ''
      }, 2000)
    },

    // 发送消息
    toSent () {
      if (!this.textContent || !this.textContent.trim()) {
        this.textContent = ''
        return window.alert('请输入内容！')
      }

      const time = this.getCurrentTime(new Date())

      // 向服务端发消息
      let textData = {
        state: 1,
        text: this.textContent,
        time,
        receiveUser: this.currentUser,
        sendUser: this.myself
      }
      this.wsk.send(JSON.stringify({message: textData, code: 1}))
      this.textContent = '' // 清空输入框
      document.getElementById(this.currentUser.id).innerHTML = this.textContent
    },

    // 发送图片
    sentImg () {
      const this2 = this
      const Imginput = document.getElementById('upfls')
      const file = Imginput.files[0] // 得到该图片
      if (!/image\/\w+/.test(file.type)) {
        return window.alert('暂不支持上传非图片文件')
      } else if (file.size > 5120000) {
        return window.alert('上传图片文件不要大于5MB')
      }
      const reader = new FileReader() // 创建一个FileReader对象，进行下一步的操作
      reader.readAsDataURL(file) // 通过readAsDataURL读取图片
      this.$refs.upfls.type = 'text'

      reader.onload = function () { // 读取完毕会自动触发，读取结果保存在result中
        const time2 = this2.getCurrentTime(new Date())
        let imgData = {
          state: 1,
          img: this.result,
          time: time2,
          receiveUser: this2.currentUser,
          sendUser: this2.myself
        }
        this2.wsk.send(JSON.stringify({message: imgData, code: 4}))
        this2.$refs.upfls.type = 'file'
      }
    },

    // 收到消息时触发
    received (e) {
      const mydata = JSON.parse(e.data)
      switch (mydata.code) {
        case 0: // 处理系统消息
          if (this.myself.id === 'user-001') {
            this.myself = mydata.user
          }
          this.users = mydata.users // 用户列表
          this.qunliao.people_number = this.users.length // 更新群聊人数
          this.result = this.users // 搜索显示列表
          if (this.currentUser.id !== this.qunliao.id) {
            this.qunliao.message_number += 1 // 更新群聊未读消息条数
          }

          const message = {
            id: '*0000000000000000000000000000000000000000',
            name: '群聊',
            icon: '../static/img/qunliao.jpg',
            message_number: 0,
            state: 1,
            messages: [
              {
                type: 0, // 0 表示系统消息
                text: mydata.message, // 系统消息
                time: this.getCurrentTime(new Date()), // 当前时间
                name: 'server',
                icon: ''
              }
            ]
          }
          this.messages.push(message)
          break
        case 1: // 处理聊天消息
          const {receiveUser, sendUser, text, time} = mydata.message
          if ((receiveUser.id !== this.myself.id) && (sendUser.id !== this.myself.id) && (receiveUser.id !== this.qunliao.id)) {
            break // 不能接收别人的消息
          }
          const message2 = {
            id: receiveUser.id, // 接收用户的 id
            sid: sendUser.id,
            name: receiveUser.name,
            icon: receiveUser.icon,
            message_number: 0,
            state: 1,
            messages: [
              {
                type: sendUser.id === this.myself.id ? 1 : 2,
                text,
                time,
                name: sendUser.name,
                icon: sendUser.icon
              }
            ]
          }
          this.messages.push(message2)

          // 消息提示
          if ((this.currentUser.id !== this.qunliao.id) && (receiveUser.id === this.qunliao.id)) {
            this.qunliao.message_number += 1
          } else if ((this.currentUser.id !== sendUser.id) && (this.myself.id === receiveUser.id)) {
            let temp2 = this.users.findIndex((item) => {
              return item.id === sendUser.id
            })
            this.users[temp2].message_number += 1
          }
          this.toButtom()
          break
        case 2: // 修改用户头像
          this.users = mydata.users
          this.result = this.users // 搜索显示列表
          break
        case 3: // 图片上传显示
          const receiveUser2 = mydata.message.receiveUser
          const sendUser2 = mydata.message.sendUser
          const img = mydata.message.img
          const time2 = mydata.message.time
          if ((receiveUser2.id !== this.myself.id) && (sendUser2.id !== this.myself.id) && (receiveUser2.id !== this.qunliao.id)) {
            break // 不能接收别人的消息
          }
          const message3 = {
            id: receiveUser2.id, // 接收用户的 id
            sid: sendUser2.id,
            name: receiveUser2.name,
            icon: receiveUser2.icon,
            message_number: 0,
            state: 1,
            messages: [
              {
                type: sendUser2.id === this.myself.id ? 1 : 2,
                img,
                time: time2,
                name: sendUser2.name,
                icon: sendUser2.icon
              }
            ]
          }
          this.messages.push(message3)

          // 消息提示
          if ((this.currentUser.id !== this.qunliao.id) && (receiveUser2.id === this.qunliao.id)) {
            this.qunliao.message_number += 1
          } else if ((this.currentUser.id !== sendUser2.id) && (this.myself.id === receiveUser2.id)) {
            let temp3 = this.users.findIndex((item) => {
              return item.id === sendUser2.id
            })
            this.users[temp3].message_number += 1
          }
          this.toButtom()
          break
        case 4: // 发送窗口抖动
          const receiveUser3 = mydata.message.receiveUser
          const sendUser3 = mydata.message.sendUser
          const text3 = mydata.message.text
          const time3 = mydata.message.time
          if ((receiveUser3.id !== this.myself.id) && (sendUser3.id !== this.myself.id) && (receiveUser3.id !== this.qunliao.id)) {
            break // 不能接收别人的消息
          }
          const message4 = {
            id: receiveUser3.id, // 接收用户的 id
            sid: sendUser3.id,
            name: receiveUser3.name,
            icon: receiveUser3.icon,
            message_number: 0,
            state: 1,
            messages: [
              {
                type: 0,
                text: sendUser3.id === this.myself.id ? '你' + text3 : sendUser3.name + text3,
                time: time3,
                name: sendUser3.name,
                icon: sendUser3.icon
              }
            ]
          }
          this.messages.push(message4)

          if ((receiveUser3.id === this.myself.id) || (receiveUser3.id === this.qunliao.id)) {
            this.doudongClass = ''
            this.doudongClass = 'shake'
            setTimeout(() => {
              this.doudongClass = ''
            }, 2000)
          }

          // 消息提示
          if ((this.currentUser.id !== this.qunliao.id) && (receiveUser3.id === this.qunliao.id)) {
            this.qunliao.message_number += 1
          } else if ((this.currentUser.id !== sendUser3.id) && (this.myself.id === receiveUser3.id)) {
            let temp2 = this.users.findIndex((item) => {
              return item.id === sendUser3.id
            })
            this.users[temp2].message_number += 1
          }
          this.toButtom()
          break
        default:
          break
      }
    },

    // 获取当前时间
    getCurrentTime (now) {
      const yyyy = now.getFullYear()
      const mm = (now.getMonth() + 1).toString().padStart(2, '0')
      const dd = now.getDate().toString().padStart(2, '0')
      const hh = now.getHours().toString().padStart(2, '0')
      const mi = now.getMinutes().toString().padStart(2, '0')
      const ss = now.getSeconds().toString().padStart(2, '0')
      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
    },

    // 自动滑最底端
    toButtom () {
      setTimeout(() => {
        const temp = document.getElementById('chuangkou')
        if (temp) {
          temp.scrollTop = temp.scrollHeight
        }
      }, 200)
    },

    // 自动产生名字
    getRandomName () {
      let name = ''
      let geshu = Math.floor(Math.random() * 5 + 2)
      for (let i = 0; i < geshu; i++) {
        let unicodeNum = ''
        unicodeNum = Math.floor(Math.random() * (0x4e00 - 0x9fa5) + 0x9fa5).toString(16)
        unicodeNum = '\\u' + unicodeNum
        unicodeNum = unicodeNum.replace(/\\/g, '%')
        unicodeNum = unescape(unicodeNum)
        unicodeNum = unicodeNum.replace(/%/g, '\\')
        name += unicodeNum
      }
      this.user_name = name
    }
  },

  watch: {
    qunliao: {
      deep: true,
      handler: () => {
        const temp = document.getElementById('chuangkou')
        // this.a.methods.toButtom()
        if (temp) {
          temp.scrollTop = temp.scrollHeight
        }
      }
    },

    // 设置背景颜色
    bgColor: function (val, oldVal) {
      this.$refs.right.style.backgroundColor = val
    }
  }
}
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  .center {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .main {
    display: flex;
    border-radius: 5px;
    width: 900px;
    height: 560px;
    overflow: hidden;

    .left {
      width: 240px;
      height: 100%;
      background-color: #2e3238;
      border-radius: 5px 0 0 5px;
      box-sizing: border-box;
      border: 1px solid #58595c;

      .left-top {
        margin: 10px 10px 0 10px;

        .top {
          display: flex;

          img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: white;
          }

          .touxiang {
            position: absolute;
            width: 315px;
            height: 120px;
            background-color: whitesmoke;
            border-radius: 5px;
            border: 1px solid whitesmoke;
            top: 60px;
            left: 0px;
            z-index: 99;

            &::before {
              position: absolute;
              z-index: 99;
              top: -21px;
              left: 20px;
              display: inline-block;
              content: '';
              border: 10px solid whitesmoke;
              border-left: 10px solid transparent;
              border-top: 10px solid transparent;
              border-right: 10px solid transparent;
            }

            ul {
              width: 320px;
              height: 120px;
              overflow-x: hidden;
              overflow-y: scroll;
              padding: 8px;

              &::-webkit-scrollbar{
                width:0;
                height: 0;
                background-color: transparent;
              }

              li {
                display: inline-block;
                width: 40px;
                height: 40px;
                margin: 5px;

                img {
                  width: 40px;
                  height: 40px;
                  padding: 1px;
                  border: 1px solid white;
                  border-radius: 5px;
                  background-color: white;
                }
              }
            }
          }

          .left-top-left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .name {
              margin-left: 10px;
              color: white;
              font-weight: 400;
              cursor: pointer;
            }

            .modify-name {
              position: absolute;
              width: 200px;
              height: 25px;
              border-radius: 2px;
              top: 50px;
              left: 40px;
              z-index: 99;

              input {
                width: 160px;
                height: 25px;
                border-radius: 2px 0 0 2px;
                font-weight: 700;
                outline-style: none;
                border-style: none;
                box-shadow: none;
              }

              .input-group-addon {
                padding: 0;
                height: 25px;
                width: 40px;
                cursor: pointer;
              }

              &::before {
                position: absolute;
                z-index: 99;
                top: -19px;
                left: 20px;
                display: inline-block;
                content: '';
                border: 10px solid #ffffff;
                border-left: 10px solid transparent;
                border-top: 10px solid transparent;
                border-right: 10px solid transparent;
              }

              ul {
                width: 320px;
                height: 120px;
                overflow-x: hidden;
                overflow-y: scroll;
                padding: 8px;

                &::-webkit-scrollbar{
                  width:0;
                  height: 0;
                  background-color: transparent;
                }

                li {
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  margin: 5px;

                  img {
                    width: 40px;
                    height: 40px;
                    padding: 1px;
                    border: 1px solid white;
                    border-radius: 5px;
                    background-color: white;
                  }
                }
              }
            }

            .dropdown {
              .trigger {
                display: flex;
                justify-content: center;
                align-items: center;

                i {
                  color: rgb(119, 116, 116);

                  &:nth-child(1) {
                    font-size: 25px;
                  }

                  &:nth-child(2) {
                    font-size: 8px;
                  }
                }
              }

              .multi-level {
                .color-label {
                  display: block;
                  padding: 3px 20px;
                  clear: both;
                  font-weight: 400;
                  line-height: 1.42857143;
                  color: #333;
                  white-space: nowrap;
                }

                .scroll {
                  max-height: 200px;
                  overflow-y: scroll;
                  overflow-x: auto;

                  &::-webkit-scrollbar{
                    width:0;
                    height: 0;
                    background-color: transparent;
                  }
                }

                .yanse {
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  span {
                    flex: 1;
                  }

                  .yanseblock {
                    display: inline-block;
                    margin: auto 10px;
                    width: 50px;
                    height: 20px;
                    border-radius: 2px;
                  }
                }
              }
            }
          }
        }

        .search .input-group{
          margin-top: 10px;
          border: 1px solid #26292E;
          border-radius: 5px;
          span {
            background-color: #26292E;
            border: none;
          }
          .search-input {
            background-color: #26292E;
            border: none;
          }
          .form-control:focus {
            box-shadow: none;
          }
        }

        .selection {
          ul {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #26292E;

            li {
              list-style: none;
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                width: 30px;
                height: 30px;
              }

              &:not(:last-child) {
                border-right: 1px solid #26292E;
              }
            }
          }
        }
      }

      .list {
        height: 412px;
        overflow-x: hidden;
        overflow-y: scroll;

        &::-webkit-scrollbar{
          width:0;
          height: 0;
          background-color: transparent;
        }

        ul {
          li {
            color: white;
            &:not(:last-child) {
              border-bottom: 2px solid #26292E;
            }

            .list-item {
              display: flex;
              margin: 10px;
              width: 220px;

              img {
                width: 40px;
                height: 40px;
                margin-right: 10px;
                background-color: white;
              }

              .list-item-right {
                width: 170px;

                .first {
                  display: flex;
                  justify-content: space-between;

                  .message-number {
                    .badge {
                      background-color: red;
                    }
                  }
                }

                .state {
                  font-size: 12px;

                  &.greenColor {
                    color: green;
                    font-weight: 700;
                  }

                  &.grayColor {
                    color: gray;
                  }
                }
              }
            }
          }
        }
      }
    }

    .right {
      background-color: #eeeeee;
      border: 1px solid #eeeeee;
      width: 660px;
      height: 100%;
      border-radius: 0 5px 5px 0;
      box-sizing: border-box;

      .content-img {
        img {
          max-width: 180px;
          max-height: 200px;
          background-color: transparent;
          border: 1px solid #fafafa;
        }
      }

      .nochat {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ccc;

        h1 {
          font-size: 40px;
          font-weight: bold;
          text-shadow: -1px -1px 0 #fff,1px 1px 0 #333,1px 1px 0 #444;
        }
      }

      .right-top {
        height: 50px;
        width: 95%;
        text-align: center;
        line-height: 50px;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(195, 195, 195);
        margin: 0 auto;

        .more {
          float: right;
          margin-right: 10px;
          display: block;

          i {
            font-weight: bold;
          }

          .nomingzi {
            float: none;
            left: -80px;
            top: 30px;
          }
        }
      }

      .right-center {
        overflow-x: hidden;
        overflow-y: scroll;
        width: 100%;
        height: 350px;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(195, 195, 195);

        &::-webkit-scrollbar{
          width:0;
          height: 0;
          background-color: transparent;
        }

        .serverTip {
          color: rgb(161, 156, 156);
          font-size: 12px;
          text-align: center;
          margin: 5px 0;
        }

        .my-message {
          display: flex;
          justify-content: flex-end;
          margin: 10px;

          .message {
            max-width: 350px;
            text-align: right;

            .timeAndName {
              display: flex;
              justify-content: flex-end;
              font-size: 12px;
              margin: 3px 0;

              span {
                &:nth-child(2) {
                  font-size: 600;
                }
              }
            }

            .content {
              text-align: left;
              display: inline-block;
              padding: 3px 5px;
              font-size: 15px;
              font-weight: 400;
              min-width: 20px;
              min-height: 30px;
              background-color: rgb(128, 197, 24);
              border: 1px solid rgb(128, 197, 24);
              border-radius: 5px;
              word-break: break-all;
            }
          }

          .jiantou::after {
            margin-top: 30px;
            display: inline-block;
            content: '';
            border: 5px solid rgb(128, 197, 24);
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 5px solid transparent;
          }

          .icon {
            margin-left: 5px;
            img {
              width: 40px;
              height: 40px;
            }
          }
        }

        .order-message {
          display: flex;
          justify-content: flex-start;
          margin: 10px 10px 10px 0;

          .message {
            max-width: 350px;
            text-align: left;

            .timeAndName {
              display: flex;
              justify-content: flex-start;
              font-size: 12px;
              margin: 3px 0;

              span {
                &:nth-child(2) {
                  font-size: 600;
                }
              }
            }

            .content {
              text-align: right;
              display: inline-block;
              padding: 3px 5px;
              font-size: 15px;
              font-weight: 400;
              background-color: white;
              border: 1px solid white;
              border-radius: 5px;
            }
          }

          .jiantou::after {
            margin-top: 30px;
            display: inline-block;
            content: '';
            border: 5px solid white;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 5px solid transparent;
          }

          .icon {
            margin-left: 5px;
            img {
              width: 40px;
              height: 40px;
            }
          }
        }
      }

      .right-bottom {
        position: relative;
        height: 140px;
        width: 96%;
        box-sizing: border-box;
        border-radius: 0 0 5px 0;
        margin: 10px;

        .emoji {
          position: absolute;
          top: -208px;
          width: 480px;
          height: 200px;
          background-color: white;
          border-radius: 5px;

          &::after {
            position: absolute;
            bottom: -20px;
            left: 10px;
            display: inline-block;
            content: '';
            border: 10px solid white;
            border-left: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid transparent;
          }

          .content {
            margin: 10px;
            display: flex;
            flex-wrap: wrap;
            height: 180px;
            justify-content: flex-start;
            overflow-y: scroll;
            overflow-x: hidden;

            .content-div {
              cursor: pointer;
              padding: 5px;
              height: 30px;
              width: 30px;
              border: 1px solid rgba(170, 166, 166, 0.473);
              border-top: 1px solid transparent;
              border-left: 1px solid transparent;
            }
          }
        }

        .right-bottom-top {
          height: 30px;

          span {
            margin-left: 10px;

            i {
              cursor: pointer;
              font-size: 20px;
              font-weight: bold;
              color: rgb(255, 166, 0);
            }
          }
        }

        .text {
          .content {
            height: 80px;
            width: 100%;
            resize: none;
            border: none;
            background-color: transparent;
            outline-style: none;
            border-style: none;
          }
        }

        .sent {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-right: 5px;

          button {
            background-color: rgb(128, 197, 24);
            font-size: 14px;
            font-weight: 700;
            border-radius: 5px;
            border: none;
            padding: 3px 10px;
            outline-style: none;
            border-style: none;
          }
        }
      }
    }
  }

  .register {
    width: 380px;
    height: 300px;
    background-color: white;
    border-radius: 5px;

    .register-top {
      border-radius: 5px;
      overflow: hidden;

      img {
        width: 380px;
        height: 160px;
      }
    }

    .register-form {
      display: flex;

      .user-icon {
        border-radius: 5px;
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        margin-right: 20px;
        flex: 3;

        img {
          width: 60px;
          height: 60px;
        }

        .touxiang {
          position: absolute;
          width: 320px;
          height: 120px;
          background-color: whitesmoke;
          border-radius: 5px;
          border: 1px solid whitesmoke;
          top: 250px;
          left: 30px;

          &::before {
            position: absolute;
            top: -21px;
            left: 32px;
            display: inline-block;
            content: '';
            border: 10px solid whitesmoke;
            border-left: 10px solid transparent;
            border-top: 10px solid transparent;
            border-right: 10px solid transparent;
          }

          ul {
            width: 320px;
            height: 120px;
            overflow-x: hidden;
            overflow-y: scroll;
            padding: 8px;

            &::-webkit-scrollbar{
              width:0;
              height: 0;
              background-color: transparent;
            }

            li {
              display: inline-block;
              width: 40px;
              height: 40px;
              margin: 5px;

              img {
                width: 40px;
                height: 40px;
                padding: 1px;
                border: 1px solid white;
                border-radius: 5px;
                background-color: white;
              }
            }
          }
        }
      }

      .user-input {
        flex: 7;
        margin-top: 10px;
        padding-right: 20px;

        .shurukuang {
          border: 1px solid #ccc;
          border-radius: 5px;
          overflow: hidden;

          .user-name {
            border-bottom: 1px solid #ccc;
          }

          span, input {
            border: 0px;
            border-radius: 0;
          }
        }

        .register-btn {
          margin-top: 12px;

          button {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
