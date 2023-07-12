import Style from "./Input.module.css";

const Input = ({ inputType, title, handleClick }) => {
  return (
    <div className={Style.input} style={{ margin: "1vh" }}>
      <div className=" font-extrabold font-mono text-lg">{title}</div>
      {inputType === "text" ? (
        <div className={Style.input__box}>
          <input
            type="text"
            onChange={handleClick}
            className={Style.input__box__form}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
