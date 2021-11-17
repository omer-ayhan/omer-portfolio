import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));
import type { SelectChangeEvent } from "@mui/material";
import { props } from "../Utilities/StylesProvider";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  addTag,
  removeTag,
  changeOrder,
} from "../../context/reducers/projectSlices";

const { stylesAll } = props;
function Filter() {
  const projectState = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const [filterInput, setFilterInput] = useState<string>("");

  const handleInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      !projectState.tags.includes(filterInput.toUpperCase()) &&
      (event.key === "Enter" ||
        event.key === " " ||
        event.key === "Spacebar") &&
      filterInput !== ""
    ) {
      dispatch(addTag({ title: filterInput.toUpperCase() }));
      setFilterInput("");
    }
  };
  return (
    <Box
      sx={{
        ...stylesAll.utilities.flexDefault,
        ...stylesAll.filter.container,
        flexDirection: "column",
      }}>
      <TextField
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFilterInput(event.target.value)
        }
        onKeyDown={handleInput}
        value={filterInput}
        label={
          <Typography
            variant="button"
            sx={{
              ...stylesAll.filter.input.text.label,
              textAlign: "center",
            }}>
            Enter Tags
          </Typography>
        }
        InputProps={{
          sx: {
            ...stylesAll.filter.input.text.main,
          },
        }}
        variant="standard"
        fullWidth
      />
      <Grid
        container
        sx={{
          ...stylesAll.utilities.gridContainer,
          ...stylesAll.filter.tags.gridContainer,
        }}
        spacing={{ xs: 0.5 }}>
        {projectState.tags.map((text, index) => (
          <Grid
            key={`${text}${index}`}
            item
            xs={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}>
            <Tooltip title={<Typography variant="body2">{text}</Typography>}>
              <Chip
                sx={{
                  ...stylesAll.filter.tags.container,
                }}
                label={
                  <Typography
                    variant="button"
                    sx={{
                      ...stylesAll.filter.input.text.label,
                      textAlign: "center",
                    }}>
                    {text}
                  </Typography>
                }
                onDelete={() =>
                  dispatch(removeTag({ title: text.toUpperCase() }))
                }
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      {/* <Box
        sx={{
          ...stylesAll.utilities.flexDefault,
          ...stylesAll.filter.forms.container,
        }}>
        <Typography
          variant="button"
          sx={{
            ...stylesAll.filter.forms.text.title,
          }}>
          Sort by Time
        </Typography>
        <FormControl
          variant="standard"
          sx={{ ...stylesAll.filter.forms.select.container }}>
          <Select
            value={projectState.sortByTime}
            onChange={(event: SelectChangeEvent) => {
              dispatch(changeOrder({ sortTime: event.target.value }));
            }}
            sx={{
              ...stylesAll.filter.forms.select.text,
            }}>
            <MenuItem
              value="asc"
              sx={{
                ...stylesAll.filter.forms.select.text,
              }}>
              Ascending
            </MenuItem>
            <MenuItem
              value="desc"
              sx={{
                ...stylesAll.filter.forms.select.text,
              }}>
              Descending
            </MenuItem>
          </Select>
        </FormControl>
      </Box> */}

      <Box
        sx={{
          ...stylesAll.utilities.flexDefault,
          ...stylesAll.filter.forms.container,
        }}>
        <Typography
          variant="button"
          sx={{ ...stylesAll.filter.forms.text.title }}>
          Sort Alphabetically
        </Typography>
        <FormControl
          variant="standard"
          sx={{ ...stylesAll.filter.forms.select.container }}>
          <Select
            value={projectState.sortByTitle}
            onChange={(event: SelectChangeEvent) => {
              dispatch(changeOrder({ sortAlphabet: event.target.value }));
            }}
            sx={{
              ...stylesAll.filter.forms.select.text,
            }}>
            <MenuItem
              value="asc"
              sx={{
                ...stylesAll.filter.forms.select.text,
              }}>
              Ascending
            </MenuItem>
            <MenuItem
              value="desc"
              sx={{
                ...stylesAll.filter.forms.select.text,
              }}>
              Descending
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Filter;
