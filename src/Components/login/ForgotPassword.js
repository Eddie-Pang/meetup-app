import React, { useRef, useState } from "react";
import useFormInput from "../../hooks/useFormInput";
import { Link } from "react-router-dom";
import { resetUserPassword } from "../../services/userService";
import CenteredContainer from "../CenteredContainer";
import NavBar from "../NavBar";

function ForgotPassword() {
  const { setValue: setEmail, ...email } = useFormInput("");
  const emailRef = useRef();
  const [message, setMessage] = useState();

  const handleResetPassword = async () => {
    setMessage(false);
    const value = emailRef.current.value;
    // console.log('value:', value)
    if (emailRef.current.value !== "") {
      try {
        await resetUserPassword(value);
        setEmail("");
        setMessage(
          "We are sending you a new password, please check you email."
        );
      } catch (error) {
        setMessage(`Please enter a valid email address.`);
      }
    } else {
      setMessage(`Please enter your email address.`);
    }
  };

  return (
    <>
      <NavBar />

      <CenteredContainer>
        <div className="card">
          <br />
          <h2 className="text-center mb-4">Require new password</h2>
          <br />
          <br />

          <input
            {...email}
            type="email"
            className="form-control"
            ref={emailRef}
            id="InputEmail"
            placeholder="Email"
            aria-describedby="emailHelp"
            style={formFields}
            required
          ></input>
          <br />
          <br />

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleResetPassword}
          >
            Confirm
          </button>
          <br />
          {message}
          <br />
          <br />
          <br />

          <Link to="/Login">Back</Link>

          <br />
          <br />
        </div>
      </CenteredContainer>
    </>
  );
}
export default ForgotPassword;

const formFields = {
  borderRadius: "6px",
  padding: "10px 30px",
};
