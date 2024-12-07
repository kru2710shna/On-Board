import React from 'react';
import capitalize from '../utils/capitalize';
import '../Section.css';  // Corrected path to the CSS file

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
                    <div key={index} className="mb-4">
                        {fields.map((field, idx) => {
                            // Handle date formatting for startDate and endDate fields
                            if (field === 'startDate' || field === 'endDate') {
                                const formattedDate = item[field]
                                    ? new Date(item[field]).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                      })
                                    : 'N/A'; // Default for empty date fields

                                return (
                                    <p key={idx} className="mb-2">
                                        <strong>{capitalize(field)}:</strong> {formattedDate}
                                    </p>
                                );
                            }

                            // Handle non-date fields
                            return (
                                <p key={idx} className="mb-2">
                                    <strong>{capitalize(field)}:</strong> {item[field] || 'N/A'}
                                </p>
                            );
                        })}
                        {item.description && (
                            <p>
                                <strong>Description:</strong> {item.description || 'No description available'}
                            </p>
                        )}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section;
