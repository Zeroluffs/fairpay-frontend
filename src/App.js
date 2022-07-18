import { useState } from "react";
import { GroupSelect } from "./components/GroupSelect";
import { ProductSelect } from "./components/ProductSelect";
import { ShowBill } from "./components/ShowBill";

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
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState(0);

  const [showBill, setShowBill] = useState(false);
  const [orderTaken, setOrderTaken] = useState(false);
  const [billData, setBillData] = useState([]);

  const onSubmit = async () => {
    setShowBill(false);
    if (name.length > 0 && product.length > 0) {
      let arrayWithProducts = [];
      product.forEach((product) => {
        const object = {
          productName: product,
          price: Math.floor(Math.random() * 100) + 1,
        };

        arrayWithProducts.push(object);
      });
      const newOrder = {
        name: name,
        products: arrayWithProducts,
        groupID: selectGroup,
      };
      setName("");
      setProduct([]);
      setPrice("");
      setOrderTaken(true);
      try {
        await api.post("/order/" + selectGroup, newOrder);
        setOrderTaken(false);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
        } else {
          console.log("Error", err.message);
        }
      }
      console.log("product", product);
    } else {
      window.alert("Missing  Fields");
    }
  };

  const generateBill = async () => {
    try {
      var response = await api.get("/order/bill/" + selectGroup);
      // setAmountPerPerson(response.data.amountPerPerson);
      // setAmountPerPersonTip(response.data.amountPerPersonTip);
      setShowBill(true);
      setBillData(response.data);
      console.log(response, "response");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        window.alert(err.response.data.message);
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
          "& > :not(style)": { width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <ProductSelect
          selectProduct={(product) => setProduct(product)}
          orderTaken={orderTaken}
        />
        <TextField
          onChange={(event) => setName(event.target.value)}
          value={name}
          autoFocus={true}
          id="standard-basic"
          label="Name"
          variant="standard"
        />
        {/* <TextField
          id="standard-basic"
          value={product}
          label="Product"
          variant="standard"
          onChange={(event) => setProduct(event.target.value)}
        /> */}
        <Input
          type="number"
          id="standard-adornment-amount"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </Box>
      <div className="buttonContainer">
        <div className="takeButton">
          <Button onClick={onSubmit} variant="outlined">
            Take Order
          </Button>
        </div>
        <div className="generateButton">
          <Button onClick={generateBill} variant="outlined">
            Generate Bill
          </Button>
        </div>
      </div>

      {showBill && (
        <ShowBill billData={billData} />
        // <p className="billingText">
        //   Each person needs to pay <strong>${amountPerPerson}</strong> no tip
        //   included. And the amount with tip (per Colombian Law of 10%) is{" "}
        //   <strong>${amountPerPersonTip}</strong>
        // </p>
      )}
    </div>
  );
}

export default App;
