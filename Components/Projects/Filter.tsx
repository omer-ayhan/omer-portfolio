import { useState, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { props } from "../Utilities/StylesProvider";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { addTag, removeTag } from "../../context/reducers/projectSlices";
import { useRouter } from "next/router";

const { stylesAll } = props;
function Filter() {
  const projectState = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [filterInput, setFilterInput] = useState<string>("");
  const [filterCats, setFilterCats] = useState({
    alphabetic: {
      value: "asc",
    },
    time: {
      value: "desc",
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted && Object.keys(router.query).length < 1) {
      router.push(
        {
          query: {
            time: filterCats.time.value,
            alphabetic: filterCats.alphabetic.value,
          },
        },
        undefined,
        { scroll: false, shallow: true }
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);

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

      <Box
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
            value={filterCats.time.value}
            onChange={(event: SelectChangeEvent) => {
              setFilterCats({
                ...filterCats,
                time: { value: event.target.value },
              });
              router.push(
                {
                  query: { ...router.query, time: event.target.value },
                },
                undefined,
                { scroll: false, shallow: true }
              );
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
            value={filterCats.alphabetic.value}
            onChange={(event: SelectChangeEvent) => {
              setFilterCats({
                ...filterCats,
                alphabetic: { value: event.target.value },
              });
              router.push(
                {
                  query: { ...router.query, alphabetic: event.target.value },
                },
                undefined,
                { scroll: false, shallow: true }
              );
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
