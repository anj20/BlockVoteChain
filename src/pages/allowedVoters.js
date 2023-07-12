import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INternal Import
import { VotingContext } from "../../context/Voter";
import Style from "../styles/allowedVoter.module.css";
import Button from "@components/Button/Button";
import Input from "@components/Input/Input";

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });
  const router = useRouter();
  const { uploadToIPFS, createVoter, voterArray, getAllVoterData, organizer } =
    useContext(VotingContext);

  useEffect(() => {
    getAllVoterData();
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
                Voter Name:<span>{formInput.name} </span>
              </p>
              <p>
                Voter Address:
                <span>
                  {formInput.address.slice(0, 10)}
                  {formInput.address.length > 10 ? <span>...</span> : <></>}
                </span>
              </p>
              <p>
                Voter Age: <span>{formInput.age} </span>
              </p>
            </div>
          </>
        )}
      </div>

      <div className={Style.voter}>
        <div className={Style.voter__container}>
          <div className="text-4xl my-5 font-black font-mono align-text-top">
            Create New Voter
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
            title="Voter Name"
            handleClick={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Voter Address"
            handleClick={(e) =>
              setFormInput({ ...formInput, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Voter Positon"
            handleClick={(e) =>
              setFormInput({ ...formInput, position: e.target.value })
            }
          />
          <div className={Style.Button}>
            <Button
              btnName="Authorized Voter"
              handleClick={() => {
                createVoter(formInput, fileUrl, router);
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

export default allowedVoters;
