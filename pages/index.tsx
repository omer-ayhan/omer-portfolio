import React from "react";
import Head from "next/head";
import Navbar from "../Components/Nav/Navbar";
import Intro from "../Components/Intro";
import StylesProvider, { props } from "../Components/Utilities/StylesProvider";
import { Box } from "@mui/material";
import About from "../Components/About/About";
import Skills from "../Components/Skills";
import Projects from "../Components/Projects/Projects";
import Blogs from "../Components/Blogs";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { useAppSelector } from "../context/hooks";
import { BackToTop } from "../Components/BackToTop";
import connectToDB from "../lib/database";
import type { Db } from "mongodb";
import type { GetStaticProps } from "next";
import cardEmitters from "../lib/changeEvents";
import connectToAbly from "../lib/connectToAbly";
import type { Realtime, Types } from "ably";

type TabDataTypes = {
  title: string;
  icon: string;
  _id: string;
  items: TabDataItems[];
};

type TabDataItems = {
  title: string;
  desc: string;
  icon: string;
  img: string[];
  link: string;
  tags: Array<TabDataItems>;
};
interface Props {
  skillsData: Array<TabDataTypes>;
  projectsData: Array<TabDataTypes>;
  tagsData: Array<TabDataTypes>;
}

function App({ skillsData, projectsData, tagsData }: Props) {
  const themeMode = useAppSelector((state) => state.nav.isDarkMode);
  const { colors } = props;
  React.useEffect(() => {
    document.body.style.backgroundColor = themeMode ? colors.Darkdef : "#fff";
  }, [themeMode]);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
      </Head>
      <StylesProvider>
        <Box className="App">
          <BackToTop />
          <Navbar />
          <Intro />
          <About />
          <Skills tabData={skillsData} />
          <Projects tabData={[projectsData, tagsData]} />
          <Blogs />
          <Contact />
          <Footer />
        </Box>
      </StylesProvider>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const db: Db = await connectToDB();
  const realtime = connectToAbly(process.env.ABLY_PUBLISH);
  const skillsData = await Definecollection(db, realtime, "skillCards");

  const projectsData = await Definecollection(db, realtime, "projectTabs");

  const tagsData = await Definecollection(db, realtime, "projectTags");
  return {
    props: {
      skillsData: skillsData.map((item) => ({
        _id: item._id.toString(),
        title: item.title,
        icon: item.icon,
        items: item.items,
      })),
      projectsData: projectsData.map((item) => ({
        _id: item._id.toString(),
        title: item.title,
        icon: item.icon,
        items: item.items,
      })),
      tagsData: tagsData.map((item) => ({
        _id: item._id.toString(),
        title: item.title,
        icon: item.icon,
      })),
    },
    revalidate: 15,
  };
};

const Definecollection = async (
  db: Db,
  realtime: Realtime,
  collectionName: string
) => {
  try {
    const collection = db.collection(collectionName);
    let data = await collection.find({}).toArray();
    // @ts-ignore
    const channel: Types.RealtimeChannelPromise =
      realtime.channels.get(collectionName);
    const changeStream = collection.watch([], {
      fullDocument: "updateLookup",
    });
    changeStream.on("change", async (change) => {
      await cardEmitters(change, channel, collection);
    });
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default App;
