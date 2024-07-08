import React, { useRef, useEffect } from 'react';
import './RaffleForm.css'

const RaffleForm = () => {
  const formRef = useRef(null);
  const msgRef = useRef(null);

  const scriptURL = 'https://script.google.com/macros/s/1_hTzbx0vPlE7JDnknnrh9ytvmD-R09aZSwj9iPHl94M1jfscA-rSf_lS/exec';

  useEffect(() => {
    const form = formRef.current;
    const msg = msgRef.current;

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          msg.innerHTML = "Message sent!";
          setTimeout(() => {
            msg.innerHTML = " ";
          }, 5000);
          form.reset();
        })
        .catch(error => console.error('Error!', error.message));
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <div className="raffle">
        
        <form name="submit-to-google-sheet" ref={formRef}>
            <h1>Raffle Sign-Up!</h1>
            <p> Fill out the form below for a chance to win free merch!</p>
            <input type="text" name="Name" placeholder="Name" required />
            <input type="text" name="Email" placeholder="Email" required />
            <input type="text" name="Instagram" placeholder="Instagram" required />
            <button type="submit" className="btn">Submit</button>
            <span id="msg" ref={msgRef}></span>
    </form>
    </div>
   
  );
};

export default RaffleForm;
