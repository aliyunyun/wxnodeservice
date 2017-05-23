'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'startActivity', // 活动启动
    'ajax', // 接口请求（没有回调）
    'bindDevice', // 调起扫一扫，绑定设备
    'shareFriend', // 发送链接给好友
]);