import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INternal Import
import { VotingContext } from "../../context/Voter";
import Style from "../styles/allowedVoter.module.css";
import Button from "@components/Button/Button";
import Input from "@components/Input/Input";

const candidateRegistration = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  });
  const router = useRouter();
  const {
    // uploadToIPFSCandidate,
    uploadToIPFS,
    setCandidate,
    candidateArray,
    getNewCandidate,
    organizer,
  } = useContext(VotingContext);
  useEffect(() => {
    getNewCandidate();
  }, []);
  // -------Voters Image Drop
  const onDrop = useCallback(async (acceptedFiles) => {
    const url = await uploadToIPFS(acceptedFiles[0]);
    setFileUrl(url);
  });
  // Prevents Unnecessary Rerender

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 500000000,
  });

  return (
    <div className={Style.createVoter}>
      <div>
        {fileUrl && (
          <div className={Style.voterInfo}>
            <img src={fileUrl} alt="voter Image" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name:<span>{candidateForm.name} </span>
              </p>
              <p>
                Address:
                <span>
                  {candidateForm.address.slice(0, 10)}
                  {candidateForm.address.length > 10 ? <span>...</span> : <></>}
                </span>
              </p>
              <p>
                age: <span>{candidateForm.age} </span>
              </p>
            </div>
          </div>
        )}
        {!fileUrl && (
          <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create Candidate For Voting</h4>
              <p>BlockChain voting Organisation, Provide Etherum</p>
              <p className={Style.sideInfo_para}>Contract Candidates</p>
            </div>
            <div className={Style.card}>
              {candidateArray.map((el, i) => (
                <div key={i + 1} className={Style.card_box}>
                  <div className={Style.image}>
                    <img src={el[3]} alt="Profile Image" />
                  </div>
                  <div className={Style.card_info}>
                    <p>
                      {el[2].slice(0, 10)} #{el[0].toNumber()}
                    </p>
                    <p>{el[1]}</p>
                    <p>Address:{el[5].slice(0, 10)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={Style.voter}>
        <div className={Style.voter__container}>
          <h1 className="text-4xl my-5">Create New Candidate</h1>
          <div className={Style.voter__container__box}>
            <div className={Style.voter__container__box__div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={Style.voter__container__box__div__info}>
                  <p>Upload File:JPG</p>
                </div>
                <div className={Style.voter__container__box__div__image}>
                  <Image
                    src="/upload.png"
                    width={150}
                    height={150}
                    alt="File Upload"
                  />
                </div>
                <p>Drag & Drop File</p>
                <p>or Browse File</p>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.input__container}>
          <Input
            inputType="text"
            title="Name"
            placeholder="Candidate name"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Candidate Address"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Position"
            placeholder="Candidate Position"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, age: e.target.value })
            }
          />
          <div className={Style.Button}>
            <Button
              btnName="Authorized Voter"
              handleClick={() => {
                setCandidate(candidateForm, fileUrl, router);
              }}
            />
          </div>
        </div>
      </div>
      <div className={Style.createdVoter}>
        <div className={Style.createdVoter__info}>
          <Image src="/nft.png" alt="Voter Image" height={100} width={100} />
          <p>Notice for user</p>
          <p>
            Organiser: <span>{organizer && organizer.slice(0, 10)}...</span>
          </p>
          <p>Only Oraganizer can add voters</p>
        </div>
      </div>
    </div>
  );
};

export default candidateRegistration;
