import {_saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
import { getInitialData } from "../utils/api";
import {addAnswer, newQuestion, receiveQuestions} from "./questions";
import { receiveUsers, newQuestionUser } from "./users";
import { setAuthedUser } from "./authedUser";


const AUTHED_ID = null; // should be set to null requiring login

export function handleInitialData(){
    return (dispatch) => {
        return getInitialData().then(({users, questions})=>{
            dispatch(receiveQuestions(questions));
            dispatch(receiveUsers(users));
            dispatch(setAuthedUser(AUTHED_ID));
        })
    }

}



export function handleAddAnswer(qid, answer){
     return (dispatch, getState) => {
        const { authedUser } = getState();
        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then(
                () =>
                    dispatch(addAnswer(authedUser, qid, answer)) &&
                    dispatch(newQuestionUser(authedUser, qid, answer))
            ) // Once this is done then add it to our own state
    }
}

export function addNewQuestion(optionOneText, optionTwoText){
      return (dispatch, getState) => {
        const { authedUser } = getState();
         return _saveQuestion({
              author: authedUser,
              optionOneText,
              optionTwoText,
         })
        .then(
            question => dispatch(newQuestion(question))
                        && dispatch(newQuestionUser(question))

        ) // Once this is done then add it to our own state
    }
}