import { useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductImg from "../assets/images/Mens/two.jpg";
import ProductImg2 from "../assets/images/Mens/three.jpg";
import ProductImg3 from "../assets/images/Mens/four.jpg";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { apiUrl } from "./common/http";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const params = useParams();
  const [rating, setRating] = useState(4);

  const fetchProduct = async () => {
    const res = await fetch(`${apiUrl}/get-product/${params.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          console.log(result);
          setProduct(result.data);
          setProductImages(result.data.product_images);
          setProductSizes(result.data.product_sizes);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12"></div>
          <nav aria-label="breadcrumb" className="py-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/shop">Shop</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Product title
              </li>
            </ol>
          </nav>
        </div>

        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction={`vertical`}
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  // navigation={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  {productImages &&
                    productImages.map((productImage, index) => {
                      return (
                        <SwiperSlide>
                          <div className="content" key={`image-${index}`}>
                            <img
                              src={productImage.image_url}
                              alt=""
                              height={100}
                              className="w-100"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
              <div className="col-10">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  loop={true}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {productImages &&
                    productImages.map((productImage, index) => {
                      return (
                        <SwiperSlide>
                          <div className="content" key={`image-${index}`}>
                            <img
                              src={productImage.image_url}
                              alt=""
                              // height={100}
                              className="w-100"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h2>{product.title}</h2>
            <div className="d-flex">
              <Rating size={20} readonly initialValue={rating} />
              <span className="pt-1 ps-2">10 reviews</span>
            </div>

            <div className="price h3">
              ${product.price}
              {product.compare_price && (
                <span className="ms-2 text-decoration-line-through">
                  ${product.compare_price}
                </span>
              )}
            </div>

            <div className="">{product.short_description}</div>

            <div className="pt-3">
              <strong>Select Size:</strong>
              <div className="sizes pt-2">
                {productSizes &&
                  productSizes.map((productSize) => {
                    console.log(productSize);
                    return (
                      <button className="btn btn-size ms-1">
                        {productSize.size.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="add-to-cart my-4">
              <button className="btn btn-primary text-uppercase">
                Add to Cart
              </button>
            </div>

            <hr />

            <div className="">
              <strong>SKU: </strong> {product.sku}
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey={2}
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey={1} title="Description">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </Tab>
              <Tab eventKey={2} title="Reviews (10)">
                Reviews
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
