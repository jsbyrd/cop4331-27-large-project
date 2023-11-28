import React, { useState } from 'react';
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';
import './CreateQuizPage.css';

const CreateQuizPage = () => {
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([
        {
            id: 1,
            text: "",
            answerChoices: [
                { id: 1, text: "", correct: false },
            ],
        },
    ]);

    const addQuestion = () => {
        setQuestions((prevQuestions) => [
            ...prevQuestions,
            {
                id: prevQuestions.length + 1,
                text: "",
                answerChoices: [{ id: 1, text: "", correct: false }],
            },
        ]);
    };

    const addAnswerChoice = (questionId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? {
                          ...question,
                          answerChoices:
                              question.answerChoices.length < 4
                                  ? [
                                        ...question.answerChoices,
                                        {
                                            id:
                                                question.answerChoices
                                                    .length + 1,
                                            text: "",
                                            correct: false,
                                        },
                                    ]
                                  : question.answerChoices,
                      }
                    : question
            )
        );
    };

    const handleQuizNameChange = (e) => {
        setQuizName(e.target.value);
    };

    const handleQuestionChange = (e, questionId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? { ...question, text: e.target.value }
                    : question
            )
        );
    };

    const handleAnswerChoiceChange = (e, questionId, choiceId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? {
                          ...question,
                          answerChoices: question.answerChoices.map(
                              (choice) =>
                                  choice.id === choiceId
                                      ? {
                                            ...choice,
                                            text: e.target.value,
                                        }
                                      : choice
                          ),
                      }
                    : question
            )
        );
    };

    const toggleCorrectAnswer = (questionId, choiceId) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === questionId
                    ? {
                          ...question,
                          answerChoices: question.answerChoices.map(
                              (choice) =>
                                  choice.id === choiceId
                                      ? {
                                            ...choice,
                                            correct: !choice.correct,
                                        }
                                      : { ...choice, correct: false }
                          ),
                      }
                    : question
            )
        );
    };

    return (
        <div>
            <MenuHeader />
            <div id="create-quiz-page-body">
                <p className="create-quiz-text">Create Quiz</p>

                <div className='quizNameCreation'>
                    <p>What do you want to name your quiz?</p>
                    <input
                        type="text"
                        id="quiz-name"
                        className='create-quiz-input-box'
                        placeholder="Wizard Facts Quiz"
                        value={quizName}
                        onChange={handleQuizNameChange}
                    />
                </div>

                {questions.map((question) => (
                    <div key={question.id} className="questionCreation">
                        <p className='question-number-text'>Question {question.id}</p>

                        <p className='enter-question-text'>Enter question:</p>
                        <input
                            type="text"
                            id={`question${question.id}`}
                            className='create-quiz-input-box'
                            placeholder={`Question ${question.id}`}
                            value={question.text}
                            onChange={(e) =>
                                handleQuestionChange(e, question.id)
                            }
                        />

                        {question.answerChoices.map((choice) => (
                            <div
                                key={choice.id}
                                id={`questionAnswerChoice${choice.id}`}
                            >
                                <p className='enter-answer-choice-text'>Enter in the answer choice:</p>
                                <input
                                    type="text"
                                    id={`question${question.id}answerChoice${choice.id}`}
                                    className='create-quiz-input-box'
                                    placeholder={`Answer Choice ${choice.id}`}
                                    value={choice.text}
                                    onChange={(e) =>
                                        handleAnswerChoiceChange(
                                            e,
                                            question.id,
                                            choice.id
                                        )
                                    }
                                />
                                <label className='correct-answer-label'>
                                    <input
                                        type="radio"
                                        name={`correctAnswer${question.id}`}
                                        checked={choice.correct}
                                        onChange={() =>
                                            toggleCorrectAnswer(
                                                question.id,
                                                choice.id
                                            )
                                        }
                                    />
                                    Correct Answer?
                                </label>
                            </div>
                        ))}

                        {question.answerChoices.length < 4 && (
                            <button
                                className="add-answer-choice"
                                onClick={() => addAnswerChoice(question.id)}
                            >
                                <p>Add another answer choice?</p>
                            </button>
                        )}
                    </div>
                ))}

                <button className="addQuestion" onClick={addQuestion}>
                    <p>Add another Question?</p>
                </button>

                <button className="create">
                    <p>Create Quiz!</p>
                </button>
            </div>
            <MenuFooter />
        </div>
    );
};

export default CreateQuizPage;
