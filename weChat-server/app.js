/*
  前台消息：
    code: 0 (表示系统消息)
    code: 1 (用户交流消息)
    code: 2 (修改用户头像)
    code: 3 (修改用户名)
    code: 4 (发送图片)
    code: 5 (发送窗口抖动)
  后台消息：
    code: 0 (系统消息)
    code: 1 (用户交流消息)
    code: 2 (修改用户头像或者用户名)
    code: 3 (发送图片)
    code: 4 (发送窗口抖动)
*/
const ws = require('nodejs-websocket')
const UUID = require('uuid')
const fs = require('fs')
const users = []
const post = 3001


var server = ws.createServer(con => {
  // 接收客户端的消息时触发
  con.on('text', (str) => {
    var data = JSON.parse(str)
    const code = data.code
    const message = data.message
    switch (code) {
      case 0: // 系统消息
        message.id = 'user-' + UUID.v1()
        users.push(message) // 保存用户信息
        con.nickname = message.name // 记录当前登录用户名
        con.id = message.id // 记录当前登录用户id
        var r_message = `**message:** <font color=#ff5722>${message.name}</font>*加入了聊天室*` +
          `  \n**time:** ${data.time}` +
          `  \n**ID:** ${con.id}` +
          `\n\n---\n---`
        recordMessage(r_message)

        boardcast(JSON.stringify({
          code: 0,
          message: message.name + '加入了聊天室',
          user: message, // 当前用户
          users: users // 用户列表
        }))
        break;
      case 1: // 用户交流消息
        var r_message = `**message:** <font color=#ff5722>${message.sendUser.name}</font>发送消息给` +
          `<font color=#0099ff>${message.receiveUser.name}</font>   \n**time:** ${message.time}` +
          '  \n**text:** \n```\n'+ message.text + '\n```\n' +
          `**sendUser:** ${message.sendUser.id}(<font color=#ff5722>${message.sendUser.name}</font>)  \n` +
          `**receiveUser:** ${message.receiveUser.id}(<font color=#0099ff>${message.receiveUser.name}</font>)` +
          `\n\n---\n---`
        recordMessage(r_message)

        boardcast(JSON.stringify({
          code: 1,
          message
        }))
        break;
      case 2: // 修改用户头像
        const flag = users.findIndex((item) => {
          return item.id === message.id
        })
        users[flag].icon = message.icon
        var r_message = `**message:** <font color=#ff5722>${message.name}</font>修改了头像  \n\n---\n---`
        recordMessage(r_message)

        boardcast(JSON.stringify({
          code: 2,
          users: users // 用户列表
        }))
        break;
      case 3: // 修改用户名
          const flag2 = users.findIndex((item) => {
            return item.id === message.id
          })
          users[flag2].name = message.newName
          var r_message = `**message:** <font color=#ff5722>${message.oldName}</font>` +
            `修改了用户名为<font color=#4caf50>${message.newName}</font>  \n\n---\n---`
          recordMessage(r_message)

          boardcast(JSON.stringify({
            code: 2,
            users: users // 用户列表
          }))
          break;
      case 4: // 发送图片
        boardcast(JSON.stringify({
          code: 3,
          message
        }))
        break;
      case 5: // 窗口抖动
        console.log(message)
        boardcast(JSON.stringify({
          code: 4,
          message
        }))
        break;
      default:
        break;
    }
  })

  //  客户端关闭时触发
  con.on('close', () => {
    users.splice(users.findIndex((item) => {return item.id === con.id}), 1)
    var r_message = `**message:** *<font color=#ff5722>${con.nickname}</font>离开了聊天室*` +
      `  \n**time:** ${getCurrentTime(new Date())}` +
      `  \n**ID:** ${con.id}` +
      `\n\n---\n---`
    recordMessage(r_message)
    boardcast(JSON.stringify({
      code: 0,
      message: con.nickname + '离开了聊天室',
      users
    }))
  })

  // 发生错误时触发
  con.on('error', (err) => {
    console.log(err)
  })

}).listen(post, () => {
    console.log('监听端口号：' + post)
});

// 广播
function boardcast(str) {
  server.connections.forEach((con) => {
    con.sendText(str)
  })
}

// 记录信息
function recordMessage (msg) {
  var r_message='';
  // 读文件
  fs.readFile('./message.md', 'utf-8', function(err, data) {
    if (err) {
      // throw err;
      console.log('读文件出错了');
    } else {
      r_message = data + '\n\n' + msg
      // 写文件
      fs.writeFile('./message.md',r_message,'utf8',function(err){
        if(err)
          console.log('写文件出错了');
      })
    }
  });
}

// 获取当前时间
function getCurrentTime (now) {
  const yyyy = now.getFullYear()
  const mm = (now.getMonth() + 1).toString().padStart(2, '0')
  const dd = now.getDate().toString().padStart(2, '0')
  const hh = now.getHours().toString().padStart(2, '0')
  const mi = now.getMinutes().toString().padStart(2, '0')
  const ss = now.getSeconds().toString().padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
}
