"use strict";

const { Controller } = require("ee-core");
const Log = require("ee-core/log");
const Services = require("ee-core/services");

/**
 * storage
 * @class
 */
class StorageController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * set
   * @param args 前端传的参数
   */
  async get(args) {
    Log.info(`[storage get] ${args.key}`);
    return await Services.get("storage").get(args.key);
  }

  /**
   * set
   * @param args 前端传的参数
   */
  async set(args) {
    await Services.get("storage").set(args.key, args.value);
    Log.info(`[storage set] ${args.key}: ${args.value}`);
  }
}

StorageController.toString = () => "[class StorageController]";
module.exports = StorageController;
