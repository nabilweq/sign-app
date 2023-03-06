//const User = require('../models/User');

// module.exports.getMemberId = async () => {
//     const user = await User.findOne().sort({_id: -1})

//     if(user) {
//         const id = parseInt(member.memberId.split('-')[2]);
//         return String(id+1).padStart(3, "0");
//     } else {
//         return String(1).padStart(3, "0");
//     }
// };

module.exports.generatePassword = () =>{
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};