const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
        trim: true
    },
    task: {
        type: String,
        required: [true, 'Please add a task']
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    important: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
