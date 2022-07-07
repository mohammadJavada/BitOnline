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
  const { sortLists, setSortLists } = useContext(HomeContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(sort ? [] : dataList);

  const [searchData, setSearchData] = useState<any>([]);

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

  useEffect(() => {
    (async function () {
      if (isFetch) {
        try {
          setLoading(true);
          const response = await axios.get(
            `${url}?page=${page}&sort=${trueSort(sort)}&q=${search}`
          );
          const { data }: any = response;
          const list = data?.result?.items;
          if (search) {
            setSearchData((post: any) => [...post, ...list]);
          } else if (sort) {
            setSortLists((post: any) => [...post, ...list]);
          } else {
            setSearchData([]);
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
      return searchData;
    } else if (sort && isFetch) {
      return sortLists;
    }
    return data;
  };

  return { data: handleSearch(), error, loading };
}
