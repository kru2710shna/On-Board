import mongoose from "mongoose";
const { Schema } = mongoose;

// Define a schema for the User model
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      //required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isPremiumUser: {
      type: Boolean,
      default: false,
    },
    trialStartTime: {
      type: Date,
      default: null,
    },
    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, default: null },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date, default: null },
      },
    ],
    classes: [
      {
        title: { type: String, required: true },
        description: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date, default: null },
      },
    ],
    certifications: [
      {
        title: { type: String, required: true },
        issuedBy: { type: String },
        issueDate: { type: Date, required: true },
        expirationDate: { type: Date, default: null },
      },
    ],
    awards: [
      {
        title: { type: String, required: true },
        issuedBy: { type: String },
        dateReceived: { type: Date, required: true },
        description: { type: String },
      },
    ],
    recommendations: [
      {
        recommenderName: { type: String, required: true },
        position: { type: String },
        relationship: { type: String },
        message: { type: String },
        dateGiven: { type: Date, required: true },
      },
    ],
    groups: [
      {
        groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
      },
    ],
    jobs: [
      {
        jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
      },
    ]
  },
  {
    timestamps: true,
  }
);

// Create the User model
const User = mongoose.model('User', userSchema);

User.createIndexes();

export default User;
