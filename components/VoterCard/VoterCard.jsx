//Internal Import
import Style from "../Card/Card.module.css";
import voterCardStyle from "./VoterCard.module.css";

const VoterCard = ({ voterArray }) => {
  return (
    <div className={Style.card}>
      {voterArray.map((voter, index) => (
        <div key={index} className={Style.card_box}>
          <div className={Style.image} style={{ height: "20rem" }}>
            <img src={voter[2]} alt="no Image" />
          </div>
          <div className={Style.card_info}>
            <div style={{ marginBottom: "2vh" }}>
              <h2>Name:{voter[1]}</h2>
              <p>Address:{voter[7].slice(0, 20)}...</p>
            </div>
            <p
              className={voterCardStyle.vote_Status}
              style={{
                backgroundColor: voter[5] ? "green" : "red",
                margin: "2vh",
              }}
            >
              {voter[5] ? "Already Voted" : "Not Voted"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterCard;
