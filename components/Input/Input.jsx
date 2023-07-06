import Style from "./Input.module.css";

const Input = ({ inputType, title, placeholder, handleClick }) => {
  return (
    <div className={Style.input}>
      <p>{title}</p>
      {inputType === "text" ? (
        <div className={Style.input__box}>
          <input
            type="text"
            placeholder={placeholder}
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
