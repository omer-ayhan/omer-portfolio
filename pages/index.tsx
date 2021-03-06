import { useEffect } from "react";
import Head from "next/head";
import Navbar from "../Components/Navbar";
import Intro from "../Components/Intro";
import StylesProvider, { colors } from "../Components/Utilities/StylesProvider";
import { Box } from "@mui/material";
import About from "../Components/About";
import { useAppSelector } from "../context/hooks";
import connectToDB from "../lib/database";
import cardEmitters from "../lib/changeEvents";
import connectToAbly from "../lib/connectToAbly";
import dynamic from "next/dynamic";
const Skills = dynamic(() => import("../Components/Skills"));
const Projects = dynamic(() => import("../Components/Projects/Projects"));
const Blogs = dynamic(() => import("../Components/Blogs"));
const Contact = dynamic(() => import("../Components/Contact"));
const BackToTop = dynamic(() => import("../Components/BackToTop"));
const Footer = dynamic(() => import("../Components/Footer"));
import { adjustTextColor } from "../Components/Utilities/ColorUtils/adjustColor";
import type { Db } from "mongodb";
import type { GetStaticProps } from "next";
import type { TabDataTypes } from "../Components/Utilities/MainTabs/TabTypes";
import type { Realtime, Types } from "ably";

interface Props {
  skillsData: Array<TabDataTypes>;
  projectsData: Array<TabDataTypes>;
  tagsData: Array<TabDataTypes>;
}

function App({ skillsData, projectsData, tagsData }: Props) {
  const themeMode = useAppSelector((state) => state.nav);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: ${themeMode.isDarkMode ? colors.Darkdef : "#fff"};
        }

        ::selection {
          background: ${themeMode.Primary};
          color: ${adjustTextColor(themeMode.Primary)};
        }
      `}</style>
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
    revalidate: 2,
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
