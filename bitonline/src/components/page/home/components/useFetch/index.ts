import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HomeContext } from "../../../../../context";

export default function useFetch(
  url: string = "",
  dataList: any[] = [],
  page: number = 0,
  search: string = "",
  sort: number = 2,
  isFetch: boolean = false
) {
  const { sortLists, setSortLists, searchList, setSearchList } =
    useContext(HomeContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(sort ? [] : dataList);

  const trueSort = (sort: number) => {
    switch (sort) {
      case 0:
        return "";
      case 1:
        return 1;
      case 2:
        return 2;
    }
  };

  const handleUrl = () => {
    if (sort && !search) {
      return `${url}?page=${page}&sort=${trueSort(sort)}`;
    } else if (search && !sort) {
      return `${url}?page=${page}&q=${search}`;
    } else if (!sort && !search) {
      return `${url}?page=${page}`;
    }
    return `${url}?page=${page}&sort=${trueSort(sort)}&q=${search}`;
  };

  useEffect(() => {
    (async function () {
      if (isFetch) {
        try {
          setLoading(true);
          const response = await axios.get(handleUrl());
          const { data }: any = response;
          const list = data?.result?.items;
          if (search) {
            setSearchList((post: any) => [...post, ...list]);
            search.length >= 1 ? setData([]) : "";
          } else if (sort) {
            setSearchList([]);
            setSortLists((post: any) => [...post, ...list]);
          } else {
            setSearchList([]);
            setData((post: any) => [...post, ...list]);
          }
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, search, url, isFetch]);

  const handleSearch = () => {
    if (search && isFetch) {
      return searchList;
    } else if (sort && isFetch) {
      return sortLists;
    }
    return data;
  };

  return { data: handleSearch(), error, loading };
}
