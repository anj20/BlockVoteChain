import React from "react";
import Style from "./Card.module.css";

const Card = ({ candidateArray, giveVote }) => {
  return (
    <div className={Style.card}>
      {candidateArray.map((candidate, index) => (
        <div key={index} className={Style.card_box}>
          <div className={Style.image}>
            <img src={candidate[3]} width={80} height={100} alt="No image" />
          </div>
          <div className={Style.card_info}>
            <h2>
              {candidate[2]}# {candidate[0].toNumber()}
            </h2>
            <p>{candidate[1]}</p>
            <p>Address: {candidate[5].slice(0, 10)}...</p>
            <p className={Style.total}>Total Vote</p>
          </div>
          <div className={Style.card_vote}>
            <p>{candidate[4].toNumber()}</p>
          </div>
          <div className={Style.card_button}>
            <button
              onClick={() =>
                giveVote({ id: candidate[0].toNumber(), address: candidate[5] })
              }
            >
              Give Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
