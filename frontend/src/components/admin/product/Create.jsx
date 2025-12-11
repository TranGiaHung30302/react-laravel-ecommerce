import React, { useEffect, useState, useRef, useMemo } from "react";
import Layout from "../../common/Layout";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { apiUrl, adminToken } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const Create = ({ placeholder }) => {
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const saveProduct = async (data) => {
    setDisable(true);
    const formData = { ...data, description: content, gallery: gallery };
    console.log(formData);

    const res = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);
        if (result.status == 200) {
          toast.success(result.message);
          navigate("/admin/products");
        } else {
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
      });
  };

  const fetchCategories = async () => {
    // setLoader(true);
    const res = await fetch(`${apiUrl}/categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // setLoader(false);
        if (result.status == 200) {
          console.log(result.data);
          setCategories(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          setBrands(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const fetchSizes = async () => {
    const res = await fetch(`${apiUrl}/sizes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSizes(result.data);
      });
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setDisable(true);

    const res = await fetch(`${apiUrl}/temp-images`, {
      method: "POST",
      headers: {
        // "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        // gallery.push(result.data.id);
        // setGallery(gallery);

        // galleryImages.push(result.data.image_url);
        // setGalleryImages(galleryImages);
        setGallery((prev) => [...prev, result.data.id]);
        setGalleryImages((prev) => [...prev, result.data.image_url]);
        setDisable(false);
      });
  };

  const deleteImage = (image) => {
    const newGallery = galleryImages.filter((gallery) => gallery != image);
    setGalleryImages(newGallery);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, []);

  return (
    <Layout>
      <div className="container mb-5">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products / Create</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  {/* ------------------------------------- */}
                  {/* TITLE */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("title", {
                        required: "The title field is required.",
                      })}
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      placeholder="Title"
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors.title?.message}
                      </p>
                    )}
                  </div>

                  {/* CATEGORY */}
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="" className="form-label">
                        Category<span className="text-danger">*</span>
                      </label>
                      <select
                        {...register("category_id", {
                          required: "Please select a category",
                        })}
                        className={`form-control ${
                          errors.category_id ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select a Category</option>

                        {categories &&
                          categories.map((category) => {
                            return (
                              <option
                                key={`category-${category.id}`}
                                value={category.id}
                              >
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                      {errors.category_id && (
                        <p className="invalid-feedback">
                          {errors.category_id?.message}
                        </p>
                      )}
                    </div>

                    {/* BRAND */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="" className="form-label">
                        Brand <span className="text-danger">*</span>
                      </label>
                      <select
                        {...register("brand_id", {
                          required: "Please select a brand",
                        })}
                        className={`form-control ${
                          errors.brand_id ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select a Brand</option>
                        {brands &&
                          brands.map((brand) => {
                            return (
                              <option
                                key={`brand-${brand.id}`}
                                value={brand.id}
                              >
                                {brand.name}
                              </option>
                            );
                          })}
                      </select>
                      {errors.brand_id && (
                        <p className="invalid-feedback">
                          {errors.brand_id?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* SHORT DESCRIPTION */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      type="text"
                      {...register("short_description")}
                      className="form-control"
                      placeholder="Short Description"
                      rows={3}
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      // onChange={(newContent) => {}}
                    />
                  </div>

                  <h3 className="mb-3 py-3 border-bottom">Price</h3>

                  <div className="row">
                    {/* PRICE */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="" className="form-label">
                        Price <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("price", {
                          required: "The price field is required.",
                        })}
                        className={`form-control ${
                          errors.price ? "is-invalid" : ""
                        }`}
                        placeholder="Price"
                      />
                      {errors.price && (
                        <p className="invalid-feedback">
                          {errors.price?.message}
                        </p>
                      )}
                    </div>

                    {/* DISCOUNTED PRICE */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="" className="form-label">
                        Discounted Price
                      </label>
                      <input
                        type="text"
                        {...register("compare_price")}
                        className="form-control"
                        placeholder="Discounted Price"
                      />
                    </div>
                  </div>

                  <h3 className="mb-3 py-3 border-bottom">Inventory</h3>

                  <div className="row">
                    {/* SKU */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="" className="form-label">
                        SKU <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("sku", {
                          required: "The sku field is required.",
                        })}
                        className={`form-control ${
                          errors.sku ? "is-invalid" : ""
                        }`}
                        placeholder="SKU"
                      />
                      {errors.sku && (
                        <p className="invalid-feedback">
                          {errors.sku?.message}
                        </p>
                      )}
                    </div>

                    {/* BARCODE */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="" className="form-label">
                        Barcode
                      </label>
                      <input
                        type="text"
                        {...register("barcode")}
                        className="form-control"
                        placeholder="Barcode"
                      />
                    </div>
                  </div>

                  <div className="row">
                    {/* QTY */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="text"
                        {...register("qty")}
                        className="form-control"
                        placeholder="Quantity"
                      />
                    </div>

                    {/* STATUS */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="" className="form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <select
                        {...register("status", {
                          required: "Please select a status",
                        })}
                        className={`form-control ${
                          errors.status ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select a Status</option>
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                      {errors.status && (
                        <p className="invalid-feedback">
                          {errors.status?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* FEATURED */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Featured <span className="text-danger">*</span>
                    </label>
                    <select
                      {...register("is_featured", {
                        required: "Please select",
                      })}
                      className={`form-control ${
                        errors.is_featured ? "is-invalid" : ""
                      }`}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    {errors.is_featured && (
                      <p className="invalid-feedback">
                        {errors.is_featured?.message}
                      </p>
                    )}
                  </div>

                  <h3 className="mb-3 py-3 border-bottom">Sizes</h3>
                  {/* SIZES */}
                  <div class="mb-3">
                    <label htmlFor="" className="form-label pe-3">
                      Sizes <span className="text-danger">*</span>
                    </label>
                    {sizes &&
                      sizes.map((size) => {
                        return (
                          <div
                            className="form-check-inline ps-2"
                            key={`size-${size.id}`}
                          >
                            <input
                              {...register("sizes", {
                                required: "Please select a size",
                              })}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSizesChecked([...sizesChecked, size.id]);
                                } else {
                                  setSizesChecked(
                                    sizesChecked.filter((sid) => size.id != sid)
                                  );
                                }
                              }}
                              checked={sizesChecked.includes(size.id)}
                              // className="form-check-input"
                              type="checkbox"
                              value={size.id}
                              id={`size-${size.id}`}
                              className={`form-check-input ${
                                errors.sizes ? "is-invalid" : ""
                              }`}
                            />
                            <label
                              className="form-check-label ps-2"
                              for="{`size-${size.id}`}"
                            >
                              {size.name}
                            </label>
                          </div>
                        );
                      })}
                    {errors.sizes && (
                      <p className="invalid-feedback d-block">
                        {errors.sizes?.message}
                      </p>
                    )}
                  </div>

                  <h3 className="mb-3 py-3 border-bottom">Gallery</h3>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFile}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      {galleryImages &&
                        galleryImages.map((image, index) => {
                          return (
                            <div className="col-md-3" key={`image-${index}`}>
                              <div className="card shadow">
                                <img src={image} alt="" className="w-100" />
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteImage(image)}
                                >
                                  Delelte
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <button
                // disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
