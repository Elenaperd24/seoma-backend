const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, 
    {useUnifiedTopology: true, 
     useNewUrlParser: true
    })

.then(()=>console.log("db is conected"))
.catch((error=>console.error(error)))