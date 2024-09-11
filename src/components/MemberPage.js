// src/components/MemberPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const MemberPage = () => {
  const { name } = useParams();

  const members = {
    'krushna-thakkar': {
      Name: 'Krushna thakkar',
      Role: 'Team Leader',
      bio: 'Krushna Thakkar is the Team Lead for the Job Portal Project. With extensive experience in managing software development teams, Krushna ensures the project stays on track and meets its milestones. He is responsible for guiding the team in all aspects of the development process, ensuring quality and timely delivery.',
      LinkedIn : '',
      School_Year: 'Senior',
      Major : 'Computer Science',
      School_ID: '921380626',
      details: `
        <h2>Skills</h2>
        <ul>
          <li>Project Management</li>
          <li>Full-Stack Development</li>
          <li>Machine Learning</li>
        </ul>
        <h2>Projects</h2>
        <p>Developed several complex systems in React, Flask, and TensorFlow.</p>
      `,
      contact: 'kthakkar2@sfsu.edu',
    },

    'khayal-dobaria': {
      fullName: 'Khayal Dobariya',
      Role: 'Front-End Developer',
      LinkedIn : '',
      Major : 'Computer Science',
      School_Year: 'Junior',
      bio: 'Khayal Dobaria is the frontend developer for the Job Portal Project. She is responsible for designing and implementing user-friendly interfaces, ensuring that the platform is easy to navigate and provides a great user experience.',
      details: `
        <h2>Skills</h2>
        <ul>
          <li>React</li>
          <li>JavaScript</li>
          <li>UI/UX Design</li>
        </ul>
        <h2>Projects</h2>
        <p>Worked on multiple front-end projects focusing on user experience.</p>
      `,
      contact: 'kdobaria@sfsu.edu',
    },

    // Add similar details for other members
    'shrey-kevadia': {
      fullName: 'Shrey Kevadia',
      bio: 'Shrey Kevadia manages the version control and repository for the Job Portal Project. He ensures that the codebase is well-structured, documented, and maintained.',
      LinkedIn : '',
      Major : 'Computer Science',
      School_Year: 'Junior',
      details: `
        <h2>Skills</h2>
        <ul>
          <li>Version Control</li>
          <li>CI/CD Pipelines</li>
          <li>Project Deployment</li>
        </ul>
        <h2>Projects</h2>
        <p>Expert in managing large-scale projects with multiple contributors.</p>
      `,
      contact: 'skevadia@sfsu.edu',
    },

    'chetas-parekh': {
      fullName: 'Chetas Parekh',
      bio: 'Chetas Parekh is the Scrum Master for the Job Portal Project. He facilitates daily stand-ups, sprints, and retrospective meetings to keep the team on track and aligned with project goals.',
      LinkedIn : '',
      Major : 'Computer Science',
      School_Year: 'Grad-Freshmen',
      details: `
        <h2>Skills</h2>
        <ul>
          <li>Team Management</li>
          <li>Task Prioritization</li>
          <li>Sprint Planning</li>
        </ul>
        <h2>Projects</h2>
        <p>Expert in Scrum practices, ensuring timely delivery of complex projects.</p>
      `,
      contact: 'chetas.parekh@example.com',
    },
    
    'jimmie': {
      fullName: 'Jimmie',
      bio: 'Jimmy is responsible for the backend development of the Job Portal Project, working closely with the team to ensure the stability and scalability of the platform.',
      LinkedIn : '',
      Major : 'Computer Science',
      School_Year: 'Senior',
      details: `
        <h2>Skills</h2>
        <ul>
          <li>API Development</li>
          <li>Database Management</li>
          <li>Backend Optimization</li>
        </ul>
        <h2>Projects</h2>
        <p>Built scalable back-end systems that handle millions of transactions.</p>
      `,
      contact: 'jimmy@example.com',
    },

    'justin': {
      fullName: 'Justin',
      bio: 'Justin Doi is a backend developer responsible for building the server-side logic for the Job Portal Project. He focuses on database management, API integration, and ensuring the smooth performance of backend services.',
      LinkedIn : '',
      Major : 'Computer Science',
      School_Year: 'Senior',
      details: `
        <h2>Skills</h2>
        <ul>
          <li>API Integration</li>
          <li>Cloud Services</li>
          <li>System Security</li>
        </ul>
        <h2>Projects</h2>
        <p>Worked on high-security projects ensuring reliable data transmission.</p>
      `,
      contact: 'justin@example.com',
    },

  };

  const member = members[name];

  if (!member) {
    return <h1>Member not found</h1>;
  }

  return (
    <div className="team-member">
      <img src={`path_to_member_image/${name}.jpg`} alt={member.fullName} />
      <h1>{member.fullName}</h1>
      <p>{member.bio}</p>
      <p>{member.LinkedIn}</p>
      <p>{member.Major}</p>
      <p>{member.School_ID}</p>
      <p>{member.School_Year}</p>
      <div dangerouslySetInnerHTML={{ __html: member.details }}></div>
      <p>{member.contact}</p>
    </div>
    
  );
};

export default MemberPage;
