import "swiper/css";
import LatestProducts from "./common/LatestProducts.jsx";
import FeaturedProducts from "./common/FeaturedProducts.jsx";
import Hero from "./common/Hero.jsx";
import Layout from "./common/Layout.jsx";

const Home = () => {
  return (
    <div>
      <Layout>
        <Hero />
        <LatestProducts />
        <FeaturedProducts />
      </Layout>
    </div>
  );
};

export default Home;
