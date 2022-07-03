import type { NextPage } from "next";
import HomePage from "../components/page/home";
import PageLayout from "../components/template/components";

const Home: NextPage = () => {
  return (
    <div>
      <PageLayout>
        <HomePage />
      </PageLayout>
    </div>
  );
};

export default Home;
