import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "etherprev";
import axios from "axios";
import { useRouter } from "next/router";
// Internal Import
import { VotingAddress, VotingAbi } from "./constants";
const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(VotingAddress, VotingAbi, signerOrProvider);
};
const signer1 = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
    setError("Connection Failed while connecting to contract");
  }
};

export const VotingContext = React.createContext();
export const VotingProvider = ({ children }) => {
  const votingTitle = "Voting Title";
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState(0);
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);
  const [organizer, setOrganizer] = useState(null); // Organizer Address
  // -------------------End of Candidate Data

  const [error, setError] = useState("");
  const highestVote = [];

  // -------------Voter Section
  const pushVoter = [];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState(0);
  const [voterAddress, setVoterAddress] = useState([]);

  // -----------Connecting MetaMask
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return setError("Make sure you have metamask!");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        setError("Make sure you have metamask! && Connect to MetaMask,Reload");
      }
    } catch (error) {
      console.log(error);
      setError("Metamask Error, Reload");
    }
  };
  // --------------------Connect Wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return setError("Make sure you have metamask!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  // ---Upload Image to IPFS
  const uploadToIPFS = async (file) => {
    try {
      if (typeof file === "object") {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key:
              process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
            "Content-Type": `multipart/form-data`,
          },
        });
        const ipfsGateway = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        return ipfsGateway;
      } else {
        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: file,
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key:
              process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          },
        });
        const imh = `ipfs://${res.data.IpfsHash}`;
        return imh;
      }
    } catch (error) {
      console.log(error);
      setError("Error Uploading");
    }
  };

  const createVoter = async (formInput, fileUrl, router) => {
    try {
      const { name, address, position } = formInput;
      if (!name || !address || !position)
        return setError("Please Fill All Fields");

      // Connecting Smart Contract
      const contract = await signer1();
      const data = JSON.stringify({ name, address, position, image: fileUrl });
      const ipfsHash = await uploadToIPFS(data);
      const voter = await contract.voterRight(address, name, fileUrl, ipfsHash);
      voter.wait();
      router.push("/voterList");
    } catch (error) {
      console.log(error);
      setError("Voter Creation Failed");
    }
  };
  // -------------------- Get Voter List
  const getAllVoterData = async () => {
    try {
      const contract = await signer1();
      const voterListData = await contract.getVoterList();
      setVoterAddress(voterListData);
      // Voter List
      await Promise.all(
        voterListData.map(async (voter) => {
          const singleVoter = await contract.getVoterData(voter);
          pushVoter.push(singleVoter);
        })
      );
      const organizer = await contract.votingOrganizer();
      setOrganizer(organizer);
      const allVoterLength = await contract.getVoterLength();
      setVoterLength(allVoterLength.toNumber());
    } catch (error) {
      console.log(error);
      setError("Error Fetching Voter List");
    }
  };

  // -------Give Vote
  const giveVote = async (id) => {
    try {
      const candidateAddress = id.address;
      const candidateId = id.id;
      const contract = await signer1();

      // console.log(candidateAddress, candidateId);
      // console.log();
      const voterList = await contract.vote(candidateAddress, candidateId);
      voterList.wait();
      console.log(voterList);
    } catch (error) {
      console.log(error);
      setError("Error Giving Vote");
    }
  };

  // -------------------Candidate Section
  const setCandidate = async (candidateForm, fileUrl, router) => {
    try {
      const { name, address, age } = candidateForm;
      if (!name || !address || !age) return setError("Please Fill All Fields");

      // Connecting Smart Contract
      const contract = await signer1();

      const data = JSON.stringify({ name, address, image: fileUrl, age });

      const ipfsHash = await uploadToIPFS(data);
      const voter = await contract.setCandidate(
        address,
        age,
        name,
        fileUrl,
        ipfsHash
      );
      voter.wait();

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Candidate Creation Failed");
    }
  };

  // -------------------Get Candidate Data
  const getNewCandidate = async () => {
    try {
      const contract = await signer1();
      const allCandidate = await contract.getCandidate();
      await Promise.all(
        allCandidate.map(async (candidate) => {
          const singleCandidate = await contract.getCandidatedata(candidate);
          pushCandidate.push(singleCandidate);
          candidateIndex.push(singleCandidate.candidateId.toNumber());
        })
      );
      const organizer = await contract.votingOrganizer();
      setOrganizer(organizer);
      // Candidate Length
      const allCandidateLength = await contract.getCandidateLength();
      setCandidateLength(allCandidateLength.toNumber());
    } catch (error) {
      console.log(error);
      setError("Error Fetching Candidate List");
    }
  };

  // --------------------Get Winner Data
  const getWinner = async () => {
    try {
      const contract = await signer1();
      const winner = await contract.winner();
      return winner;
    } catch (error) {
      console.log(error);
      setError("Error Fetching Winner");
    }
  };

  return (
    <VotingContext.Provider
      value={{
        votingTitle,
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        createVoter,
        getAllVoterData,
        giveVote,
        setCandidate,
        getNewCandidate,
        getWinner,
        error,
        setError,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        candidateLength,
        candidateArray,
        organizer,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
