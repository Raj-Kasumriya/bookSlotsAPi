const mongoose = require('mongoose');

const InternalUrl = process.env.InternalUrl

mongoose.connect(InternalUrl).then(() => {

    console.log("connect database");

}).catch((err) => {

    console.log(err);

})
