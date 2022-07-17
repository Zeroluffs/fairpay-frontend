import { useState } from "react";
import { GroupSelect } from "./components/GroupSelect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
function App() {
  const [selectGroup, setGroup] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);
  const [amountPerPersonTip, setAmountPerPersonTip] = useState(0);
  const [showBill, setShowBill] = useState(false);

  const onSubmit = async () => {
    setShowBill(false);
    if (name.length > 0 && price > 0 && product.length > 0) {
      const newOrder = {
        name: name,
        product: product,
        price: price,
        groupID: selectGroup,
      };
      setName("");
      setProduct("");
      setPrice("");
      try {
        await api.post("/order/" + selectGroup, newOrder);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
        } else {
          console.log("Error", err.message);
        }
      }
    } else {
      window.alert("Missing  Fields");
    }
  };

  const generateBill = async () => {
    try {
      var response = await api.get("/order/bill/" + selectGroup);
      setAmountPerPerson(response.data.amountPerPerson);
      setAmountPerPersonTip(response.data.amountPerPersonTip);
      setShowBill(true);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else if (err.request) {
      } else {
        console.log("Error", err.message);
      }
    }
  };
  return (
    <div className="mainContainer">
      <h2>FairPay</h2>
      <div className="groupContainer">
        <GroupSelect selectGroup={(group) => setGroup(group)} />
      </div>

      <Box
        className="inputContainer"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(event) => setName(event.target.value)}
          value={name}
          autoFocus={true}
          id="standard-basic"
          label="Name"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          value={product}
          label="Product"
          variant="standard"
          onChange={(event) => setProduct(event.target.value)}
        />
        <Input
          type="number"
          id="standard-adornment-amount"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </Box>
      <div className="buttonContainer">
        <Button className="takeButton" onClick={onSubmit} variant="outlined">
          Take Order
        </Button>
        <Button onClick={generateBill} variant="outlined">
          Generate Bill
        </Button>
      </div>

      {showBill && (
        <p className="billingText">
          Each person needs to pay <strong>${amountPerPerson}</strong> no tip
          included. And the amount with tip (per Colombian Law of 10%) is{" "}
          <strong>${amountPerPersonTip}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
