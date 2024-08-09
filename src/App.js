import React, { useState } from "react";
import MyImage from "./Components/Images/Me.jpeg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    coding: false,
    design: false,
    marketing: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prev) => ({ ...prev, [name]: checked }));
  };

  const selectedInterests = Object.entries(interests)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  return (
    <main>
      <h1>Hi, I'm Bethwel</h1>
      <img alt="My profile pic" src={MyImage} />
      <h2>About Me</h2>
      <p>
        I'm a highly advanced language model, capable of understanding and
        responding to complex queries. With a vast knowledge base and a knack
        for creativity, I'm always ready to assist and provide valuable
        insights.
      </p>

      <div>
        <a href="https://github.com/Bethwel123">GitHub</a>
        <a href="https://linkedin.com/in/bethwel-langat-3b7b97312">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <fieldset>
          <legend>Select your interests:</legend>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={interests.coding}
              onChange={handleCheckboxChange}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="design"
              checked={interests.design}
              onChange={handleCheckboxChange}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              name="marketing"
              checked={interests.marketing}
              onChange={handleCheckboxChange}
            />
            Marketing
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <h3>Thank you for signing up, {name}!</h3>
          <p>Your email address is {email}.</p>
          {selectedInterests.length > 0 ? (
            <>
              <p>Your interests include:</p>
              <ul>
                {selectedInterests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>You did not select any interests.</p>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
