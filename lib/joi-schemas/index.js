const JoiValidator = (validationSchema) => {
    return (req, res, next) => {
      const data = req.body;
      const { error } = validationSchema.validate(data);
      if (error) {
        return res.status(400).json({
          status: "failure",
          message: error.details.map((err) => {
            if(err.context.label) return err.context.label
            else return err.message
          }).join(", "),
        })
      }
      next();
    };
  };

module.exports = JoiValidator;