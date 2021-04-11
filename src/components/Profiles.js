import React from 'react';
import '../styles/Profile.css';
import ProfileItems from '../components/ProfileItems';

function profile() {
  return (
    <div className='profile'>
      <h1>Choose A Profile</h1>
      <div className='profile__container'>
        <div className='profile__wrapper'>
          <ul className='profile__items'>
            <ProfileItems
              src='images/KimK.jpg'
              text='Kim Kardashian - Skims'
              label='Social Media Influncer'
              path='/analysis'
            />
            <ProfileItems
              src='images/TheRock.jpg'
              text='The Rock - Zoa Energy Drink'
              label='Pressional Wrestler & Actor'
              path='/'
            />
          </ul>
          <ul className='profile__items'>
            <ProfileItems
              src='images/Ronaldo.jpg'
              text='Cristiano Ronaldo - Portugal Team'
              label='Professional Soccer Player'
              path='/'
            />
            <ProfileItems
              src='images/Kylie.jpg'
              text='Kylie Jenner - Kylie Cosmetics'
              label='Social Media Influncer'
              path='/'
            />
            <ProfileItems
              src='images/Elon.jpg'
              text='Elon Musk - Tesla'
              label='CEO'
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profile;
