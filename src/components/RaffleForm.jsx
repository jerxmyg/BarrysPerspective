import React, { useRef, useEffect, useState } from 'react';
import './RaffleForm.css';

const RaffleForm = () => {
  const formRef = useRef(null);
  const msgRef = useRef(null);
  const [message, setMessage] = useState('');

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyoXneZKzI1nHo8HZY4P3-1LM59xduwI_4vo8tYTu7HtPquFDoPW_WItUCKMP4efVTP/exec';

  useEffect(() => {
    const form = formRef.current;

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
      })
      .then(() => {
        setMessage('Message sent!');
        setTimeout(() => {
          setMessage('');
        }, 5000);
        form.reset();
      })
      .catch(() => {
        setMessage('Error sending message.');
      });
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, [scriptURL]);

  return (
    <div className="raffle">
      <form name="submit-to-google-sheet" ref={formRef}>
        <h1>Raffle Sign-Up!</h1>
        <p>Fill out the form below for a chance to win free merch!</p>
        <input type="text" name="Name" placeholder="Name" required />
        <input type="text" name="Email" placeholder="Email" required />
        <input type="text" name="Instagram" placeholder="Instagram" required />
        <button type="submit" className="btn">Submit</button>
        <span id="msg" ref={msgRef}>{message}</span>
      </form>
    </div>
  );
};

export default RaffleForm;