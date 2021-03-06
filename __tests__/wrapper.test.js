const weapp = require('../es6/weapp')
const wx = jest.fn()

const methods = [
  'request',
  'uploadFile',
  'downloadFile',
  'connectSocket',
  'onSocketOpen',
  'onSocketError',
  'sendSocketMessage',
  'onSocketMessage',
  'closeSocket',
  'onSocketClose',
  'chooseImage',
  'previewImage',
  'getImageInfo',
  'startRecord',
  'stopRecord',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'getBackgroundAudioPlayerState',
  'playBackgroundAudio',
  'pauseBackgroundAudio',
  'seekBackgroundAudio',
  'stopBackgroundAudio',
  'onBackgroundAudioPlay',
  'onBackgroundAudioPause',
  'onBackgroundAudioStop',
  'createAudioContext',
  'chooseVideo',
  'createVideoContext',
  'saveFile',
  'getSavedFileList',
  'getSavedFileInfo',
  'removeSavedFile',
  'openDocument',
  'setStorage',
  'getStorage',
  'getStorageInfo',
  'removeStorage',
  'clearStorage',
  'setStorageSync',
  'getStorageSync',
  'getStorageInfoSync',
  'removeStorageSync',
  'clearStorageSync',
  'getLocation',
  'chooseLocation',
  'openLocation',
  'createMapContext',
  'getSystemInfo',
  'getSystemInfoSync',
  'getNetworkType',
  'onAccelerometerChange',
  'onCompassChange',
  'makePhoneCall',
  'scanCode',
  'showToast',
  'hideToast',
  'showModal',
  'showActionSheet',
  'setNavigationBarTitle',
  'showNavigationBarLoading',
  'hideNavigationBarLoading',
  'navigateTo',
  'redirectTo',
  'switchTab',
  'navigateBack',
  'createAnimation',
  'createCanvasContext',
  'createContext',
  'drawCanvas',
  'canvasToTempFilePath',
  'stopPullDownRefresh',
  'login',
  'checkSession',
  'getUserInfo',
  'requestPayment'
]

const groups = {
  'auth': [
    "checkSession", "getUserInfo", "login"
  ],
  'device': [
    "getNetworkType", "getSystemInfo", "getSystemInfoSync",
    "makePhoneCall", "onAccelerometerChange", "onCompassChange", "scanCode"
  ],
  'file': [
    "downloadFile", "getSavedFileInfo", "getSavedFileList", "openDocument",
    "removeSavedFile", "saveFile", "uploadFile"
  ],
  'geo' : [
    "chooseLocation", "createMapContext", "getLocation", "openLocation"
  ],
  'media': [
    "chooseImage", "chooseVideo", "createAudioContext", "createVideoContext",
    "getBackgroundAudioPlayerState", "getImageInfo", "onBackgroundAudioPause",
    "onBackgroundAudioPlay", "onBackgroundAudioStop", "pauseBackgroundAudio",
    "pauseVoice", "playBackgroundAudio", "playVoice", "previewImage",
    "seekBackgroundAudio", "startRecord", "stopBackgroundAudio",
    "stopRecord", "stopVoice"
  ],
  'net': [
    "closeSocket", "connectSocket", "onSocketClose", "onSocketError",
    "onSocketMessage", "onSocketOpen", "request", "sendSocketMessage"
  ],
  'payment': ["requestPayment"],
  'storage': [
    "clearStorage", "clearStorageSync", "getStorage", "getStorageInfo",
    "getStorageInfoSync", "getStorageSync", "removeStorage",
    "removeStorageSync", "setStorage", "setStorageSync"
  ],
  'ui': [
    "canvasToTempFilePath", "createAnimation", "createCanvasContext",
    "createContext", "drawCanvas", "hideNavigationBarLoading", "hideToast",
    "navigateBack", "navigateTo", "redirectTo", "setNavigationBarTitle",
    "showActionSheet", "showModal", "showNavigationBarLoading", "showToast",
    "stopPullDownRefresh", "switchTab"
  ]
}

const verbs = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace', 'connect']

describe('Wrapper', () => {
  describe('Standard', () => {
    let api
    beforeAll(() => api = weapp(wx))

    it('should be defined', () => {
      methods.forEach(name => {
        expect(typeof api[name]).toBe('function')
      })

      verbs.forEach(verb => expect(typeof api.request[verb]).toBe('function'))
      expect(typeof api.requireAuth).toBe('function')
      expect(typeof api.Http).toBe('function')
    })
  })

  describe('Grouped', () => {

    const expectGrouped = (api) => () => {
      Object.keys(groups).forEach(g => {
        groups[g].forEach(name => {
          expect(typeof api[g][name]).toBe('function')
        })
      })

      verbs.forEach(verb => expect(typeof api.net.request[verb]).toBe('function'))
      expect(typeof api.auth.requireAuth).toBe('function')
      expect(typeof api.Http).toBe('function')
    }

    it('should be grouped if the 2nd argument is true', expectGrouped(weapp(wx, true)))
    it('should be grouped for weapp.group() call', expectGrouped(weapp.group(wx)))
  })

})
