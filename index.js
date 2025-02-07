const express = require('express')
const app = express()
const port = 3000
const mongoose=require("mongoose");
const C_Division=require("./models/info.js");
const Email=require("./models/emu.js");
const Ward=require("./models/atten.js");
app.set('view engine', 'ejs');
app.use('/static',express.static('static'));
app.use(express.urlencoded());
let a=0;
let show= "";
async function hey(){
    await mongoose.connect("mongodb+srv://chandrayanpaul27:chandrayan%402006@cluster0.7ik3i.mongodb.net/sies");
  }
  hey();

app.get('/', async (req, res) => { 
    return res.render('index');
 });



app.get('/cdiv', async (req, res) => {
    try {
        const datas = await C_Division.find().sort({rollNo:1}); // Fetch all documents from c_division
        if (datas.length === 0) {
            console.log('No data found');
        } else {
            // console.log('Fetched Data:', datas[0]);
            show  = false;
            console.log(datas.length);
            for(let i=0;i<datas.length;i++){
                if (isNaN(datas[i].sgpi)) {
                    datas[i].sgpi=0;
                    a=datas[i].sgpi;
                }
            }
            datas[7].sgpi=0 ;
            return res.render('cdiv', { datas ,sgpi: datas[a].sgpi, errorMessage: null, show });
        }
    } catch (err) {
        console.log("Error fetching data:", err);
    }
});

app.get('/form', (req, res) => {
    return res.render('form');
});

app.post('/form', async (req, res) => {
    try {
        const student = new C_Division(req.body);
        await student.save();
        res.send('Student data saved successfully!');
    } catch (error) {
        res.status(500).send('Error saving student data.');
    }
});


app.get('/pers',  (req, res) => {
    return res.render('pers', { datas: null });
});

app.post('/cdiv', async (req, res) => {
    console.log(req.body.formType);
    if(req.body.formType === 'form1'){
       if(req.body.FilterBy === 'Name'){
        console.log()
       if(typeof req.body.parameter != 'string'){
        return res.render('cdiv',  {datas:[], errorMessage: 'Please enter a valid name' });
        }
       else{
        try {
            const datas = await C_Division.find({name: { $regex: req.body.parameter , $options: 'i' } }).sort({rollNo:1}); // Fetch all documents from c_division
            if (datas.length === 0) {
                console.log('No data found');
                return res.render('cdiv',  {datas:[], errorMessage: 'No data found' });
            } else {
                console.log('Fetched Data:', datas[0].name);
                console.log(datas.length);
                // for(let i=0;i<datas.length;i++){
                //     if (isNaN(datas[i].sgpi)) {
                //         datas[i].sgpi=0;
                //         a=datas[i].sgpi;
                //     }
                // }
                show = true;
                return res.render('cdiv', { datas, errorMessage: null, show });
            }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }
    }
    else if(req.body.FilterBy === 'Rollno'){
        console.log(typeof req.body.parameter);
        if(isNaN(parseInt(req.body.parameter))){
            return res.render('cdiv',  {datas:[], errorMessage: 'Please enter a valid roll number' });
        }
        else{
        try {
            const datas = await C_Division.find({rollNo: req.body.parameter }); // Fetch all documents from c_division
            if (datas.length === 0) {
                console.log('No data found');
                return res.render('cdiv',  {datas:[], errorMessage: 'No data found' });
            } else {
                console.log('Fetched Data:', datas[0].name);
                console.log(datas.length);
                // for(let i=0;i<datas.length;i++){
                //     if (isNaN(datas[i].sgpi)) {
                //         datas[i].sgpi=0;
                //         a=datas[i].sgpi;
                //     }
                // }
                show = true
                return res.render('cdiv', { datas, errorMessage: null, show });
            }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }
    }
    else if(req.body.FilterBy === 'SGPI >'){
        console.log(typeof req.body.parameter);
        if( isNaN(parseInt(req.body.parameter))){
            return res.render('cdiv',  {datas:[], errorMessage: 'Please enter a valid SGPI' });
        }
        else{
        try {
            const datas = await C_Division.find({sgpi: { $gt: req.body.parameter }  }).sort({sgpi:1}); // Fetch all documents from c_division    
            if (datas.length === 0) {
                console.log('No data found');
                return res.render('index',  {datas:[], errorMessage: 'No data found' });
            } else {
                console.log(Object.keys(datas[0]));
                console.log('Fetched Data:', datas[0].name);
                console.log(datas.length);
                // for(let i=0;i<datas.length;i++){
                //     if (isNaN(datas[i].sgpi)) {
                //         datas[i].sgpi=0;
                //         a=datas[i].sgpi;
                //     }
                // }
                show =true
                return res.render('cdiv', { datas, errorMessage: null, show });
            }  
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }
   
    }
    else if(req.body.FilterBy === 'SGPI ='){
        console.log(typeof req.body.parameter);
        if( isNaN(parseInt(req.body.parameter))){
            return res.render('cdiv',  {datas:[], errorMessage: 'Please enter a valid SGPI' });
        }
        else{
        try {
            const datas = await C_Division.find({sgpi:  req.body.parameter   }).sort({sgpi:1}); // Fetch all documents from c_division    
            if (datas.length === 0) {
                console.log('No data found');
                return res.render('cdiv',  {datas:[], errorMessage: 'No data found' });
            } else {
                console.log(Object.keys(datas[0]));
                console.log('Fetched Data:', datas[0].name);
                console.log(datas.length);
                // for(let i=0;i<datas.length;i++){
                //     if (isNaN(datas[i].sgpi)) {
                //         datas[i].sgpi=0;
                //         a=datas[i].sgpi;
                //     }
                // }
                show =true
                return res.render('cdiv', { datas, errorMessage: null , show });
            }  
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    }
   
    }
    
  }
  else if(req.body.formType === 'form2'){
     console.log(req.body.sturoll);
    console.log(typeof req.body.sturoll);
    const email=await Email.find({roll_no: parseInt(req.body.sturoll)});
    const atten=await Ward.find({roll_no: parseInt(req.body.sturoll)});
    console.log(atten[0].attendance['HWM'].percentage);
    //console.log(typeof email);
    //console.log(Object.keys(email[0]));

    //console.log(console.log(email[0]._doc.email_id));
    const data = await C_Division.find({name: req.body.stuname });
    //console.log(data);
    return res.render('pers', { email: email[0]._doc.email_id , data, atten  });
  }
    
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})