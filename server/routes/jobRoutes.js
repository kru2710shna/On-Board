import express from 'express';  // ES module import
import { body, validationResult } from 'express-validator'; // ES module import
import fetchUser from '../middlewares/fetchUser.js'; // ES module import
import Jobs from '../models/Jobs.js'; 

const router = express.Router();  // Initialize the router here

// ROUTE -1 Get All the Jobs: GET "/api/jobs/fetchalljobs" Login required
router.get('/fetchalljobs', fetchUser, async (req, res) => {
    try {
        const users = await Jobs.find({ user: req.user.id })
        res.json(users)
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
        body('jobCompany', 'Company must be a displayed').isLength({ min: 5 })
    ]
], async (req, res) => {

    const { jobCompany, jobDescription, jobSalary, jobTitle, jobType } = req.body

    if (req.userType !== 'Company') {
        return res.status(403).send("Not authorized to create jobs.");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const job = new Jobs({
            jobCompany, jobDescription, jobSalary, jobTitle, jobType, user: req.user.id
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

// ROUTE -3 Update Jobs: PUT "/api/jobs/updatejob" Login required
router.put('/updatejob/:id', fetchUser, async (req, res) => {
    const { jobCompany, jobDescription, jobSalary, jobTitle, jobType } = req.body
    // Check user role before proceeding with update logic
    if (req.type !== 'Company' && req.type !== 'Recruiter') {
        return res.status(403).send("Not authorized to edit jobs.");
    }

    //Create A new Job
    const newJob = {}
    if (jobCompany) {
        newJob.jobCompany = jobCompany
    }
    if (jobDescription) {
        newJob.jobDescription = jobDescription
    }
    if (jobSalary) {
        newJob.jobSalary = jobSalary
    }
    if (jobTitle) {
        newJob.jobTitle = jobTitle
    }
    if (jobType) {
        newJob.jobType = jobType
    }


    let job = await Jobs.findById(req.params.id)
    if (!job) {
        return res.status(404).send("Job Not Found")
    }
    if (job.user.toString() !== req.user.id) {
        return res.status(401).send("Not Authorized")
    }
    job = await Jobs.findByIdAndUpdate(req.params.id, { $set: newJob }, { new: true })
    res.json({ job })

})

// ROUTE -4 Delete Jobs: DELETE "/api/jobs/deletejob" Login required
router.delete('/deletejob/:id', fetchUser, async (req, res) => {

    if (req.type !== 'Company') {
        return res.status(403).send("Not authorized to delete jobs.");
    }

    let job = await Jobs.findById(req.params.id)

    if (!job) {
        return res.status(404).send("Job Not Found")
    }

    // Allow deletion if user owns this Job
    if (job.user.toString() !== req.user.id) {
        return res.status(401).send("Not Authorized")
    }

    await Jobs.findByIdAndDelete(req.params.id)
    res.json({ "Success": "This Job is deleted" })

})

// Route to fetch all jobs applied by the user (display in user profile)
router.get('/profile', fetchUser, async (req, res) => {
    try {
        const appliedJobs = await Jobs.find({ applicants: req.user.id })
            .populate('user', 'jobCompany jobTitle')  // Optional: populate job details if needed
            .populate('applicants', 'name email');   // Optional: populate user details of the applicants

        if (appliedJobs.length === 0) {
            return res.status(404).json({ msg: "No jobs applied yet" });
        }

        res.json({ appliedJobs });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


export default router;
