import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "../redux/actions";

export const EditUser = () => {
    
  const [state, setState] = React.useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const { id } = useParams();  

  const { user } = useSelector(state => state.data);

  const [error, setError] = useState("");

  const { name, email, contact, address } = state;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  useEffect(() => {
    if(user) {
      setState({...user});
    }
  }, [user])
  

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
      dispatch(updateUser(state, id));
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
        <h2>Edit User</h2>
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
          value={name || ""}
          type="text"
          onChange={handleInputChange}
        />{" "}
        <br />
        <TextField
          id="email"
          name="email"          
          label="Email"
          variant="standard"
          value={email || ""}
          type="email"
          onChange={(e) => {handleInputChange(e)}}
        />{" "}
        <br />
        <TextField
          id="contact"
          name="contact"
          label="Contact"
          variant="standard"
          value={contact || ""}
          type="number"
          onChange={(e) => {handleInputChange(e)}}
        />{" "}
        <br />
        <TextField
          id="address"
          name="address"
          label="Address"
          variant="standard"
          value={address || ""}
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
          Update
        </Button>
      </Box>
    </>
  );
};
