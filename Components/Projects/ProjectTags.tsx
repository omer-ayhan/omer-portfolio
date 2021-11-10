import { Grid } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { addTag, removeTag } from "../../context/reducers/projectSlices";
import MainTag from "../Utilities/MainTag";
import { props } from "../Utilities/StylesProvider";
import useChannels from "../Utilities/useChannels";

interface Props {}

type TagDataTypes = {
  _id: string;
  title: string;
  icon: string;
};

const { stylesAll } = props;

function ProjectTags({}: Props): ReactElement {
  const stateTags = useAppSelector((state) => state.projects.tags);
  const dispatch = useAppDispatch();
  const [tagData, setTagData] = React.useState<Array<TagDataTypes>>([]);

  useChannels(
    "projectTags",
    (channel) => {
      channel.subscribe("insertCard", (tag) => {
        setTagData([...tag.data]);
      });
      channel.subscribe("updateCard", (tag) => {
        setTagData((tagData) => [
          ...tagData.map((item) => {
            if (item._id === tag.data._id) {
              return tag.data;
            }
            return item;
          }),
        ]);
      });
      channel.subscribe("deleteCard", (tag) => {
        setTagData((tagData) =>
          tagData.filter((item) => item._id !== tag.data._id)
        );
      });
    },
    []
  );

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    axios
      .get(process.env.PROJECT_TAGS, {
        method: "GET",
        signal: signal,
      })
      .then((res: AxiosResponse) => {
        setTagData(
          res.data.map((tag: TagDataTypes) => ({
            title: tag.title,
            icon: tag.icon,
            _id: tag._id,
          }))
        );
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });

    return (): void => {
      abortController.abort();
    };
  }, []);

  const handleTags = (tags: string[], title: string) => {
    let titleText = title.toUpperCase();
    if (tags.includes(titleText)) {
      dispatch(removeTag({ title: titleText }));
    } else {
      dispatch(addTag({ title: titleText }));
    }
  };

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {tagData.map(({ title, icon, _id }) => (
        <Grid key={_id} item xs={2} mx="3.5px">
          <MainTag
            onClick={() => handleTags(stateTags, title)}
            sxBox={{
              ...stylesAll.projects.tags.container,
            }}
            sxText={{
              ...stylesAll.projects.tags.text,
            }}
            icon={icon}
            title={title}
            className={"project-tag-icons"}
            isClickable
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProjectTags;
