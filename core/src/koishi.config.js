// 这些文件不会被push，保存着各种不可告人的秘密
const qqNumber = require('./secret/qqNumber') // 机器人的QQ
const discordToken = require('./secret/discord').botToken
const https = require('https')
const agent = new https.Agent({
  rejectUnauthorized: false
})

module.exports = {
  port: 3100,
  selfUrl: 'https://sili.wjghj.cn',
  // 定义机器人账号
  bots: [
    // QQ
    {
      type: 'onebot:ws',
      server: 'ws://127.0.0.1:5700',
      selfId: qqNumber.user.mySelf
    },
    // Discord
    {
      type: 'discord',
      token: discordToken.SILI
    }
  ],
  // 昵称
  nickname: 'sili',
  // 指令前缀
  prefix(session) {
    if (session.groupId === '566623674770260004') {
      return ['.', '。']
    }
    return ['!', '！']
  },
  // 当数据库中不存在用户，以 1 级权限填充
  autoAuthorize: 1,
  // 自动配置群组
  autoAssign: true,
  // 延迟
  delay: {
    message: 1000,
    prompt: 30 * 1000
  },
  axiosConfig: {
    httpsAgent: agent,
    Headers: {
      // 'User-Agent': password.userAgent
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0'
    }
  }
}
