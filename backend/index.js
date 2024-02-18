const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const rootRouter = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use('/api/v1', rootRouter);

app.listen(port, ()=>{
    console.log(`App is listening to the ${port}`)
})