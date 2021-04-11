import React, { Component } from 'react'
import PostData from '../data/posts.json';
import '../styles/ProfileDetail.css';



export class ProfileDetail extends Component {
    render() {
        return (
            <div class = "profile">
            {PostData.map((postDetail, index)=>{
                return <div>
                    <h1 class = "celebName">{postDetail.title}</h1>
                    <p class = "description">{postDetail.content}</p>
                    <p class = "disclaimer">{postDetail.disclaimer}</p>
                    <img class = "celebPic" src = {postDetail.img}/>

                    <div>
                    <img class = "mood" src = "/images/positive.jpg" alt = "smiley"/>
                    </div>
                    </div>

                    
            })}
            </div>
        )
    }
}

export default ProfileDetail;
