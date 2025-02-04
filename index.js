const express = require('express')
const app = express()
const port = 3000
const mongoose=require("mongoose");
const C_Division=require("./models/info.js");
app.set('view engine', 'ejs');
app.use('/static',express.static('static'));
app.use(express.urlencoded());
let a=0;
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
            for(let i=0;i<datas.length;i++){
                if (isNaN(datas[i].sgpi)) {
                    datas[i].sgpi=0;
                    a=datas[i].sgpi;
                }
            }
            datas[7].sgpi=0 ;
            return res.render('index', { datas ,sgpi: datas[a].sgpi, errorMessage: null });
        }
    } catch (err) {
        console.log("Error fetching data:", err);
    }
});

app.get('/pers',  (req, res) => {
    return res.render('pers', { datas: null });
});

app.post('/', async (req, res) => {
    console.log(req.body.formType);
    if(req.body.formType === 'form1'){
       if(req.body.FilterBy === 'Name'){
        console.log()
       if(typeof req.body.parameter != 'string'){
        return res.render('index',  {datas:[], errorMessage: 'Please enter a valid name' });
        }
       else{
        try {
            const datas = await C_Division.find({name: { $regex: req.body.parameter , $options: 'i' } }).sort({rollNo:1}); // Fetch all documents from c_division
            if (datas.length === 0) {
                console.log('No data found');
                return res.render('index',  {datas:[], errorMessage: 'No data found' });
            } else {
                console.log('Fetched Data:', datas[0].name);
                console.log(datas.length);
                // for(let i=0;i<datas.length;i++){
                //     if (isNaN(datas[i].sgpi)) {
                //         datas[i].sgpi=0;
                //         a=datas[i].sgpi;
                //     }
                // }
                return res.render('index', { datas, errorMessage: null });
            }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }
    }
    else if(req.body.FilterBy === 'Rollno'){
        console.log(typeof req.body.parameter);
        if(isNaN(parseInt(req.body.parameter))){
            return res.render('index',  {datas:[], errorMessage: 'Please enter a valid roll number' });
        }
        else{
        try {
            const datas = await C_Division.find({rollNo: req.body.parameter }); // Fetch all documents from c_division
            if (datas.length === 0) {
                console.log('No data found');
                return res.render('index',  {datas:[], errorMessage: 'No data found' });
            } else {
                console.log('Fetched Data:', datas[0].name);
                console.log(datas.length);
                // for(let i=0;i<datas.length;i++){
                //     if (isNaN(datas[i].sgpi)) {
                //         datas[i].sgpi=0;
                //         a=datas[i].sgpi;
                //     }
                // }
                return res.render('index', { datas, errorMessage: null });
            }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }
    }
    else if(req.body.FilterBy === 'SGPI'){
        console.log(typeof req.body.parameter);
        try {
            const datas = await C_Division.find({sgpi: { $gt: req.body.parameter }  }).sort({sgpi:-1}); // Fetch all documents from c_division    
            if (datas.length === 0) {
                console.log('No data found');
                return res.render('index',  {datas:[], errorMessage: 'No data found' });
            } else {
                console.log('Fetched Data:', datas[0].name);
                console.log(datas.length);
                // for(let i=0;i<datas.length;i++){
                //     if (isNaN(datas[i].sgpi)) {
                //         datas[i].sgpi=0;
                //         a=datas[i].sgpi;
                //     }
                // }
                return res.render('index', { datas, errorMessage: null });
            }  
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }
  }
  else if(req.body.formType === 'form2'){
    console.log(req.body.stuname);
    const data = await C_Division.find({name: req.body.stuname });
    console.log(data);
    return res.render('pers', { data });
  }
    
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})