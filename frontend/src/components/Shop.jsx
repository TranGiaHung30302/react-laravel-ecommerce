import Layout from "./common/Layout";
import ProductImg1 from "../assets/images/Mens/two.jpg";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiUrl } from "./common/http";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoriesChecked, setCategoriesChecked] = useState([]);
  const [brandsChecked, setBrandsChecked] = useState([]);

  const fetchProducts = () => {
    let search = [];
    let params = "";

    if (categoriesChecked.length > 0) {
      search.push(["category_id", categoriesChecked]);
    }

    if (brandsChecked.length > 0) {
      search.push(["brand_id", brandsChecked]);
    }

    if (search.length > 0) {
      params = new URLSearchParams(search);
      console.log(params.toString());
    }

    const res = fetch(`${apiUrl}/get-products?${params.toString()}`, {
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
          setProducts([]);
        }
      });
  };
  // const [loader, setLoader] = useState(false);

  const fetchCategories = async () => {
    console.log(categoriesChecked);
    const res = await fetch(`${apiUrl}/get-categories`, {
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
          setCategories(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/get-brands`, {
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
          setBrands(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const handleCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCategoriesChecked((pre) => [...pre, value]);
    } else {
      setCategoriesChecked(categoriesChecked.filter((id) => id != value));
    }
  };

  const handleBrand = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setBrandsChecked((pre) => [...pre, value]);
    } else {
      setBrandsChecked(brandsChecked.filter((id) => id != value));
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [categoriesChecked, brandsChecked]);

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
                  {categories &&
                    categories.map((category) => {
                      return (
                        <li className="mb-2" key={`category-${category.id}`}>
                          <input
                            type="checkbox"
                            value={category.id}
                            onClick={handleCategory}
                          />
                          <label htmlFor="" className="ps-2">
                            {category.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="mb-3">Brands</h3>
                <ul>
                  {brands &&
                    brands.map((brand) => {
                      return (
                        <li className="mb-2" key={`brand-${brand.id}`}>
                          <input
                            type="checkbox"
                            value={brand.id}
                            onClick={handleBrand}
                          />
                          <label htmlFor="" className="ps-2">
                            {brand.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row pb-5">
              {products &&
                products.map((product) => {
                  return (
                    <div
                      className="col-md-3 col-6"
                      key={`product-${product.id}`}
                    >
                      <div className="card product border-0">
                        <div className="card-img">
                          <Link to="/product">
                            <img
                              src={product.image_url}
                              alt="..."
                              className="w-100"
                            />
                          </Link>
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
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
