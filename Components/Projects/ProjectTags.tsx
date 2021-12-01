import { useCallback, useState } from "react";
import type { ReactElement } from "react";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { addTag, removeTag } from "../../context/reducers/projectSlices";
import MainTag from "../Utilities/MainTag";
import useChannels from "../Utilities/hooks/useChannels";
import styles from "./Projects.style";
import type { TabDataTypes } from "../Utilities/MainTabs/TabTypes";

interface Props {
  incomingData: Array<TabDataTypes>;
}

type TagDataTypes = {
  _id: string;
  title: string;
  icon: string;
};

function ProjectTags({ incomingData }: Props): ReactElement {
  const stateTags = useAppSelector((state) => state.projects.tags);
  const dispatch = useAppDispatch();
  const [tagData, setTagData] = useState<Array<TagDataTypes>>(incomingData);

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
    [incomingData]
  );

  const handleTags = useCallback(
    (tags: string[], title: string) => () => {
      let titleText = title.toUpperCase();
      if (tags.includes(titleText)) {
        dispatch(removeTag({ title: titleText }));
      } else {
        dispatch(addTag({ title: titleText }));
      }
    },
    [dispatch]
  );

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {tagData.map(({ title, icon, _id }) => (
        <Grid key={_id} item xs={2} mx="3.5px">
          <MainTag
            onClick={handleTags(stateTags, title)}
            sxBox={styles.tags.container}
            sxText={styles.tags.text}
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
