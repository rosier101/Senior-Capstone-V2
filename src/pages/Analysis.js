import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import PostData from '../data/posts.json';
import '../styles/Analysis.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Graphs from "../components/Graphs";


export default function Analysis() {
    
const { title } = useParams();
const profiles = PostData.filter(profiles => profiles.title === title);
  
    return (
      <div class="">
        
        {<Navbar/>}
               {profiles.map(pr => (
                    <div key={pr.id}>
                        
                        <img class = "banner" src = {pr.banner}/>
                        <h1 class = "celebName">{pr.title}</h1>
                        <p class = "description">{pr.content}</p>
                        <a class = "handle" href= {pr.handlelink}>{pr.handle}</a>
                        <p class = "disclaimer">{pr.disclaimer}</p>
                        <img class = "celebPic" src = {pr.img}/>
                        

                        {/* <div>
                        <img class = "mood" src = "/images/positive.jpg" alt = "smiley"/>
                        </div> */}
                        {<Graphs/>} 
                         
                    </div>
                ))}
                
            </div>
        )
    
}

