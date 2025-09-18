const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    explanation: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
module.exports = Question;
