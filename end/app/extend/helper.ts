// 公共方法
'use strict';
// const md5 = Crypto.createHash('md5');
import np from 'named-placeholders';

module.exports = {
  // getMd5(text) {
  //   return md5.update(text, 'utf-8').digest('hex');
  // },
  getUuid() {
    // const model = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    const model = 'xxxxxxxxxxxxxxxx';
    return model.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  },
  isNumericValue(type: string) {
    const list = [
      'tinyint',
      'int',
      'bigint',
      'smallint',
      'double',
      'float',
      'decimal',
    ];
    return list.includes(type);
  },
  isPeriod(type: string) {
    const list = ['datetime', 'timestamp'];
    return list.includes(type);
  },
  formatSql(sqlStr, params) {
    const toUnnamed = np();
    const [sql, param] = toUnnamed(sqlStr, params);
    return {
      sql,
      param,
    };
  },
  toJsonString(obj) {
    const res = {};
    Object.keys(obj).forEach((key) => {
      if (
        ['[object Object]', '[object Array]'].includes(
          Object.prototype.toString.call(obj[key]),
        )
      ) {
        res[key] = JSON.stringify(obj[key]);
      } else {
        res[key] = obj[key];
      }
    });
    return res;
  },
  toJsonObj(obj) {
    if (!obj) return null;
    const res = {};
    Object.keys(obj).forEach((key) => {
      try {
        res[key] = JSON.parse(obj[key]);
      } catch (e) {
        res[key] = obj[key];
      }
    });
    return res;
  },
};
