import { Button } from "react-bootstrap"
import "./displaySubmitedQuestion.css"
export default function DisplaySubmitedQuestion(props) {
    console.log(props);
    const question = props.question;
    const answer1 = props.answer1;
    const answer2 = props.answer2;
    const answer3 = props.answer3;
    const answer4 = props.answer4;

    return (
        <div className="displayBlock">
            <h1 className="question"> {question +" ?"} </h1>
            <div className="answerGroup">
                <Button variant="danger" className="answerOption" disabled = {answer1===""}> {answer1} </Button>
                <Button variant="danger" className="answerOption" disabled = {answer2===""}> {answer2} </Button>
                <Button variant="danger" className="answerOption" disabled = {answer3===""}> {answer3} </Button>
                <Button variant="danger" className="answerOption" disabled = {answer4===""}> {answer4} </Button>
            </div>
        </div>
    )
}