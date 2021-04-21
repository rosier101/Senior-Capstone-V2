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
              title = 'Kim Kardashian'
              //path='/analysis'
            />
            <ProfileItems
              src='images/TheRock.jpg'
              text='The Rock - Zoa Energy Drink'
              label='Pressional Wrestler & Actor'
              title = 'The Rock'
              //path='/'
            />
          </ul>
          <ul className='profile__items'>
            <ProfileItems
              src='images/Ronaldo.jpg'
              text='Cristiano Ronaldo - Portugal Team'
              label='Professional Soccer Player'
              title = "Cristiano Ronaldo"
              //path='/'
            />
            <ProfileItems
              src='images/Kylie.jpg'
              text='Kylie Jenner - Kylie Cosmetics'
              label='Social Media Influncer'
              title = "Kylie Jenner"
              //path='/'
            />
            <ProfileItems
              src='images/Elon.jpg'
              text='Elon Musk - Tesla'
              label='CEO'
              title = "Elon Musk"
              //path='/'
            />
            <ProfileItems
              src='images/Jeffree.jpg'
              text='Jeffree Star - Jeffree Star Cosmetics'
              label='Beauty Guru'
              title = "Jeffree Star"
              //path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profile;
