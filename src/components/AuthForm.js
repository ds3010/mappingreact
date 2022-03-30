import jmap from "jmap.js";
import { useState } from "react";
import classes from "./AuthForm.module.css";
import logo from "../images/logo.png";

const AuthForm = (props) => {
  // Set the initial values of all four credentials, they will change everytime the user type
  const [values, setValues] = useState({
    clientId: "",
    clientSecret: "",
    customerId: "",
    venueId: "",
  });
  // When Form is submitted, Parse all entries and create a jibestream config file, then use the props to send it to App.js with the onSubmitted() function
  const onSubmitted = (e) => {
    e.preventDefault();
    const inputs = Array.from(e.target);

    let client_id, client_secret, customer_id, venue_id;
    inputs.forEach((input) => {
      if (input.name === "client_id") {
        client_id = input.value;
      }
      if (input.name === "client_secret") {
        client_secret = input.value;
      }
      if (input.name === "customer_id") {
        customer_id = input.value;
      }
      if (input.name === "venue_id") {
        venue_id = input.value;
      }
    });

    const config = {
      host: "https://api.jibestream.com",
      auth: new jmap.core.Auth(client_id, client_secret),
      clientId: client_id,
      clientSecret: client_secret,
      customerId: parseInt(customer_id),
      venueId: parseInt(venue_id),
    };
    props.onSubmitted(config);

    //After authentication credentials have been submitted, we now reset the state of the four inputs to BLANK
    // setValues({
    //   clientId: "",
    //   clientSecret: "",
    //   customerId: "",
    //   venueId: "",
    // });
  };

  //Everytime the user types on any output, the following code will update the value of each input
  const handlingInput = (e) => {
    if (e.target.name === "client_id") {
      setValues((prevState) => ({
        ...prevState,
        clientId: e.target.value,
      }));
      //console.log(values);
    }
    if (e.target.name === "client_secret") {
      setValues((prevState) => ({
        ...prevState,
        clientSecret: e.target.value,
      }));
      //console.log(values);
    }
    if (e.target.name === "customer_id") {
      setValues((prevState) => ({
        ...prevState,
        customerId: e.target.value,
      }));
      //console.log(values);
    }
    if (e.target.name === "venue_id") {
      setValues((prevState) => ({
        ...prevState,
        venueId: e.target.value,
      }));
      //console.log(values);
    }
  };

  return (
    <div className={classes.formDiv}>
      <form onSubmit={onSubmitted} className={classes.formClass}>
        <div className={classes.formWrapper}>
          <div className={classes.inputDivClass}>
            <input
              className={classes.inputClass}
              name="client_id"
              type="text"
              placeholder="Client ID"
              value={values.clientId}
              onChange={handlingInput}
            ></input>
          </div>
          <div className={classes.inputDivClass}>
            <input
              className={classes.inputClass}
              name="client_secret"
              type="text"
              placeholder="Client Secret"
              value={values.clientSecret}
              onChange={handlingInput}
            ></input>
          </div>
          <div className={classes.inputDivClass}>
            <input
              className={classes.inputClass}
              name="customer_id"
              type="number"
              placeholder="Customer ID"
              value={values.customerId}
              onChange={handlingInput}
            ></input>
          </div>
          <div className={classes.inputDivClass}>
            <input
              className={classes.inputClass}
              name="venue_id"
              type="number"
              placeholder="Venue ID"
              value={values.venueId}
              onChange={handlingInput}
            ></input>
          </div>
        </div>
        <div className={classes.btnDiv}>
          <button className={classes.btn} type="submit">
            Reload Map
          </button>
        </div>
        <img className={classes.logo} src={logo} alt="Inpixon" />
      </form>
    </div>
  );
};

export default AuthForm;
