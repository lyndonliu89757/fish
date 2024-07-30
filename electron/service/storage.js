"use strict";

const { Service } = require("ee-core");
// 框架提供的数据库对象
// ee-core:v2.0.1
const LocalStorage = require("ee-core/storage");

/**
 * 数据存储
 * @class
 */
class StorageService extends Service {
  constructor(ctx) {
    super(ctx);

    this.jsonDb = LocalStorage.connection("fish", {
      driver: "jsondb",
    });
  }

  async get(key) {
    return this.jsonDb.db.get(key);
  }

  async set(key, val) {
    this.jsonDb.db.set(key, val).write();
  }
}

StorageService.toString = () => "[class StorageService]";
module.exports = StorageService;
