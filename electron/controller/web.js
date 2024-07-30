"use strict";

const { Controller } = require("ee-core");
const Log = require("ee-core/log");
const CoreWindow = require("ee-core/electron/window");

/**
 * storage
 * @class
 */
class WebController extends Controller {
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
  setOpacity(args) {
    const mainWindow = CoreWindow.getMainWindow();
    mainWindow.setOpacity(args.value);
    Log.info(`[opacity set] ${args.value}`);
  }
}

WebController.toString = () => "[class WebController]";
module.exports = WebController;
