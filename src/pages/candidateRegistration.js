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
          <>
            <div className={Style.voterInfo}>
              <img src={fileUrl} alt="voter Image" />
            </div>

            <div className={Style.voterInfo_paragraph}>
              <p>
                Candidate Name:<span>{candidateForm.name} </span>
              </p>
              <p>
                Candidate Address:
                <span>
                  {candidateForm.address.slice(0, 10)}
                  {candidateForm.address.length > 10 ? <span>...</span> : <></>}
                </span>
              </p>
              <p>
                Candidate Age: <span>{candidateForm.age} </span>
              </p>
            </div>
          </>
        )}
      </div>

      <div className={Style.voter}>
        <div className={Style.voter__container}>
          <div className="text-4xl my-5 font-black font-mono align-text-top">
            Create New Candidate
          </div>
          <div className={Style.voter__container__box}>
            <div className={Style.voter__container__box__div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={Style.voter__container__box__div__info}>
                  <p style={{ fontSize: "20px", fontFamily: "mono" }}>
                    Upload Image
                  </p>
                </div>
                <div className={Style.voter__container__box__div__image}>
                  <Image
                    src="/upload.png"
                    width={150}
                    height={150}
                    alt="File Upload"
                  />
                </div>
                <p className="font-mono font-medium">Drag & Drop File</p>
                <p className="font-mono font-medium">or Browse File</p>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.input__container}>
          <Input
            inputType="text"
            title="Candidate Name"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Candidate Address"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Candidate Position"
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
          <div
            style={{
              fontSize: "40px",
              margin: "1vh",
              textAlign: "center",
              fontFamily: "arial",
            }}
          >
            Notice for user
          </div>
          <Image src="/nft.png" alt="Voter Image" height={300} width={300} />
          <div
            style={{
              margin: "1vh",
              fontSize: "18px",
              fontFamily: "monospace",
            }}
          >
            <div>
              Organiser: <span>{organizer && organizer.slice(0, 15)}...</span>
            </div>
            <div style={{ color: "greenyellow", marginTop: "2vh" }}>
              Only Oraganizer can add voters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default candidateRegistration;
