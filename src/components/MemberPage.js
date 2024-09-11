// src/components/MemberPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const MemberPage = () => {
  const { name } = useParams();

  const members = {
    'krushna-thakkar': {
      fullName: 'Krushna cnecejbc;ejhakkar',
      bio: 'Krushna Thakkar is the Team Lead for this project.',
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
    },
    'khayal-dobariya': {
      fullName: 'Khayal Dobariya',
      bio: 'Khayal is a Front-End developer with experience in React, Node, and JavaScript libraries.',
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
    },
    // Add similar details for other members
    'shrey-kevadia': {
      fullName: 'Shrey Kevadia',
      bio: 'Shrey is the GitHub Master who manages logs, branches, and repositories.',
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
    },
    'chetas-parekh': {
      fullName: 'Chetas Parekh',
      bio: 'Chetas manages tasks, people, and deadlines as the Scrum Manager.',
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
    },
    'jimmie': {
      fullName: 'Jimmie',
      bio: 'Jimmie is a Back-End Developer focused on creating reliable workflows.',
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
    },
    'justin': {
      fullName: 'Justin',
      bio: 'Justin is also a Back-End Developer focusing on API and system integrations.',
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
    },
  };

  const member = members[name];

  if (!member) {
    return <h1>Member not found</h1>;
  }

  return (
    <div className="member-page">
      <h1>{member.fullName}</h1>
      <p>{member.bio}</p>
      <div dangerouslySetInnerHTML={{ __html: member.details }}></div>
    </div>
  );
};

export default MemberPage;
