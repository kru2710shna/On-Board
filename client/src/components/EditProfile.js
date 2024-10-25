import React, { useState } from 'react';

const EditProfile = ({ user, onSave }) => {
    const [profilePhoto, setProfilePhoto] = useState(user.photoUrl || '');
    const [headlineBio, setHeadlineBio] = useState(user.bio || '');
    const [skills, setSkills] = useState(user.skills.join(', ') || '');
    
    // States for Experience, Education, and Classes
    const [experience, setExperience] = useState(user.experience || []);
    const [education, setEducation] = useState(user.education || []);

    // Handlers for updating experience and education
    const handleExperienceChange = (index, field, value) => {
        const updatedExperience = [...experience];
        updatedExperience[index][field] = value;
        setExperience(updatedExperience);
    };

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...education];
        updatedEducation[index][field] = value;
        setEducation(updatedEducation);
    };

    const handleClassChange = (eduIndex, classIndex, field, value) => {
        const updatedEducation = [...education];
        const updatedClasses = [...updatedEducation[eduIndex].classes];
        updatedClasses[classIndex][field] = value;
        updatedEducation[eduIndex].classes = updatedClasses;
        setEducation(updatedEducation);
    };

    // Add new experience, education, and classes entries
    const addExperience = () => setExperience([...experience, { position: '', company: '', startYear: '', endYear: '', highlights: [] }]);
    const addEducation = () => setEducation([...education, { degree: '', field: '', institution: '', startYear: '', endYear: '', classes: [] }]);
    const addClass = (eduIndex) => {
        const updatedEducation = [...education];
        
        // Ensure classes is initialized as an empty array if it doesn't exist
        if (!updatedEducation[eduIndex].classes) {
            updatedEducation[eduIndex].classes = [];
        }
        
        updatedEducation[eduIndex].classes = [...updatedEducation[eduIndex].classes, { className: '', classDescription: '', classGitHubUrl: '' }];
        setEducation(updatedEducation);
    };

    // Handle profile photo upload
    const handlePhotoUpload = (event) => {
        setProfilePhoto(URL.createObjectURL(event.target.files[0]));
    };

    // Handle skills input
    const handleSkillInput = (event) => {
        setSkills(event.target.value);
    };

    // Save updated profile
    const handleSave = () => {
        const updatedUser = {
            ...user,
            photoUrl: profilePhoto,
            bio: headlineBio,
            skills: skills.split(',').map(skill => skill.trim()),
            experience,
            education
        };
        onSave(updatedUser); // Update the profile in the parent component
    };

    return (
        <div className="container mt-5">
            {/* Profile Photo Section */}
            <div className="text-center mt-4">
                <h3>Profile Photo</h3>
                {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="rounded-circle" width="150" height="150" />
                ) : (
                    <div className="d-flex flex-column align-items-center">
                        <p>No photo uploaded yet</p>
                        <input type="file" onChange={handlePhotoUpload} className="form-control w-50" />
                    </div>
                )}
            </div>

            {/* Headline Bio Section */}
            <section className="mt-4">
                <h4>Headline Bio</h4>
                <input 
                    type="text" 
                    className="form-control" 
                    value={headlineBio} 
                    onChange={(e) => setHeadlineBio(e.target.value)} 
                    placeholder="Add a brief headline about yourself" 
                />
            </section>

            {/* Skills Section */}
            <section className="mt-4">
                <h4>Your Skills</h4>
                <textarea
                    className="form-control"
                    rows="4"
                    value={skills}
                    onChange={handleSkillInput}
                    placeholder="List your skills (comma-separated)"
                ></textarea>
            </section>

            {/* Experience Section */}
            <section className="mt-4">
                <h4>Your Experience</h4>
                {experience.map((exp, index) => (
                    <div key={index} className="mb-3">
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Position" 
                            value={exp.position} 
                            onChange={(e) => handleExperienceChange(index, 'position', e.target.value)} 
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Company" 
                            value={exp.company} 
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} 
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Start Year" 
                            value={exp.startYear} 
                            onChange={(e) => handleExperienceChange(index, 'startYear', e.target.value)} 
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="End Year" 
                            value={exp.endYear} 
                            onChange={(e) => handleExperienceChange(index, 'endYear', e.target.value)} 
                        />
                        <textarea
                            className="form-control mb-2"
                            rows="3"
                            placeholder="Highlights (comma-separated)"
                            value={exp.highlights.join(', ')}
                            onChange={(e) => handleExperienceChange(index, 'highlights', e.target.value.split(',').map(h => h.trim()))}
                        ></textarea>
                    </div>
                ))}
                <button className="btn btn-outline-primary" onClick={addExperience}>Add Experience</button>
            </section>

            {/* Education Section with Classes */}
            <section className="mt-4">
                <h4>Your Education</h4>
                {education.map((edu, eduIndex) => (
                    <div key={eduIndex} className="mb-3">
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Degree" 
                            value={edu.degree} 
                            onChange={(e) => handleEducationChange(eduIndex, 'degree', e.target.value)} 
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Field of Study" 
                            value={edu.field} 
                            onChange={(e) => handleEducationChange(eduIndex, 'field', e.target.value)} 
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Institution" 
                            value={edu.institution} 
                            onChange={(e) => handleEducationChange(eduIndex, 'institution', e.target.value)} 
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Start Year" 
                            value={edu.startYear} 
                            onChange={(e) => handleEducationChange(eduIndex, 'startYear', e.target.value)} 
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="End Year" 
                            value={edu.endYear} 
                            onChange={(e) => handleEducationChange(eduIndex, 'endYear', e.target.value)} 
                        />

                        {/* Classes Section */}
                        <h5>Classes</h5>
                        {edu.classes && edu.classes.map((classItem, classIndex) => (
                            <div key={classIndex} className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control mb-2" 
                                    placeholder="Class Name" 
                                    value={classItem.className} 
                                    onChange={(e) => handleClassChange(eduIndex, classIndex, 'className', e.target.value)} 
                                />
                                <textarea 
                                    className="form-control mb-2" 
                                    placeholder="Class Description" 
                                    value={classItem.classDescription} 
                                    onChange={(e) => handleClassChange(eduIndex, classIndex, 'classDescription', e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    className="form-control mb-2" 
                                    placeholder="GitHub URL (optional)" 
                                    value={classItem.classGitHubUrl} 
                                    onChange={(e) => handleClassChange(eduIndex, classIndex, 'classGitHubUrl', e.target.value)} 
                                />
                            </div>
                        ))}
                        <button className="btn btn-outline-secondary" onClick={() => addClass(eduIndex)}>Add Class</button>
                    </div>
                ))}
                <button className="btn btn-outline-primary" onClick={addEducation}>Add Education</button>
            </section>

            {/* Save Button */}
            <div className="text-center mt-5">
                <button className="btn btn-success" onClick={handleSave}>Save Profile</button>
            </div>
        </div>
    );
};

export default EditProfile;
