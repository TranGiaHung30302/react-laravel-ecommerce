import ProductImg1 from "../../assets/images/Mens/two.jpg";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "./http";
import Loader from "./Loader";
import Nostate from "./Nostate";
import { toast } from "react-toastify";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  // const [loader, setLoader] = useState(false);

  const featuredProducts = async () => {
    const res = await fetch(`${apiUrl}/get-featured-products`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          console.log(result.data);
          setProducts(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  useEffect(() => {
    featuredProducts();
  }, []);

  return (
    <section className="section-2 py-5">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="row">
          {products &&
            products.map((product) => {
              return (
                <div className="col-md-3 col-6">
                  <div className="card product border-0">
                    <div className="card-img">
                      <img
                        src={product.image_url}
                        alt="..."
                        className="w-100"
                      />
                    </div>
                    <div className="card-body pt-3">
                      <a href="#">{product.title}</a>
                      <div className="price">
                        ${product.price}
                        {product.compare_price && (
                          <span className="text-decoration-line-through ms-2">
                            ${product.compare_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
