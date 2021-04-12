import React, { Component } from 'react'
import { useParams } from "react-router-dom";
//import PostList from '../components/PostList';
//import ProfileDetail from '../components/ProfileDetail';
import PostData from '../data/posts.json';


export default function Analysis() {
const { title } = useParams();
  const profiles = PostData.filter(profiles => profiles.title === title);

  return (
    <div className="analysis">
      {profiles.map(pr => (
        <div key={pr.id}>
          <h2>{pr.title}</h2>
          <p>{pr.content}</p>
          <p>{pr.disclaimer}</p>
        </div>
      ))}
    </div>
  );
}


