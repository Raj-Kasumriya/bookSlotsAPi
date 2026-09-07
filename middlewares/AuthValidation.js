const Joi = require('joi')

const signupValidation = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        lastName: Joi.string().min(3).max(100).required(),
        phone: Joi.string().min(10).max(10).required(),
        role: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),

    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }

    next();
}





const loginValidation = (req, res, next) => {

    const schema = Joi.object({
        password: Joi.string().min(4).max(100).required(),
        email: Joi.string().email(),
        phone: Joi.string().min(10).max(10),

    }).or('email', 'phone');

    const { error } = schema.validate(req.body);

    if (error) {

        return res.status(400)
            .json({ message: "Bad request", error })
    }

    next();
}



const meValidation = (req, res, next) => {

    const schema = Joi.object({

        jwtToken: Joi.string().required("jwtToken is required"),

    });

    const { error } = schema.validate(req.body);

    if (error) {

        return res.status(400)
            .json({ message: "Bad request", error })
    }

    next();

}


module.exports = {
    signupValidation,
    loginValidation,
    meValidation

}