import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { timeVarFormat } from "../../../utils/formatTime";

export default function TimePicker({
  label,
  defaultHour,
  defaultMinute,
  register,
}) {
  const renderHourList = () => {
    const result = [];
    for (let i = 0; i <= 23; i++) {
      result.push(
        <MenuItem key={`hour${i}`} value={i}>
          {timeVarFormat(i)}
        </MenuItem>
      );
    }
    return result;
  };

  const renderMinuteList = () => {
    const result = [];
    for (let i = 0; i <= 59; i++) {
      result.push(
        <MenuItem key={`minute${i}`} value={i}>
          {timeVarFormat(i)}
        </MenuItem>
      );
    }
    return result;
  };
  return (
    <Grid
      style={{ marginLeft: "1px" }}
      container
      item
      xs={6}
      spacing={2}
      alignItems="center"
    >
      <Grid item>
        <Typography>{label.toUpperCase()}</Typography>
      </Grid>
      <Grid container alignItems="center">
        <FormControl variant="outlined">
          <InputLabel id={`new-place-${label}-hour-label`}>Hour</InputLabel>
          <Select
            defaultValue={`${defaultHour}`}
            label="Hour"
            autoWidth
            labelId={`new-place-${label}-hour-label`}
            {...register(`openingHours.${label}.hour`)}
          >
            {renderHourList()}
          </Select>
        </FormControl>
        &nbsp;:&nbsp;
        <FormControl variant="outlined">
          <InputLabel id={`new-place-${label}-minute-label`}>Minute</InputLabel>
          <Select
            defaultValue={defaultMinute}
            label="minute"
            autoWidth
            labelId={`new-place-${label}-minute-label`}
            {...register(`openingHours.${label}.minute`)}
          >
            {renderMinuteList()}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
