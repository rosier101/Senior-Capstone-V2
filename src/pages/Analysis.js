import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import PostData from '../data/posts.json';
import '../styles/ProfileDetail.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function Analysis() {
    
const { title } = useParams();
const profiles = PostData.filter(profiles => profiles.title === title);
  
    return (
      <div class="profile">
        
        {<Navbar/>}
               {profiles.map(pr => (
                    <div key={pr.id}>
                        
                        <h1 class = "celebName">{pr.title}</h1>
                        <p class = "description">{pr.content}</p>
                        <p class = "disclaimer">{pr.disclaimer}</p>
                        <img class = "celebPic" src = {pr.img}/>

                        <div>
                        <img class = "mood" src = "/images/positive.jpg" alt = "smiley"/>
                        </div>
                        
                         
                    </div>
                    
                ))}
                
            </div>
        )
    
}

