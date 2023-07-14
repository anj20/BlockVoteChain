import { useContext, useEffect } from "react";

import VoterCard from "@components/VoterCard/VoterCard";
import Styled from "../styles/voterList.module.css";
import { VotingContext } from "../../context/Voter";
import Style from "@/styles/index.module.css";

const voterList = () => {
  const { getAllVoterData, voterArray } = useContext(VotingContext);
  useEffect(() => {
    getAllVoterData();
  }, [voterArray]);
  return (
    <div className={Styled.voterList}>
      <div className={Style.title}>Voters</div>
      {voterArray ? (
        <VoterCard voterArray={voterArray} />
      ) : (
        <p>Loading voter data...</p>
      )}
    </div>
  );
};

export default voterList;
