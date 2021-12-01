export type TabDataTypes = {
  title: string;
  icon: string;
  _id: string;
  items: TabDataItems[];
};

export type TabDataItems = {
  title: string;
  desc: string;
  icon: string;
  img: string[];
  link: string;
  tags: Array<TabDataItems>;
};
