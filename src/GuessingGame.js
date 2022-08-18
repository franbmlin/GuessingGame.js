import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

function GuessingGame() {
    const [luckyNumber, luckyPick] = useState([]);
    const [currentGuess, setGuess] = useState('');
    const [numberOfGuesses, setNumber] = useState(0);
    const [messageHint, HintMessage] = useState('Start Guessing');

    useEffect(() => {
        let data = localStorage.getItem('numberOfGuesses');
        let dataTwo = localStorage.getItem('luckyNumber');
        if (data) {
            setNumber(JSON.parse(data))
        }
        if (dataTwo) {
            luckyPick(JSON.parse(dataTwo))
        }
    }, []);
 
    useEffect(() => {
        localStorage.setItem('luckyNumber', luckyNumber)
        localStorage.setItem('numberOfGuesses', numberOfGuesses)
    }, [luckyNumber, numberOfGuesses]);

    function newLuckyNumber() {
        luckyPick(Math.floor(Math.random() * 100) +1)
    }    

    useEffect(() => {
        window.addEventListener('onload', newLuckyNumber());
        
        return () => {
            window.removeEventListener('onload', newLuckyNumber);
        }
    }, [])

    function luckyGuess(event) {
        setNumber(numberOfGuesses + 1);
        setGuess(event.target.value);
        HintMessage(() => {
            if (currentGuess == luckyNumber) {
                return (
                    <p>You guessed the Lucky Number!</p>
                );
            } else if (currentGuess > luckyNumber) {
                return (
                    <p>Your guess is too high!</p>
                );        
            } else if (currentGuess < luckyNumber) {
                return (
                    <p>Your guess is too low!</p>
                );
            }
        })
            
    }

    return (
        <div>
            <h4>I am thinking of a number between 1 and 100.  Guess the Lucky Number!</h4>
            <p>You have made {numberOfGuesses} guesses.</p>
            <Form.Group>
                <Form.Control type="text" name="currentGuess" value={currentGuess} onChange={(e) => setGuess(e.target.value)} style={{width: '10rem', margin: '20px auto'}}></Form.Control>
                <br/>
                <Button className='btn btn-secondary' onClick={luckyGuess}>Guess</Button>
            </Form.Group>
            <br/>
            <br/>
            <Button className="btn btn-danger" onClick={() => {newLuckyNumber(); setNumber(0)}}>Reset</Button>
            <br/>
            <br/>
            <div>{messageHint}</div>
        </div>
    )
}

export default GuessingGame;
