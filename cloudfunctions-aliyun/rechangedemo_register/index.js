'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event+",event.username!=null &&=="+event.username
		// 		+",event.password=="+event.password);
	//console.log("event=="+event);
	if(event.phone!=null && event.password!=null){
		//插入数据库
		const collection = db.collection('rechangedemo_user')
		const res = await collection.add(event)
		return {
			code: 0,
			msg: '注册成功'
		}
	}
  //返回数据给客户端
  return {
  	code: -1,
  	msg: '注册失败'
  }
};
