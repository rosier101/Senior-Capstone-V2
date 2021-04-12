import React from 'react';
import { Link } from 'react-router-dom';

function ProfileItems({ title, src, text, label }) {
  console.log ({title});
  return (
    <>
      <li className='profile__item'>
        <Link className='profile__items__link' to={`/analysis/${title}`}>
          <figure className='profile__items__pic-wrap' data-category={label}>
            <img
              className='profile__items__img'
              alt='Profile Image'
              src={src}
            />
          </figure>
          <div className='profile__items__info'>
            <h5 className='profile__items__text'>{text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default ProfileItems;
