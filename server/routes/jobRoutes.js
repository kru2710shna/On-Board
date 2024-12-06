import express from 'express';  // ES module import
import { body, validationResult } from 'express-validator'; // ES module import
import fetchUser from '../middlewares/fetchUser.js'; // ES module import
import Jobs from '../models/Jobs.js';
import User from '../models/User.js';

const router = express.Router();  // Initialize the router here

// ROUTE -1 Get All the Jobs: GET "/api/jobs/fetchalljobs" Login required
router.get('/fetchalljobs', async (req, res) => {
    try {
        const jobs = await Jobs.find();
        if (jobs.length === 0) {
            return res.status(404).json({ msg: "No jobs available at the moment." });
        }
        res.json(jobs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE -2 Add Jobs: POST "/api/jobs/addjob" Login required
router.post('/addjob', fetchUser, [
    [
        body('jobTitle', 'Job must have a title').isLength({ min: 5 }),
        body('jobDescription', 'Description must be at least 10 characters').isLength({ min: 10 }),
        body('jobSalary', 'Salary must be a Value').isInt(),
        body('jobType', 'Job Type must be a added').isLength({ min: 5 }),
        body('jobCompany', 'Company must be a displayed').isLength({ min: 5 }),
        body('jobRequirements', 'Requirements must be a displayed').isLength({ min: 5 })
    ]
], async (req, res) => {

    const { jobCompany, jobDescription, jobSalary, jobTitle, jobType, jobRequirements } = req.body

    if (req.userType !== 'Company') {
        return res.status(403).send("Not authorized to create jobs.");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const job = new Jobs({
            jobCompany, jobDescription, jobSalary, jobTitle, jobRequirements, jobType, user: req.user.id
        })

        const savedjob = await job.save()
        res.json(savedjob)
    }
    // If Anything is WRONG Internally 
    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE -3 Update Jobs: PUT "/api/jobs/updatejob" Login requiredrouter.put('/updatejob/:id', fetchUser, async (req, res) => {
    router.put('/updatejob/:id', fetchUser, async (req, res) => {
        const { id } = req.params;
        const { jobCompany, jobDescription, jobRequirements, jobSalary, jobTitle, jobType } = req.body;
    
        if (req.userType !== 'Company' && req.userType !== 'Recruiter') {
            return res.status(403).send("Not authorized to edit jobs."); // Correct return usage
        }
    
        // Create new job data
        const newJob = {};
        if (jobCompany) newJob.jobCompany = jobCompany;
        if (jobDescription) newJob.jobDescription = jobDescription;
        if (jobSalary) newJob.jobSalary = jobSalary;
        if (jobTitle) newJob.jobTitle = jobTitle;
        if (jobType) newJob.jobType = jobType;
        if (jobRequirements) newJob.jobRequirements = jobRequirements;
    
        try {
            const job = await Jobs.findById(id);

            const updatedJob = await Jobs.findByIdAndUpdate(id, { $set: newJob }, { new: true });
            res.json({ job: updatedJob });
        } catch (error) {
            console.error("Error updating job:", error);
            res.status(500).send("Internal Server Error");
        }
    });



// ROUTE -4 Delete Jobs: DELETE "/api/jobs/deletejob" Login required
router.delete('/deletejob/:id', fetchUser, async (req, res) => {

    if (req.userType !== 'Company') {
        return res.status(403).send("Not authorized to delete jobs.");
    }

    let job = await Jobs.findById(req.params.id)

    await Jobs.findByIdAndDelete(req.params.id)
    res.json({ "Success": "This Job is deleted" })

})


// ROUTE -5 //  GET: /api/jobs/profile Route to fetch all jobs applied by the user (display in user profile) - Login User 
router.get('/profile', fetchUser, async (req, res) => {
    try {
        const appliedJobs = await Jobs.find({ applicants: req.user.id })
            .populate({ path: 'user', select: 'jobCompany jobTitle jobType' })
            .populate({ path: 'applicants', select: 'name email' });

        if (appliedJobs.length === 0) {
            return res.status(404).json({ msg: "No jobs applied yet" });
        }

        res.json({ appliedJobs });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE -6 POST: /applyjob/:id Apply for a Job: POST "/api/jobs/applyjob" Login required
router.post('/applyjob/:id', fetchUser, async (req, res) => {
    try {
        // Fetch job details
        let job = await Jobs.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        // Prevent companies from applying for jobs
        const user = await User.findById(req.user.id);
        if (!user || user.userType === 'company') {
            return res.status(403).json({ error: "Companies cannot apply for jobs." });
        }

        // Check if the user has already applied
        if (job.applicants.includes(req.user.id)) {
            return res.status(400).json({ error: "You have already applied for this job." });
        }

        // Add the user to the job's applicants list
        job.applicants.push(req.user.id);
        await job.save();

        // Add the job to the user's jobs list
        user.jobs.push({ jobId: job._id });
        await user.save();

        res.status(200).json({ success: true, message: "Successfully applied for the job.", jobId: job._id });
    } catch (error) {
        console.error("Error applying for job:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ROUTE -7 Fetch company profile: GET "/api/jobs/profile/:id" Login required
router.get('/profile/:id', async (req, res) => {
    try {
        const _id = req.params.id;

        // Fetch company details
        const company = await User.findById(_id);
        if (!company || company.userType !== 'company') {
            return res.status(404).json({ error: "Company not found or invalid type." });
        }

        // Fetch jobs posted by the company
        const jobs = await Job.find({ user: _id }).populate('applicants', 'name email');

        if (!jobs.length) {
            return res.status(200).json({ company: { name: company.name, bio: company.bio }, jobs: [] });
        }

        // Format response
        const formattedJobs = jobs.map(job => ({
            jobId: job._id,
            jobTitle: job.jobTitle,
            jobDescription: job.jobDescription,
            jobSalary: job.jobSalary,
            jobRequirements: job.jobRequirements,
            jobType: job.jobType,
            applicantsCount: job.applicants.length,
            applicants: job.applicants, // Optionally include applicant details
        }));

        res.status(200).json({
            company: {
                name: company.name,
                bio: company.bio,
            },
            jobs: formattedJobs,
        });
    } catch (error) {
        console.error("Error fetching company profile:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;
