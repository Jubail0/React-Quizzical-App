
import React from 'react'
import {nanoid} from 'nanoid'
import './index.css';
import StartPage from './startPage';

import Question from './questions';
export default function App() {
  const [questions ,setQuestions]=React.useState([])
  const[start,setStart]=React.useState(true)
  
 



  function getQuestions(){
   
  fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => setQuestions(data.results.map(item => ({
     id: nanoid(),
     questions : item.question , 
     option :shuffle([item.correct_answer , ...item.incorrect_answers]),
     checked : false,
     correctAns : "",
     correct : item.correct_answer,
     checkTheAnswer:false,
  

    }))))
    .catch(error => console.log(error))
  }
  
  console.log(questions)
const shuffle = (arr) => arr.sort(()=>0.5 - Math.random())



  React.useEffect(()=>{
    getQuestions();

  },[])

   function filtered(htmlstr){
 htmlstr = htmlstr.replaceAll("&#039;","'")
 htmlstr = htmlstr.replaceAll("&ndash;","_")
 htmlstr = htmlstr.replaceAll("&quot;","")
 htmlstr = htmlstr.replaceAll("&eacute;","")
 htmlstr = htmlstr.replaceAll("&rsquo;","'")
 return htmlstr
 }


function startQuiz (){
  setStart(false)
}

 return(
  <main>
    { start ?
    <div className='start-con'>
     <StartPage startQuiz ={startQuiz}/>
    </div>:
    <Question quizess={questions} setQuestion ={setQuestions} getQuestions ={getQuestions}  filtered ={filtered}/> 
     }
   </main>
    
  )
 }

