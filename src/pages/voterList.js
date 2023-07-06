import { useState, useContext, useEffect } from "react";

import VoterCard from "@components/VoterCard/VoterCard";
import Styled from "../styles/VoterList.module.css";
import { VotingContext } from "../../context/Voter";
import Link from "next/link";
import Style from "@/styles/index.module.css";

const useCurrentTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return dateTime;
};

const voterList = () => {
  const {
    getAllVoterData,
    voterArray,
    currentAccount,
    candidateLength,
    voterLength,
  } = useContext(VotingContext);
  useEffect(() => {
    getAllVoterData();
  }, [voterArray]);
  const dateTime = useCurrentTime();
  const formattedDateTime = dateTime.toLocaleTimeString();
  return (
    <div className={Styled.voterList}>
      {currentAccount && (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
              <Link href={{ pathname: "/" }}>
                <p>
                  No Candidate: <span>{candidateLength}</span>
                </p>
              </Link>
            </div>
            <div className={Style.candidate_list}>
              <Link href={{ pathname: "/voterList" }}>
                <p>
                  No Voter: <span>{voterLength}</span>
                </p>
              </Link>
            </div>
          </div>
          <div className={Style.winner_message}>
            <small>
              <p>{formattedDateTime}</p>
            </small>
          </div>
        </div>
      )}
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
