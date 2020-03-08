'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
 //查询电池类型表返回给客户端
 const typeList = await db.collection('rechangedemo_battery_type').get();
 console.log("typeList=="+typeList)
 return {
   status: 0,
   msg: `获取类型成功`,
   data:typeList
 }
};
