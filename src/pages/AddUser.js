import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

export const AddUser = () => {
    
  const [state, setState] = React.useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");

  const { name, email, contact, address } = state;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !contact || !address) {
        setError("Por favor ingrese datos en todos los input text");
    } else {
      dispatch(addUser(state));
      navigate("/");
      setError("");
    }
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 20 }}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
        <h2>Add User</h2>
        {error && <h3 style={{ color: "red" }}> {error} </h3> }
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "30%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="standard"
          value={name}
          type="text"
          onChange={handleInputChange}
        />{" "}
        <br />
        <TextField
          id="email"
          name="email"          
          label="Email"
          variant="standard"
          value={email}
          type="email"
          onChange={(e) => {handleInputChange(e)}}
        />{" "}
        <br />
        <TextField
          id="contact"
          name="contact"
          label="Contact"
          variant="standard"
          value={contact}
          type="number"
          onChange={(e) => {handleInputChange(e)}}
        />{" "}
        <br />
        <TextField
          id="address"
          name="address"
          label="Address"
          variant="standard"
          value={address}
          type="text"
          onChange={(e) => {handleInputChange(e)}}
        />{" "}
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          type="submit"
        >
          Save
        </Button>
      </Box>
    </>
  );
};
