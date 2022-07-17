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

export function GroupSelect(props) {
  const [group, setGroup] = React.useState("62d2f46102e91a62bb7e59ea");

  const api = axios.create({
    baseURL: `http://localhost:3000/api`,
  });
  const [names, setNames] = React.useState([]);
  
  const getGroups = async () => {
    try {
      var response = await api.get("/tgroup");
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
    props.selectGroup(group);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);
  React.useEffect(() => {
    getGroups();
  }, []);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setGroup(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Group</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name.id}
              value={name._id}
              style={getStyles(name, personName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
