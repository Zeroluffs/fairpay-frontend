import { useState } from "react";
import { GroupSelect } from "./components/GroupSelect";
import { ProductSelect } from "./components/ProductSelect";
import { ShowBill } from "./components/ShowBill";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: `https://fairpay-test.herokuapp.com/api`,
});
function App() {
  const [selectGroup, setGroup] = useState("");

  const [name, setName] = useState("");
  const [product, setProduct] = useState([]);

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
    } else {
      window.alert("Missing  Fields");
    }
  };

  const generateBill = async () => {
    try {
      var response = await api.get("/order/bill/" + selectGroup);

      setShowBill(true);
      setBillData(response.data);
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
        <ProductSelect
          selectProduct={(product) => setProduct(product)}
          orderTaken={orderTaken}
        />
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
        <TextField
          onChange={(event) => setName(event.target.value)}
          value={name}
          autoFocus={true}
          id="standard-basic"
          label="Name"
          variant="standard"
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

      {showBill && <ShowBill billData={billData} />}
    </div>
  );
}

export default App;
