import React, { useState } from 'react';
import '../Application.css'; // Add custom styles
import { useNavigate } from 'react-router-dom';

const Application = ({ isDarkMode }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        resume: null,
        coverLetter: null,
        reference: '',
        disabilityStatus: '',
        disabilityDetails: '',
        agreeTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreeTerms) {
            alert('You must agree to the terms and conditions to proceed.');
            return;
        }
        // Handle form submission logic here
        console.log('Application Submitted:', formData);
        alert('Your application has been submitted successfully!');
        navigate('/jobs'); // Navigate directly to the /jobs route
    };

    return (
        <div className={`application-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <h1>Job Application</h1>
            <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                {/* Resume */}
                <div className="form-group">
                    <label htmlFor="resume">Resume</label>
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleChange}
                        required
                        accept=".pdf,.doc,.docx"
                    />
                </div>

                {/* Cover Letter */}
                <div className="form-group">
                    <label htmlFor="coverLetter">Cover Letter (Optional)</label>
                    <input
                        type="file"
                        id="coverLetter"
                        name="coverLetter"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx"
                    />
                </div>

                {/* Reference */}
                <div className="form-group">
                    <label htmlFor="reference">Reference</label>
                    <input
                        type="text"
                        id="reference"
                        name="reference"
                        value={formData.reference}
                        onChange={handleChange}
                        placeholder="Enter a reference"
                    />
                </div>

                {/* Disability Self-Identification */}
                <fieldset className="form-group">
                    <legend>Disability Self-Identification</legend>
                    <p className="disability-description">
                        The Disability Self-Identification section is an essential part of promoting workplace diversity and inclusion while ensuring compliance with the Americans with Disabilities Act (ADA) and Section 503 of the Rehabilitation Act. This section invites applicants to voluntarily disclose their disability status to help organizations understand and support the needs of a diverse workforce. Participation is entirely optional, and choosing not to disclose will not affect your application process or employment opportunities in any way.

You will typically be presented with three options: "Yes, I have a disability, or have had one in the past," "No, I do not have a disability," and "I prefer not to answer." To help clarify, examples of disabilities may be provided, including but not limited to blindness, deafness, autism spectrum disorder, cancer, diabetes, epilepsy, PTSD, major depression, and other physical or mental health conditions. These examples are intended to guide applicants in understanding whether they qualify under the provided definition of disability.

For those who wish to elaborate, an optional text box may be available to specify their condition or provide any additional information. However, this is not mandatory, and applicants can choose to leave it blank. All information submitted in this section is handled with the utmost confidentiality, securely stored, and used only for Equal Employment Opportunity (EEO) reporting or related purposes as required by law. It does not influence hiring decisions or workplace evaluations in any form.

By including this section, employers aim to create an environment that values and supports individuals with disabilities, fostering an inclusive workplace culture. For further clarity, there may be additional resources or tooltips explaining how this information is used and why it is collected. Applicants are encouraged to review these details and make an informed decision when completing this section.
                    </p>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="disabilityStatus"
                                value="Yes"
                                checked={formData.disabilityStatus === 'Yes'}
                                onChange={handleChange}
                                required
                            />
                            Yes, I have a disability, or have had one in the past
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="disabilityStatus"
                                value="No"
                                checked={formData.disabilityStatus === 'No'}
                                onChange={handleChange}
                                required
                            />
                            No, I do not have a disability
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="disabilityStatus"
                                value="Prefer not to answer"
                                checked={formData.disabilityStatus === 'Prefer not to answer'}
                                onChange={handleChange}
                                required
                            />
                            I prefer not to answer
                        </label>
                    </div>
                    {formData.disabilityStatus === 'Yes' && (
                        <textarea
                            name="disabilityDetails"
                            value={formData.disabilityDetails}
                            onChange={handleChange}
                            placeholder="Optional: Provide additional details about your disability"
                        ></textarea>
                    )}
                </fieldset>

                {/* Terms and Conditions */}
                <fieldset className="form-group">
                    <legend>Terms and Conditions</legend>
                    <p className="terms-description">
                        The Terms and Conditions outline the rules, responsibilities, and expectations associated with accessing and using the On-Board. By proceeding, you agree to comply with these terms and any applicable laws and regulations. These terms are designed to ensure a safe, transparent, and mutually beneficial experience for all users. Failure to adhere to these terms may result in the suspension or termination of your access to the service. Below is a detailed explanation of the terms.

The terms begin with user responsibilities, which emphasize the need for accurate information and lawful use of the platform. As a user, you must not engage in any activity that disrupts or harms the service or other users. Unauthorized access, data scraping, or tampering with the platform's integrity is strictly prohibited. You are expected to maintain the confidentiality of your login credentials and immediately report any unauthorized use of your account.

A critical part of the terms relates to privacy and data usage. We are committed to safeguarding your personal information, which is collected, stored, and used in accordance with our Privacy Policy. The data you provide helps us enhance our services and create a more personalized experience. However, by using the service, you acknowledge that certain non-identifiable data may be shared with third parties to improve system functionality or analytics. It is important to review the Privacy Policy for a comprehensive understanding of how your data is handled.

For services involving transactions, the payment and refund policies are outlined clearly. All payments must be made through approved methods, and users are encouraged to retain proof of transactions. Refund eligibility depends on the specific terms associated with the product or service purchased. If applicable, subscription cancellations should be initiated within the defined period to avoid additional charges.

Intellectual property rights protect all content provided by the platform, including text, images, software, and other materials. Users are prohibited from copying, reproducing, or distributing this content without explicit permission. Any user-generated content uploaded to the platform, such as reviews or feedback, grants us a non-exclusive license to use it for promotional or operational purposes.

The terms also include liability and disclaimers, which limit the company’s responsibility for damages resulting from the use or inability to use the service. While we strive to provide uninterrupted access and accurate information, the platform is offered "as is," and we cannot guarantee the complete absence of errors or technical issues.

The termination of service section explains that access may be revoked in cases of non-compliance with these terms. This includes fraudulent activities, violation of usage guidelines, or any action that compromises the platform’s safety or functionality. Users will be notified if such actions are being taken, except in cases requiring immediate suspension.

Finally, we reserve the right to amend these terms and conditions as necessary. Users will be notified of significant changes via email or in-platform notifications. It is your responsibility to stay updated on these changes and ensure continued compliance. For any questions or clarifications, you can reach us at [Email Address].

To proceed, users must acknowledge and agree to these terms by selecting the checkbox provided. This acknowledgment ensures that you understand and accept the responsibilities and guidelines outlined. The Terms and Conditions aim to create a fair and transparent environment, fostering trust between the service provider and its users.
                    </p>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                required
                            />
                            I agree to the Terms and Conditions
                        </label>
                    </div>
                </fieldset>

                {/* Submit Button */}
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Application;
