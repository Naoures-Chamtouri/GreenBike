
import { TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

function NumberStepper({ stock }) {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    if (value < stock) {
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-10 ml-24">
      <IconButton onClick={handleDecrement} disabled={value <= 1}>
        <RemoveIcon />
      </IconButton>
      <TextField
        type="number"
        value={value}
        variant="outlined"
        size="small"
        className="w-14"
        inputProps={{ min: 1, max: stock, style: { textAlign: "center" } }}
        onChange={(e) => {
          const newValue = Math.min(Math.max(Number(e.target.value), 1), stock);
          setValue(newValue);
        }}
      />
      <IconButton onClick={handleIncrement} disabled={value >= stock}>
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default NumberStepper;
