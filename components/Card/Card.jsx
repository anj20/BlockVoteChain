import React from "react";
import Style from "./Card.module.css";

const Card = ({ candidateArray, giveVote }) => {
  return (
    <div className={Style.card}>
      {candidateArray.map((candidate, index) => (
        <div key={index} className={Style.card_box}>
          <div className={Style.image} style={{ height: "20rem" }}>
            <img src={candidate[3]} alt="No image" />
          </div>
          <div className={Style.card_info}>
            <div style={{ marginBottom: "2.5vh" }}>
              <h2>Name:{candidate[2]}</h2>
              <p>Age:{candidate[1]}</p>
              <p>Address: {candidate[5].slice(0, 10)}...</p>
            </div>
            <p className={Style.total}>Total Vote</p>
            <p style={{ fontSize: "1.5rem" }}>{candidate[4].toNumber()}</p>
            <div className={Style.card_button}>
              <button
                onClick={() =>
                  giveVote({
                    id: candidate[0].toNumber(),
                    address: candidate[5],
                  })
                }
                style={{
                  backgroundColor: "#006400",
                  display: candidate[4].toNumber() ? "none" : "inline",
                }}
              >
                Give Vote
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
