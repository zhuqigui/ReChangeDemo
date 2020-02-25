'use strict';
exports.main = async (event, context) => {
 const {
 	username,
 	password
 } = event;
 
 let userInfo = {
 	username
 };
 
 const userInDB = await db.collection('user').where({
 	username,
 	password: encryptPassword$1(password)
 }).get();
 
 let tokenSecret = crypto.randomBytes(16).toString('hex'),
 	token = jwtSimple.encode(userInfo, tokenSecret);
 let userUpdateResult;
 if (userInDB.data && userInDB.data.length === 0) {
 	return {
 		code: -1,
 		msg: '用户名或密码不正确'
 	}
 } else {
 	userUpdateResult = await db.collection('user').doc(userInDB.data[0]._id).update({
 		tokenSecret,
 		exp: Date.now() + tokenExp$1
 	});
 }
 
 if (userUpdateResult.id || userUpdateResult.affectedDocs === 1) {
 	return {
 		code: 0,
 		token,
 		username,
 		msg: '登录成功'
 	}
 }
 
 return {
 	code: -1,
 	msg: '登录失败'
 }
};
