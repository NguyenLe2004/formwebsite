import React, { useRef, useState }  from "react";
import "./body.css"
import DisplaySubmitedQuestion from "./displaySubmitedQuestion";
import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

export default function Body() {
    const [questionBlockIsOpen, setQuestionBlockIsOpen] = useState(false);
    const [iconPlusIsClick, setIconPlusIsClick] = useState(false);
    const [questionInput, setQuestionInput] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [displayQuestion, setDisplayQuestion] = useState([]);
    const iconPlusRef = useRef(null);
    const questionLabelRef = useRef(null);

    const iconPlusClick = () => {
        setQuestionBlockIsOpen(!questionBlockIsOpen);
        setIconPlusIsClick(!iconPlusIsClick);
        iconPlusRef.current.classList.toggle("clicked"); 
    }

    const removeQuestion = (index) => {
        setDisplayQuestion((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions.splice(index, 1);
          return updatedQuestions;
        });
      };

    const submitQuestion = (event) =>{
        event.preventDefault();
        setQuestionInput(questionInput.replace(/\s+$/, ''));
        setAnswer1(answer1.replace(/\s+$/, ''));
        setAnswer1(answer2.replace(/\s+$/, ''));
        setAnswer1(answer3.replace(/\s+$/, ''));
        setAnswer1(answer4.replace(/\s+$/, ''));

        if (questionInput === "") {
            alert("Please enter question");
            return;
        }
        if (answer1 === "" && answer2 === "" && answer3 === "" && answer4 === "") {
            alert("Please enter answer options");
            return;
        }
        setDisplayQuestion( 
            [...displayQuestion,
             <DisplaySubmitedQuestion 
                question={questionInput} 
                answer1 = {answer1}
                answer2 = {answer2}
                answer3 = {answer3}
                answer4 = {answer4}
                onRemove={() => removeQuestion(displayQuestion.length)}
             />]);
        setQuestionInput("");
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setAnswer4("");

        setTimeout(() => {
            const questionLabel = document.getElementById("formQuestionLabel");
            questionLabel?.scrollIntoView({ behavior: 'smooth', block: 'center'}); 
        }, 50);
    }
    return (
        <>
            {displayQuestion.map((componentProps,index) =>(
                   <div key={index}> 
                        <FontAwesomeIcon icon={faXmark} onClick={() => removeQuestion(index)} className="closeIcon" />
                        {componentProps} 
                   </div>
                   
            ))}
            <div id="questionBlock" >
                <FontAwesomeIcon icon={faCirclePlus} ref={iconPlusRef}
                    className={`plusIcon ${iconPlusIsClick ? 'clicked' : ''}`} 
                    onClick={iconPlusClick}
                />
                <CSSTransition 
                    in = {questionBlockIsOpen}
                    timeout={700}
                    classNames="questionBlock-transition"
                    unmountOnExit
                >
                    <div className="questionBlock"> 
                        <Form className="mainForm">
                            <Form.Group >
                                <Form.Label ref={questionLabelRef} className="formTitle"  id="formQuestionLabel"> Create your own question </Form.Label>
                                <Form.Control placeholder="Enter question here..." className="questionInput"
                                    value={questionInput.replace(/^\s+/, '')}
                                    onChange={(event)=>setQuestionInput(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="row answerGroup">
                                <Form.Control value= {answer1}  onChange={(event)=>setAnswer1(event.target.value)} className="answerBox" placeholder="Enter option here..."/>
                                <Form.Control value= {answer2}  onChange={(event)=>setAnswer2(event.target.value)} className="answerBox" placeholder="Enter option here..."/>
                                <Form.Control value= {answer3}  onChange={(event)=>setAnswer3(event.target.value)} className="answerBox" placeholder="Enter option here..."/>
                                <Form.Control value= {answer4}  onChange={(event)=>setAnswer4(event.target.value)} className="answerBox" placeholder="Enter option here...."/>
                            </Form.Group>
                            <Button variant="outline-danger"  onClick={submitQuestion} type="submit" className="submitBtn" >Submit question</Button>
                        </Form>
                    </div>
                </CSSTransition>
            </div>
            
        </>
    );
}