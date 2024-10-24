// src/components/MemberPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import members from './MemberData';

const MemberPage = () => {
  const { name } = useParams();
  const member = members[name];

  // Handle case where member is not found
  if (!member) {
    return <h1 className="text-center my-5">Member not found</h1>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12 text-center">
          {/* Member's name and role */}
          <h1 className="mb-3">{member.fullName || member.Name}</h1>
          <h3 className="text-muted mb-4">{member.Role}</h3>

          {/* Bio */}
          <p className="lead">{member.bio}</p>

          {/* LinkedIn if available */}
          {member.LinkedIn && (
            <p>
              <a href={member.LinkedIn} className="btn btn-primary my-3" target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </p>
          )}

          {/* Education details */}
          <div className="mb-4">
            <h4>Education</h4>
            <p>
              <strong>Major:</strong> {member.Major}
            </p>
            <p>
              <strong>Year:</strong> {member.School_Year}
            </p>
            {member.School_ID && (
              <p>
                <strong>School ID:</strong> {member.School_ID}
              </p>
            )}
          </div>

          {/* Member details (skills and projects) */}
          <div className="text-start">
            <div dangerouslySetInnerHTML={{ __html: member.details }} />
          </div>

          {/* Contact info */}
          <p className="mt-4">
            <strong>Contact: </strong>
            {member.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
