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

  const onSubmit = async () => {
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
      var response = await api.post("/order/" + selectGroup, newOrder);
      console.log(response);
    } else {
      window.alert("Missing  Fields");
    }
  };

  const generateBill = async () => {
    var response = await api.get("/order/bill/" + selectGroup);
    console.log(response.data);
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
    </div>
  );
}

export default App;
