import React from "react";
import Layout from "./common/Layout";
import ProductImg1 from "../assets/images/Mens/two.jpg";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className="py-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Categories</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Kids
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Men
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Women
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Brands</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Puma
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Killer
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Lavis
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Flying Machine
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row pb-5">
              <div className="col-md-3 col-6">
                <div className="card product border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg1} alt="..." className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="#">Red Check Shirt</Link>
                    <div className="price">
                      $50{" "}
                      <span className="text-decoration-line-through">80$</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card product border-0">
                  <div className="card-img">
                    <img src={ProductImg1} alt="..." className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="#">Red Check Shirt</a>
                    <div className="price">
                      $50{" "}
                      <span className="text-decoration-line-through">80$</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card product border-0">
                  <div className="card-img">
                    <img src={ProductImg1} alt="..." className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="#">Red Check Shirt</a>
                    <div className="price">
                      $50{" "}
                      <span className="text-decoration-line-through">80$</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card product border-0">
                  <div className="card-img">
                    <img src={ProductImg1} alt="..." className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="#">Red Check Shirt</a>
                    <div className="price">
                      $50{" "}
                      <span className="text-decoration-line-through">80$</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card product border-0">
                  <div className="card-img">
                    <img src={ProductImg1} alt="..." className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="#">Red Check Shirt</a>
                    <div className="price">
                      $50{" "}
                      <span className="text-decoration-line-through">80$</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
