const RelatedSection = ({ title, data, fields }) => {
    console.log("RelatedSection data:", data);  // Debugging line

    if (!Array.isArray(data) || data.length === 0) {
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
                        <li key={index}>
                            {fields.map((field, idx) => (
                                <div key={idx}>
                                    <strong>{field.label}: </strong>
                                    {item[field.key] || "N/A"} {/* Display data or fallback to "N/A" */}
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};




export default RelatedSection;