/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  setStorage: 'controller.storage.set',
  getStorage: 'controller.storage.get',
  setOpacity: 'controller.web.setOpacity',
};

export { ipcApiRoute };
