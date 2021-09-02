const { koishi } = require('..')

module.exports = () => {
  koishi.command('version').action(async () => {
    const { appVersion: onebotVer } =
      (await koishi.bots[0].$getVersionInfo()) || '-'
    const packageInfo = require('../../package.json')
    const { dependencies } = packageInfo
    const koishiPlugs = Object.keys(dependencies)
      .filter((item) => item.startsWith('koishi-'))
      .map((item) => `${item.replace(/^koishi-/, '')}: ${dependencies[item]}`)
    const versionMsg = [
      `SILI Core: ${packageInfo.version}`,
      `OneBot: ${onebotVer}`,
      `koishi: ${packageInfo.dependencies.koishi}`,
      '  ' + koishiPlugs.join('\n  '),
    ].join('\n')
    return versionMsg
  })
}
