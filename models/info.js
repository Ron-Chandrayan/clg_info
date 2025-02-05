const mongoose=require("mongoose");
const cDivisionSchema = new mongoose.Schema({
    rollNo: Number,
    seatNo: Number,
    name: String,
    subjects: {
        applied_mathematics: {
            ese: Number,
            ise: Number,
            mse: Number,
            total: Number
        },
        applied_physics: {
            ese: Number,
            ise: Number,
            mse: Number,
            total: Number
        },
        beee: {
            ese: Number,
            ise: Number,
            mse: Number,
            total: Number
        },
        c_programming: {
            ese: Number,
            ise: Number,
            mse: Number,
            total: Number
        },
        amrd: {
            ese: Number,
            ise: Number,
            mse: Number,
            total: Number
        },
        lab: {
            applied_physics_lab: Number,
            beee_lab: Number,
            cp_lab: Number,
            amrd_lab: Number
        }
    },
    additional_courses: {
        workshop: {
            grade: String,
            grade_points: Number,
            credits: Number
        },
        health_wellness: {
            grade: String,
            grade_points: Number,
            credits: Number
        },
        universal_human_values: {
            grade: String,
            grade_points: Number,
            credits: Number
        }
    },
    total_marks: Number,
    result: String,
    sgpi: Number
});

const C_Division = mongoose.model('C_Division', cDivisionSchema);
module.exports=C_Division;