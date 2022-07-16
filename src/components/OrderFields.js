import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function OrderFields() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Name" variant="standard" />
      <TextField id="standard-basic" label="Product" variant="standard" />
      <TextField id="standard-basic" label="Price" variant="standard" />
    </Box>
  );
}
