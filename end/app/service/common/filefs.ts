// // 上传文件
// const Service = require('egg').Service;
// const fs = require('fs');
// const Crypto = require('crypto');

// class FilefsService extends Service {
//     async putFile({file, filePath}) {
//         const {app, ctx} = this;
//         const filefsConfig = app['config']['filefs'];
//         let {baseUrl, appKey, appSecret} = filefsConfig;
//         let method = 'POST';
//         let contentMd5 = await ctx.helper.caculateFileMd5(file);
//         let contentType = '';
//         let date = new Date().toGMTString();
//         let resourcePrefix = '/v2/file/putFile';
//         let fileId = `/${appKey}${filePath.indexOf('/') === 0 ? '' : '/'}${filePath}`;
//         let resource = `${resourcePrefix}${fileId}`;
//         let resourceParamString = [method, contentMd5, contentType, date, resource].join('\n');
//         app.logger.info('resourceParamString', resourceParamString);
//         let hmacSha1 = Crypto.createHmac('sha1', appSecret);
//         let signature = hmacSha1.update(new Buffer(resourceParamString, 'utf8')).digest('base64');
//         app.logger.info('signature', signature);
//         let anthorization = `filefs ${appKey}:${signature}`;
//         let headers = {
//             'content-md5': contentMd5,
//             date,
//             anthorization
//         };
//         app.logger.info('headers', headers);
//         let result = await ctx.curl(`${baseUrl}${resource}`, {
//             method,
//             dataType: 'json',
//             headers,
//             stream: fs.createReadStream(file)
//         });
//         app.logger.info('result', result);
//         let data = result['data'] || {};
//         if (result['status'] !== 200 || result['code'] !== 0) {
//             return {
//                 code: data['code'] || -100,
//                 msg: data['msg'] || 'network error'
//             };
//         }
//         return Object.assign({fileId}, data);
//     }
// }

// module.exports = FilefsService;
