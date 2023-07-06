//Internal Import
import Style from "../Card/Card.module.css";
import voterCardStyle from "./VoterCard.module.css";
import Image from "next/image";

const VoterCard = ({ voterArray }) => {
  return (
    <div className={Style.card}>
      {voterArray.map((voter, index) => (
        <div key={index} className={Style.card_box}>
          <div className={Style.image}>
            <img src={voter[2]} width={80} height={100} alt="no Image" />
          </div>
          <div className={Style.card_info}>
            <h2>
              {voter[1]} #{voter[0].toNumber()}
            </h2>
            <p>Address: {voter[7].slice(0, 20)}...</p>
            <p>details</p>
            <p className={voterCardStyle.vote_Status}>
              {voter[5] ? "Already Voted" : "Not Voted"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
