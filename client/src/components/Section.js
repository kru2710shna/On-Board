import React from 'react';
import capitalize from '../utils/capitalize';

const Section = ({ title, data, fields }) => {
    if (!data || data.length === 0) {
        return (
            <div className="card mt-3">
                <div className="card-header bg-secondary text-white">
                    <h5>{title}</h5>
                </div>
                <div className="card-body">
                    <p className="text-muted">No {title.toLowerCase()} added yet.</p>
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
                {data.map((item, index) => (
                    <div key={index} className="mb-3">
                        {fields.map((field, idx) => (
                            <p key={idx}>
                                <strong>{capitalize(field)}:</strong> {item[field] || 'N/A'}
                            </p>
                        ))}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section;
