'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('rechangedemo_user')
  //event为客户端上传的参数
  console.log('event : ' + event)
  var phone=event.phone;//"15889428164";//event.phone;//
  var password=event.password;//"123456"
  	//console.log("phone=="+phone);
  const userData = await collection.where({
  	phone:phone
  }).get();
  console.log("userData.data=="+userData.data+",userData.data.length=="+userData.data.length);
  if (userData.data && userData.data.length=== 0) {
  	 //console.log("用户名不存在，不能更新钱包...");
  	return {
  		code: -1,
  		msg: '用户名不存在，不能正确登录'
  	}
  }
  //获取密码
  console.log("userData.data[0].password=="+userData.data[0].password);
  if(password != userData.data[0].password){
	  return {
	  	code: -1,
	  	msg: '密码错误，请重新输入'
	  }
  }
  //返回数据给客户端
  return {
  		code: 0,
  		msg: '登录成功'
  	}
};
