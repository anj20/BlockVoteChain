import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

// Internal Import
import { VotingContext } from "../../context/Voter";
import Style from "./Navbar.module.css";
import { RxCrossCircled } from "react-icons/rx";

const Navbar = () => {
  const {
    connectWallet,
    currentAccount,
    error,
    setError,
    getWinner,
    checkIfWalletIsConnected,
  } = useContext(VotingContext);
  const [winner, setWinner] = useState("");
  const [display, setDisplay] = useState(false);
  useContext(VotingContext);
  const [openNav, setOpenNav] = useState(false);
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const openNavigation = () => {
    setOpenNav(!openNav);
  };
  const handleClick = async () => {
    const winner = await getWinner();
    winner.name == "" ? setWinner("No Winner") : setWinner(winner.name);
    setDisplay(!display);
  };

  return (
    <div className={Style.navbar}>
      {error === "" ? (
        ""
      ) : (
        <div className={Style.message__box}>
          <div className={Style.message_cross} onClick={() => setError("")}>
            <RxCrossCircled />
          </div>
          <div className={Style.message}>
            <p>{error}</p>
          </div>
        </div>
      )}
      <div className={Style.navbar_box}>
        <div className={Style.title}>
          <Link href={{ pathname: "/" }}>
            <img src="/loading.gif" alt="logo" width={80} height={80} />
          </Link>
        </div>
        <div>
          <button className={Style.button} onClick={() => handleClick()}>
            And the Winner is:
            {display ? <p>{winner}</p> : <></>}
          </button>
        </div>
        <div className={Style.connect}>
          {currentAccount ? (
            <div>
              <div className={Style.connect_flex}>
                <button onClick={() => openNavigation()}>
                  {currentAccount.slice(0, 10)}...
                </button>
                {currentAccount && (
                  <span>
                    {openNav ? (
                      <AiFillUnlock onClick={() => openNavigation()} />
                    ) : (
                      <AiFillLock onClick={() => openNavigation()} />
                    )}
                  </span>
                )}
              </div>
              {openNav && (
                <div className={Style.navigation}>
                  <p>
                    <Link href={{ pathname: "/" }}>Home</Link>
                  </p>
                  <p>
                    <Link href={{ pathname: "candidateRegistration" }}>
                      Candidate Registration
                    </Link>
                  </p>
                  <p>
                    <Link href={{ pathname: "allowedVoters" }}>
                      Voter Registration
                    </Link>
                  </p>
                  <p>
                    <Link href={{ pathname: "voterList" }}>Voter List</Link>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
