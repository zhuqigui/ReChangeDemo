'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ' + event+",event.facility_id=="+event.facility_id
  // 				+",event.hole_id=="+event.hole_id
  // 				+",event.second=="+event.second
  // 				+",event.money=="+event.money);
  const spendmoney=3;//event.money
  var totalmoney=0;
  const phone="12345678911";
	if(event.facility_id=='111111'){
		return {
			status: -1,
			msg: '此插槽正在使用中....'
		}
	}
	//插入数据库
	// const collection = db.collection('rechangedemo_order_list');
	// await collection.add(event)
	//调用云函数，查询总金额
	let callFunctionResult = await uniCloud.callFunction({
	    name: "rechangedemo_get_total_money",
	    data: { phone:phone }
	})
	console.log('callFunctionResult.result.money==',callFunctionResult.result.money);
	
	//更新总金额
	const docList = await db.collection('rechangedemo_wallet').where({
		phone:phone
	}).get();
	totalmoney=callFunctionResult.result.money-spendmoney;
	console.log("totalmoney=="+totalmoney);
	var data={"phone":phone,"money":totalmoney }
	 // await db.collection('wallet').add(event)
	const res = await db.collection('rechangedemo_wallet').doc(docList.data[0]._id).update(data);
	//console.log("res=="+res);
   // return {
   //   status: 0,
  	//  facility_id:event.facility_id,
  	//  hole_id:event.hole_id,
  	//  second:event.second,
  	//  money:event.money,
   //   msg: '成功提交一次订单'
   // }
   return totalmoney;
};
