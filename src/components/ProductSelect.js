import * as React from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function ProductSelect(props) {
  const api = axios.create({
    baseURL: `http://localhost:3000/api`,
  });
  const [names, setNames] = React.useState([]);
  const [productName, setProductName] = React.useState([]);

  const getProducts = async () => {
    try {
      var response = await api.get("/product");
      setNames(response.data);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else if (err.request) {
      } else {
        console.log("Error", err.message);
      }
    }
  };
  React.useEffect(() => {
    props.selectProduct(productName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);
  React.useEffect(() => {
    if (props.orderTaken) {
      setProductName([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.orderTaken]);
  React.useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Product</InputLabel>
        <Select
          multiple
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={productName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name._id}
              value={name.productName}
              name="hi"
              style={getStyles(name, productName, theme)}
            >
              {name.productName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
