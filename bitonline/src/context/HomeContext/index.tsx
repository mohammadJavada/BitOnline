import React, { createContext, ReactNode, useState } from "react";

export const HomeContext = createContext<any>({});

export const HomeProvider = (props: any) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState(0);
  const [type, setType] = useState("تومان");

  const sortList = ["حالت پیش فرض", "کمترین قیمت", "بیشترین قیمت"];

  return (
    <HomeContext.Provider
      value={{ search, setSearch, sort, setSort, sortList, type, setType }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};
