import React from 'react'
import './index.css';
export default function StartPage(props){
  
    return (
        <div className='start-page' >
        <h1 className='quizzical'>Quizzical</h1>
        <p className='description'>Some description if needed</p>
        <button onClick={props.startQuiz} className='start-btn'>Start quiz</button>
        </div>
    )
}