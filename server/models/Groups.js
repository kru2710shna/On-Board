import mongoose from 'mongoose';
const { Schema } = mongoose;

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;
