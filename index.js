const express = require('express')
const app = express()
const port = 3000
const mongoose=require("mongoose");
const C_Division=require("./models/info.js");
app.set('view engine', 'ejs');
app.use('/static',express.static('static'));
app.use(express.urlencoded());

async function hey(){
    await mongoose.connect("mongodb+srv://chandrayanpaul27:chandrayan%402006@cluster0.7ik3i.mongodb.net/sies");
  }
  hey();

app.get('/', async (req, res) => {
    try {
        const datas = await C_Division.find().sort({rollNo:1}); // Fetch all documents from c_division
        if (datas.length === 0) {
            console.log('No data found');
        } else {
            console.log('Fetched Data:', datas[0].name);
            console.log(datas.length);
            datas[7].sgpi=0 ;
            return res.render('index', { datas ,sgpi: datas[7].sgpi});
        }
    } catch (err) {
        console.log("Error fetching data:", err);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})