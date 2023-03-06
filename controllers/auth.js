const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errorWrapper = require('../middlewares/errorWrapper');

const User = require('../models/User');

const { roleEnum } = require('../utils/common');

module.exports.signin = errorWrapper(async (req, res) => {
  try {
      const { email, password } = req.body;
      const user  = await User.findOne({ email, role: { $nin: [roleEnum.admin] } });

      if (!user) {
          return res.status(400).json({success: false, message: "User not found with that email"});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ "status": "error", "message": "Incorrect password" });
      }

      const userObj = user.toJSON()
      delete userObj.password;

      const payload = {
          user: {
            id: userObj._id,
            role: userObj.role
          }
      };
      req.user = userObj;
      return jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1 year' },
          async (err, token) => {
              if (err) throw err;
              res.status(200).json({
                success: true,
                message: "Login successfull",
                token,
                userData: userObj,
              });
          }
      );
    } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
    }
});

module.exports.adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const member  = await Member.findOne({ email, role: roleEnum.admin });

    if (!member) {
        return res.status(400).json({success: false, message: "Invalid admin email"});
    }

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
        return res.status(401).json({ "status": "error", "message": "Incorrect admin password" });
    }

    const payload = {
        user: {
          id: member._id,
          role: member.role
        }
    };
    req.user = {role: roleEnum.admin};
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1 year' },
        async (err, token) => {
            if (err) throw err;
            res.status(200).json({
              success: true,
              message: "Admin Login successfull",
              token,
            });
        }
    );
  } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
  }
};