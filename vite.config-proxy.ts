import os from 'os'

let argv = process.argv.slice(0).reverse()

let isPre = find('--pre')
let isPro = find('--pro')
let isIp = find('--ip')
let ipValue = isIp ? getArgs('--ip') : ''

function find(flage) {
  return argv.filter((item, index) => {
    return item.indexOf(flage) === 0
  }).length > 0
}

function getArgs(flage) {
  let ag = argv.filter((item, index) => {
    return item.indexOf(flage) === 0
  })[0] || ''
  return ag.split('=')[1] || ''
}

export function getEnvName() {
  if (isPre) return 'pre'
  if (isPro) return 'pro'
}

function getIpProxy(ipValue) {
  console.log(`代理到主机：${ ipValue }`)
  let proxy = {
    [`^/dev`]: {
      target: `http://${ ipValue }:8080`,
      rewrite: path => path.replace(/^\/dev/, ''),
      changeOrigin: true
    }
  }

  return proxy
}

function getPreProxy() {
  let proxy = {
    [`^/hg-consult/api/*`]: {
      target: `https://hg-pre.glodon.com`,
      rewrite: path => path,
      changeOrigin: true
    },
    [`^/dev`]: {
      target: `https://hgapi-pre.glodon.com`,
      rewrite: path => path.replace(/^\/dev/, ''),
      changeOrigin: true
    }
  }
  return proxy
}

function getProProxy() {
  let proxy = {
    [`^/hg-consult/api/*`]: {
      target: `https://hg.glodon.com`,
      rewrite: path => path,
      changeOrigin: true
    },
    [`^/dev/oss`]: {
      target: `https://hgoss.glodon.com`,
      rewrite: path => path.replace(/^\/dev/, ''),
      changeOrigin: true
    },
    [`^/dev`]: {
      target: `https://hgapi.glodon.com`,
      rewrite: path => path.replace(/^\/dev/, ''),
      changeOrigin: true
    }
  }
  return proxy
}

export function getEnvIp() {
  return ipValue
}

export function getIPAdress() {
  let interfaces = os.networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        /^10\./.test(alias.address) &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}

export function getProxy() {
  if (isIp && ipValue) return getIpProxy(ipValue)
  if (isPre) return getPreProxy()
  if (isPro) return getProProxy()

}

