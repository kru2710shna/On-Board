import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RSVP = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { eventTitle } = location.state || { eventTitle: "an Event" };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        reference: "",
        kudos: "",
        foodPreference: "",
        tshirtSize: "",
        comments: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("RSVP Submitted:", formData);
        alert(`Your RSVP for "${eventTitle}" has been submitted!`);
        navigate("/Dashboard"); 
        
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">RSVP Form for {eventTitle}</h1>
            <form onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email and Reference */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email ID</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="reference" className="form-label">Reference (Optional)</label>
                    <input
                        type="text"
                        id="reference"
                        name="reference"
                        className="form-control"
                        value={formData.reference}
                        onChange={handleChange}
                    />
                </div>

                {/* Food Preference */}
                <div className="mb-3">
                    <label htmlFor="foodPreference" className="form-label">Food Preference</label>
                    <select
                        id="foodPreference"
                        name="foodPreference"
                        className="form-select"
                        value={formData.foodPreference}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Kosher or Halal">Kosher or Halal</option>
                    </select>
                </div>

                {/* T-Shirt Size */}
                <div className="mb-3">
                    <label htmlFor="tshirtSize" className="form-label">T-shirt Size</label>
                    <select
                        id="tshirtSize"
                        name="tshirtSize"
                        className="form-select"
                        value={formData.tshirtSize}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                        <option value="XXXL">XXXL</option>
                    </select>
                </div>

                {/* Comments */}
                <div className="mb-3">
                    <label htmlFor="comments" className="form-label">Comments</label>
                    <textarea
                        id="comments"
                        name="comments"
                        className="form-control"
                        value={formData.comments}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                    Submit RSVP
                </button>
            </form>
        </div>
    );
};

export default RSVP;
