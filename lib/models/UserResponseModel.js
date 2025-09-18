import mongoose from "mongoose";

const UserResponseSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    responses: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        selectedOption: String,
        isCorrect: Boolean
    }],
    score: {
        type: Number,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const UserResponse = mongoose.models.UserResponse || mongoose.model('UserResponse', UserResponseSchema);
export default UserResponse;
