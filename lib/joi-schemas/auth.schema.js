const Joi = require("joi");
const { accStatusEnum } = require("../../utils/enum");

const forgotPassVal = Joi.object().keys({
    newPass: Joi.string().min(8).required().label('Password should be 8 characters')
});

const updatePassVal = Joi.object().keys({
    currentPass: Joi.string().min(8).optional().label('Password should be 8 characters'),
    newPass: Joi.string().min(8).required().label('Password should be 8 characters')
});

module.exports = {
    forgotPassVal,
    updatePassVal
}
