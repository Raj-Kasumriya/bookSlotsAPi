const SWSUser = require("../models/users")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')


dotenv.config()
const Jwd_SECRET = process.env.Jwd_SECRET

const signup = async (req, res) => {

    try {
        const { name, lastName, phone, email, password, role } = req.body;

        const user = await SWSUser.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists. Please login.",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const currentT = new Date()

        const newUser = new SWSUser({
            name,
            email,
            lastName,
            phone,
            role,
            password: hashedPassword,
            createTime: currentT.toLocaleString(),
            tokenValid: "24h"

        });

        const jwtToken = jwt.sign(
            { email: newUser.email, _id: newUser._id },
            Jwd_SECRET,
            { expiresIn: "24h" },
        )

        newUser["jwtToken"] = jwtToken;
        await newUser.save();

        return res.status(201).json({
            message: "Signup successful",
            success: true,
            User: newUser
        });


    } catch (err) {


        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


const login = async (req, res) => {

    try {
        const { email, password, phone } = req.body;

        const emailOrPhone = email && phone;

        const user = await SWSUser.findOne({ emailOrPhone });
        const errorMess = "Auth failed email or phone and password id wrong"

        if (!user) {
            return res.status((409))
                .json({ message: errorMess, success: false })
        }


        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status((403))
                .json({ message: errorMess, success: false })
        }


        //console.log(user.jwtToken)


        const currentT = new Date()

        jwt.verify(user.jwtToken, Jwd_SECRET, (err,) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {

                    const newJwtToken = jwt.sign(
                        { email: user.email, _id: user._id },
                        Jwd_SECRET,
                        { expiresIn: "24h" },
                    )

                    user["jwtToken"] = newJwtToken;
                    user["createTime"] = currentT.toLocaleString();

                }
            }
        })

        // console.log(user.jwtToken)


        await user.save();

        // const jwtToken = jwt.sign(
        //     { email: user.email, _id: user._id },
        //     Jwd_SECRET,
        //     { expiresIn: "48h" },
        // )

        // const currentT = new Date()

        res.status(200).json({

            message: "Login successfully",
            success: true,
            User: user

        })


    } catch (err) {

        res.status(500).json({ message: "Internal server error", success: false })
    }

}




// const me = (req, res) => {


//     try {

//         const authHeader = req.headers['authorization'] || req.headers['Authorization'];


//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'Access Denied: No Token Provided' });
//         }



//         const token = authHeader.split(' ')[1];

//         //console.log(token)


//         const verifiedData = jwt.verify(token, Jwd_SECRET, (err) => {
//             console.log(err)
//             res.status(403).json(err)
//         });


//         // console.log(req.headers)

//     } catch (error) {
//         // If the token is expired or altered, return an error
//         return res.status(403).json({ message: 'Invalid or Expired Token' });
//     }
// };




module.exports = {
    signup,
    login,


}
