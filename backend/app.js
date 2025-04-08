const express = require("express");
const app = express();
const router = require("./router");

app.use(express.json());
app.use("/api/v1/", router);


const port = process.env.PORT || "3000";


app.listen(port, () => {
    console.log(`application listening on port: ${port}`);
});