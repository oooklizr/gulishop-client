//配置webpack的文件

module.exports = {
  lintOnSave: false,//禁用eslint

  devServer: {  //webpack配置代理
    proxy: {
      "/api": {
        //转发的目标服务器地址
        target: "http://182.92.128.115",
        // target: "http://123.57.205.78",
        // pathRewrite: {"^/api" : ""}//是否去掉/api，要看接口路径里面有没有api，如果有就不去掉
      }
    }
  }
}