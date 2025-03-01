import React, { useState } from "react";
import './index.css'

const TicTacToe = () => {
  const [chance, setChance] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winnerMessage, setWinnerMessage] = useState("");
  const [buttons, setButtons] = useState(Array(9).fill(""));

  const changeChance = () => {
    setChance(chance === "X" ? "O" : "X");
  };

  const checkWin = (newButtons) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6],            
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newButtons[a] && newButtons[a] === newButtons[b] && newButtons[a] === newButtons[c]) {
        showWinner(newButtons[a]);
        return;
      }
    }

    if (newButtons.every(btn => btn !== "")) {
      showTie();
    }
  };

  const showWinner = (winner) => {
    setScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    setWinnerMessage(`${winner} Wins!`);

    setTimeout(() => {
      setWinnerMessage("");
      resetBoard();
    }, 2000);
  };

  const showTie = () => {
    setWinnerMessage("It's a Tie!");

    setTimeout(() => {
      setWinnerMessage("");
      resetBoard();
    }, 2000);
  };

  const resetBoard = () => {
    setButtons(Array(9).fill(""));
  };

  const handleClick = (index) => {
    if (buttons[index] === "" && !winnerMessage) {
      let newButtons = [...buttons];
      newButtons[index] = chance;
      setButtons(newButtons);

      setTimeout(() => {
        checkWin(newButtons);
      }, 10);

      changeChance();
    }
  };

  return (
    <div style={{ background: "#000", color: "#fff", textAlign: "center", minHeight: "100vh", paddingTop: "20px" }}>
      <h1 style={{ fontFamily: "Segoe UI", fontSize: "30px" }}>TicTacToe</h1>
      <p style={{ fontFamily: "Segoe UI", fontSize: "20px" }}>- By Siddhesh Umesh Sarang</p>
      
      <h2 style={{
        background: "#ccc",
        fontFamily: "Segoe UI",
        width: "140px",
        padding: "10px 20px",
        borderRadius: "20px",
        fontSize: "25px",
        textAlign: "center",
        margin: "30px auto",
        color: "#000",
        boxShadow : "2px 2px 100px #ccc"
      }}>
        X | {scores.X} - {scores.O} | O
      </h2>

      {winnerMessage && (
        <h2 style={{ fontFamily: "Segoe UI", fontSize: "26px", color: winnerMessage.includes("Tie") ? "yellow" : "green" }}>
          {winnerMessage}
        </h2>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "5px",
        width: "fit-content",
        margin: "50px auto"
      }}>
        {buttons.map((btn, index) => (
          <button key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              backgroundColor: btn ? "#518ff5" : "#72a4fc",
              color: btn === "X" ? "white" : "black",
              fontWeight: "500",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#72a4fc")}
            onMouseOut={(e) => (e.target.style.backgroundColor = btn ? "#518ff5" : "#72a4fc")}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
