const mongoose=require("mongoose");
const EmailSchema = new mongoose.Schema({
    email: String
});
const Email = mongoose.model('Email', EmailSchema);
module.exports=Email;