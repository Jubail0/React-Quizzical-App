import React from 'react'
import unescape from 'unescape'
import './index.css';

export default function Question({quizess,filtered , setQuestion , toggle,getQuestions }){
  const [gameOver , setGameOver]=React.useState(false)
  const[score, setScore]=React.useState(0)

  function handleClick(event){
   const{id , value}=event.target
   console.log(value)
    setQuestion(prevQuiz=> prevQuiz.map((item)=>{
      return item.id===id? {...item,correctAns: value,checked:!item.checked}:item
    }))
   
  }
  function checkAnswers(){
  setQuestion(prevQuiz => prevQuiz.map(quiz=>{
    quiz.checked = true
    return quiz.correctAns === quiz.correct? {...quiz, checkTheAnswer : true}:quiz
  }))
  setGameOver(true)
  quizess.map((item)=>{
    return item.correctAns === item.correct? setScore(score => score + 1) : score
   })
  
  
  }
 
    const display = quizess.map(quiz => {
    return(
        
        <div  key={quiz.id} className='question-con'>
        <h1 className='questions-heading'>{unescape(filtered(quiz.questions))}
        </h1> <div  className='options-container'>
         {quiz.option.map((option ,index)=>(
          <div>
          {gameOver?
          <button style={quiz.checkTheAnswer &&gameOver&&quiz.correctAns===option?{backgroundColor:"#94D7A2"}: 
           !quiz.checkTheAnswer&&quiz.correctAns===option?{backgroundColor:"#EA5C2B"}:
           option===quiz.correct?{backgroundColor:"#94D7A2"}:
          {backgroundColor:"white", pointerEvents:'none' , opacity:"50%"}}
          key={index} className='answers'
           id={quiz.id} 
           value ={option}
            onClick={handleClick} >
            {unescape(filtered(option))}</button>:

              <button style={ {backgroundColor :quiz.checked&&quiz.correctAns===option? "#D6DBF5" : "white"}} key={index} className='answers' id={quiz.id} value ={option} onClick={handleClick} >
              {unescape(filtered(option))}</button>   }
        
 </div>
         ))
         }</div>
        <hr/></div>  
          )})

       function playAgain(){
         setQuestion([])
         setGameOver(false)
         getQuestions()
         setScore(0)
       }

    return(
      <div className='main-con'>
      <div className='quiz-container'>
       {display}
       </div>
        
{gameOver?<button onClick={playAgain}   className='checkAnswer'>Play Again</button>:
<button onClick={checkAnswers} className='checkAnswer'>Check Answers</button>}
<h1>Score: {score} out of 5 questions</h1>
     </div>
    )
}