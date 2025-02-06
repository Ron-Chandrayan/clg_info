const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Attendance sub-schema for each subject
const attendanceSchema = new Schema({
  lectures: { type: Number, required: true },
  percentage: { type: Number, required: true }
});

// Main schema for ward details
const wardSchema = new Schema({
  roll_no: { type: Number, required: true },
  name: { type: String, required: true },
  attendance: {
    AM: attendanceSchema,
    'AP/AC': attendanceSchema,
    BEE: attendanceSchema,
    AMRD: attendanceSchema,
    CP: attendanceSchema,
    'HWM': attendanceSchema,
    UHV: attendanceSchema,
    'AP/AC (Lectures)': attendanceSchema,
    'BEE (Lectures)': attendanceSchema,
    'CP (Lectures)': attendanceSchema,
    'AMRD - Workshop': attendanceSchema,
    Workshop: attendanceSchema
  }
}, { collection: 'attendance' });  // Specifying the collection name

// Create the model with the specified schema and collection
const Ward = mongoose.model('Ward', wardSchema);

module.exports = Ward;
