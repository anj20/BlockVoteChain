// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol"; 

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _votingId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;

// Candidate for Voting
    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }
    event CandidateCreate(
        uint256 indexed candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );
    address[] public candidateAddress;
    mapping(address => Candidate) public candidates; 

// Voter Data
    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        uint256 voter_allowed;
        string voter_ipfs;
        bool voter_voted;
        uint256 voter_vote;
        address voter_address;
    }
    event VoterCreated(
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        uint256 voter_allowed,
        string voter_ipfs,
        bool voter_voted,
        uint256 voter_vote,
        address voter_address
    ); 
    address[] public voterAddress;
    address[] public votedVoters;
    mapping(address => Voter) public voters;

    constructor() {
        votingOrganizer = msg.sender;
    }

/// Candidate Section--------------------
    function setCandidate(address _address,string memory _age,string memory _name,string memory _image,string memory _ipfs)public {
        require(msg.sender == votingOrganizer, "Only Voting Organizer can add Candidate");
        _candidateId.increment();
        uint256 candidateId = _candidateId.current();
        candidates[_address] = Candidate(candidateId,_age,_name,_image,0,_address,_ipfs);
        candidateAddress.push(_address);
        emit CandidateCreate(candidateId,_age,_name,_image,0,_address,_ipfs); 
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidatedata(address _address) public view returns (Candidate memory) {
        return candidates[_address];
    }


/// Voter Section--------------------
    function voterRight(address _address,string memory _name,string memory _image,string memory _ipfs) public {
        require(msg.sender == votingOrganizer, "Only Voting Organizer can add Voter");
        _votingId.increment();
        uint256 voterId = _votingId.current();
        require(voters[_address].voter_allowed == 0, "Voter already exist");
        voters[_address] = Voter(voterId,_name,_image,1,_ipfs,false,0,_address);
        voterAddress.push(_address);
        emit VoterCreated(voterId,_name,_image,1,_ipfs,false,0,_address);
    }
    function vote(address _candidateAddress,uint256 _candidateVoteId) public {
        require(voters[msg.sender].voter_allowed == 1, "You are not allowed to vote");
        require(voters[msg.sender].voter_voted == false, "You already voted");
        require(candidates[_candidateAddress].candidateId == _candidateVoteId, "Candidate not found");
        voters[msg.sender].voter_voted = true;
        voters[msg.sender].voter_vote = _candidateVoteId;
        votedVoters.push(msg.sender);
        candidates[_candidateAddress].voteCount++;
    }
    function getVoterLength() public view returns (uint256) {
        return voterAddress.length;
    }
    function getVoterData(address _address) public view returns (Voter memory) {
        return voters[_address];
    }
    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }
    function getVoterList() public view returns (address[] memory) {
        return voterAddress;
    }


// ----------Winner Section ----------------
    function winner() public view returns (Candidate memory) {
        require(msg.sender == votingOrganizer, "Only Voting Organizer can see winner");
        require(candidateAddress.length > 0, "No Candidate Found");
        uint256 winnerVote = 0;
        address winnerAddress;
        for (uint256 i = 0; i < candidateAddress.length; i++) {
            if (candidates[candidateAddress[i]].voteCount > winnerVote) {
                winnerVote = candidates[candidateAddress[i]].voteCount;
                winnerAddress = candidateAddress[i];
            }
        }
        return candidates[winnerAddress];
    }
}
 