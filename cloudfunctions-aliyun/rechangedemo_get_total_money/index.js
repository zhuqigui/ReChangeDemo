'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	var phone=event.phone;//"12345678911";
	console.log("phone=="+phone);
 const moneyData = await db.collection('rechangedemo_wallet').where({
 	phone:phone
 }).get();
 if (moneyData.data && moneyData.data.length === 0) {
 	 //console.log("用户名不存在，不能更新钱包...");
 	return {
 		code: -1,
 		msg: '用户名不存在，不能正常获取余额'
 	}
 }
 console.log("moneyData.data[0].money=="+moneyData.data[0].money);
 //return moneyData.data[0].money;
 return {
 	code: 0,
 	msg: '获取余额成功',
	money:moneyData.data[0].money
 }
};
