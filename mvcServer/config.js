const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx552a0d4b18e3f9e7',

    // 微信小程序 App Secret
    appSecret: '1a2667e5a3c5528bfe34251fd561accb',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: '45.40.199.171',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'ruanwei',
        char: 'utf8'
    },

    cos: {
        /**
         * 区域
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-beijing1',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    // 其他配置 ...
    serverHost: 'www.2belief.com',
    tunnelServerUrl: 'https://tunnel.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
  // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.qcloud.com/capi
    qcloudAppId: '1257300696',
    qcloudSecretId: 'AKID6LLO3y6kraCwfngcw7RWkcaI8PYxIKLC',
    qcloudSecretKey: 'xiGfdtBIUdSDMHY35kDfPzTZuhgThG8w',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000
}

module.exports = CONF
