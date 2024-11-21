import React from 'react';

const RelatedSection = ({ title, data, refKey }) => {
    if (!data || data.length === 0) {
        return (
            <div className="card mt-3">
                <div className="card-header bg-secondary text-white">
                    <h5>{title}</h5>
                </div>
                <div className="card-body">
                    <p className="text-muted">No {title.toLowerCase()} associated yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card mt-3">
            <div className="card-header bg-secondary text-white">
                <h5>{title}</h5>
            </div>
            <div className="card-body">
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item[refKey]}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RelatedSection;
