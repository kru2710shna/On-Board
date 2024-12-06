import React from 'react';

const Profile_Page_Company = ({ isDarkMode }) => {
    // Static company details
    const companyDetails = {
        companyLogo: 'https://via.placeholder.com/150', // Example logo
        companyName: 'Tech Solutions Inc.',
        companyDescription: 'A leading technology company specializing in innovative solutions.',
        companyWebsite: 'https://www.techsolutions.com',
        foundedYear: 2005,
    };

    return (
        <div className={isDarkMode ? 'bg-dark text-white p-4' : 'bg-light text-dark p-4'}>
            <div className="container">
                <h1 className="text-center mb-4">Company Profile</h1>
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4 text-center p-4">
                            <img
                                src={companyDetails.companyLogo}
                                alt={`${companyDetails.companyName} Logo`}
                                className="img-fluid rounded"
                                style={{ maxHeight: '150px' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="card-title">{companyDetails.companyName}</h2>
                                <p className="card-text">{companyDetails.companyDescription}</p>
                                <p className="card-text">
                                    <strong>Website:</strong>{' '}
                                    <a
                                        href={companyDetails.companyWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none"
                                    >
                                        {companyDetails.companyWebsite}
                                    </a>
                                </p>
                                <p className="card-text">
                                    <strong>Founded:</strong> {companyDetails.foundedYear}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile_Page_Company;
