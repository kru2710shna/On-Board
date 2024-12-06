import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobsSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobSalary: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    jobRequirements: {
      type: String
    },
    jobType: {
      type: String,
    },
    jobCompany: {
      type: String,
    },
    applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }
);

// Create the Job model
const Job = mongoose.model('Job', jobsSchema);

// Export the model using ES module syntax
export default Job;
