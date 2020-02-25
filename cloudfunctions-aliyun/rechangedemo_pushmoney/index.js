'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
 //先查询用户是否存在
 const phone=event.phone;//"12345678911"//
 const pushmoney=event.money;//5;
 var totalmoney=0;
 //const phone="zhuqg";
 const userInDB = await db.collection('rechangedemo_user').where({
 	phone:phone
 }).get();
 //
 //console.log(userInDB)
 if (userInDB.data && userInDB.data.length === 0) {
	 //console.log("用户名不存在，不能更新钱包...");
 	return {
 		code: -1,
 		msg: '用户名不存在，不能更新钱包'
 	}
 }
 //const collection = db.collection('wallet')
 //先查询出钱包余额
 const docList = await db.collection('wallet').where({
 	phone:phone
 }).get();
 console.log("docList=="+docList)
 var money=docList.data[0].money;
 totalmoney=pushmoney+money;
 console.log("money=="+money+",totalmoney=="+totalmoney);
 //余额和充值金额相加赋值给余额
 //更新钱包信息，返回总金额
var data={"phone":phone,"money":totalmoney }
 // await db.collection('wallet').add(event)
 const res = await db.collection('wallet').doc(docList.data[0]._id).update(data);
 if (res.updated === 1) {
   let result = Object.assign({}, {
     _id: docList.data[0]._id
   }, data)
   //console.log("集合第一条数据由${JSON.stringify(docList.data[0])}修改为${JSON.stringify(result)}...");
   return {
     status: 0,
     msg: `充值成功，总金额为`+totalmoney
   }
 } else {
   return {
     status: -1,
     msg: `集合unicloud-test内没有数据`
   }
 }
};
