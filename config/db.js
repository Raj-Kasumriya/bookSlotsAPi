const mongoose = require('mongoose');

const ExternalInternalUrl = process.env.ExternalInternalUrl

mongoose.connect(ExternalInternalUrl).then(() => {

    console.log("connect database");

}).catch((err) => {

    console.log(err);

})
