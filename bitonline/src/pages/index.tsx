import axios from "axios";
import type { NextPage } from "next";
import HomePage from "../components/page/home";
import PageLayout from "../components/template/components";

const Home: NextPage = ({ data }: any) => {
  return (
    <div>
      <PageLayout>{data ? <HomePage {...data} /> : <div></div>}</PageLayout>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const currencyData = axios({
    method: "GET",
    url: `https://api.bitbarg.me/api/v1/currencies?page=${1}`,
  });

  const [currency] = await Promise.all([currencyData]);

  return {
    props: {
      data: currency.data,
    },
  };
}

export default Home;
