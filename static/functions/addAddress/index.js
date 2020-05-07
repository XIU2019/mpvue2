// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-a1vlk',
  traceUser: true
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var _id=event._id
  var addressCity = event.addressCity
  var address=event.address
  var phone=event.phone
  var username=event.userName
  try {
    return await db.collection('address').doc(_id)
      .update({
        data: {
          addressCity: addressCity,
          address: address,
          phone: phone,
          userName: username,
        },
      })
  } catch (e) {
    console.error(e)
  }

 
}