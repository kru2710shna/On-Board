import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
    const navigate = useNavigate(); // Initialize the hook

    const handleGetStarted = () => {
        // Redirect to login or signup page
        navigate('/login');  // Redirect to login or use '/signup' as needed
    };

    return (


        <div>
            {/* Hero Section */}
            <section section className="hero-section d-flex align-items-center justify-content-center bg-primary text-white text-center py-5" >
                <div>
                    <h1>Shape Your Career Path</h1>
                    <p>Helping college students prepare for their careers with personalized job matching, alumni networking, and project showcases.</p>
                    <button className="btn btn-light btn-lg mt-3" onClick={handleGetStarted}  >Get Started</button>
                </div>
            </section>


            {/* Features Section */}
            <section section className="features-section container py-5" >
                <div className="row text-center">
                    <div className="col-md-4">
                        <i className="fas fa-user fa-3x mb-3"></i>
                        <h3>Set Up Your Profile</h3>
                        <p>Build your profile, share your experiences, and highlight your skills.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fas fa-briefcase fa-3x mb-3"></i>
                        <h3>Job Matching</h3>
                        <p>Find jobs tailored to your skills and aspirations from sources like Indeed.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fas fa-users fa-3x mb-3"></i>
                        <h3>Alumni Network</h3>
                        <p>Connect with alumni whose careers align with your goals.</p>
                    </div>
                </div>
            </section>


            {/* Testimonials Section */}
            <section section className="testimonials-section bg-light py-5" >
                <div className="container">
                    <h2 className="text-center mb-5">Success Stories</h2>
                    <div className="row text-center">
                        <div className="col-md-6">
                            <blockquote className="blockquote">
                                <p>"This platform helped me connect with an alumnus who works at my dream company!"</p>
                                <footer className="blockquote-footer">John Doe, Software Engineer</footer>
                            </blockquote>
                        </div>
                        <div className="col-md-6">
                            <blockquote className="blockquote">
                                <p>"The personalized job matching led me to a role that aligns perfectly with my career goals."</p>
                                <footer className="blockquote-footer">Jane Smith, Data Scientist</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section section className="cta-section text-center py-5 bg-secondary text-white" >
                <h2>Ready to Launch Your Career?</h2>
                
            </section>


            {/* Footer Section */}
            <footer footer className="footer py-4 bg-dark text-white text-center" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            
                            <a href="/contact" className="text-white me-3">Contact</a>
                            <a href="/terms" className="text-white">Terms & Privacy</a>
                        </div>
                        <div className="col-md-6">
                            <a href="https://github.com/your-profile" className="text-white me-3">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://linkedin.com/your-profile" className="text-white">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
                </footer>

        </div >
    );
}
