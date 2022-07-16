import { useState } from "react";
import { GroupSelect } from "./components/GroupSelect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});
function App() {
  const [selectGroup, setGroup] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);

  const onSubmit = async () => {
    const newOrder = {
      name: name,
      product: product,
      price: price,
      groupID: selectGroup,
    };

    var response = await api.post("/order/" + selectGroup, newOrder);
    console.log(response);
  };

  const generateBill = async () => {
    var response = await api.get("/order/bill/" + selectGroup);
    console.log(response.data);
  };
  return (
    <div>
      <GroupSelect selectGroup={(group) => setGroup(group)} />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(event) => setName(event.target.value)}
          autoFocus={true}
          id="standard-basic"
          label="Name"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="Product"
          variant="standard"
          onChange={(event) => setProduct(event.target.value)}
        />
        <Input
          type="number"
          id="standard-adornment-amount"
          onChange={(event) => setPrice(event.target.value)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </Box>
      <Button onClick={onSubmit} variant="outlined">
        Take Order
      </Button>
      <Button onClick={generateBill} variant="outlined">
        Generate Bill
      </Button>
    </div>
  );
}

export default App;
