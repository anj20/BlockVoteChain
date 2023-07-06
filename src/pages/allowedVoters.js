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
          <div className={Style.voterInfo}>
            <Image src={fileUrl} alt="voter Image" width={80} height={100} />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name:<span>{formInput.name} </span>
              </p>
              <p>
                Address:
                <span>
                  {formInput.address.slice(0, 10)}
                  {formInput.address.length > 10 ? <span>...</span> : <></>}
                </span>
              </p>
              <p>
                Position: <span>{formInput.position} </span>
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
              {voterArray.map((el, i) => (
                <div key={i + 1} className={Style.card_box}>
                  <div className={Style.image}>
                    <img
                      src={el[2]}
                      alt="Profile Image"
                      width={80}
                      height={100}
                    />
                  </div>
                  <div className={Style.card_info}>
                    <p>
                      {el[1]}#{el[0].toNumber()}
                    </p>
                    <p>{el[7].slice(0, 10)}...</p>
                    <p>Allowed:{el[3].toNumber()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={Style.voter}>
        <div className={Style.voter__container}>
          <h1 className="text-4xl my-5">Create New Voter</h1>
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
            placeholder="Voter name"
            handleClick={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) =>
              setFormInput({ ...formInput, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Positon"
            placeholder="Voter Position"
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
          <Image src="/nft.png" alt="Voter Image" height={100} width={100} />
          <p>Notice for user</p>
          <p>
            Organiser:<span>{organizer && organizer.slice(0, 10)}...</span>
          </p>
          <p>Only Oraganizer can add voters</p>
        </div>
      </div>
    </div>
  );
};

export default allowedVoters;
