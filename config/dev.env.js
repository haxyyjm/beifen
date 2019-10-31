'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
module.exports = merge(prodEnv, {
  NODE_ENV : '"development"',//开发环境
  api_9101 : '"http://47.98.113.173:9107"',  //房价码的线下接口
  api_9102 : '"http://47.98.113.173:9107"',  //会员的线下接口
  api_9103 : '"http://47.98.113.173:9107"',  //codebase的线下接口
  api_9104 : '"http://47.98.113.173:9107"',  //客房服务的线下接口
  api_8002 : '"http://47.98.113.173:8002"',  //设备的线下接口
  api_9202 : '"http://47.98.113.173:9202"',  //房类的线下接口
  api_8091 : '"http://47.98.113.173:8091"',  //房间设置的线下接口
  api_9111 : '"http://47.98.113.173:9111"',  //
  api_9503 : '"http://47.98.113.173:9503"',  //森哥的所有线下接口
  api_9519 : '"http://47.98.113.173:9519"',   //登陆的线下接口http://47.98.113.173:9519/v1/common/employee/login
  api_8094 : '"http://47.98.113.173:8094"',  //支付宝支付的线下接口
  api_8082 : '"http://47.98.113.173:8082"',  //铁管家设置的线下接口
  api_9204: '"http://47.98.113.173:9204"'//新版本单=>dyl
  // api_9204: '"http://192.168.2.165:9005"'//新版本单=>dyl

});
