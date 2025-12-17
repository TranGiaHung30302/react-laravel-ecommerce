import React, { useContext } from "react";
import Layout from "./common/Layout.jsx";
import { useForm } from "react-hook-form";
import { apiUrl } from "./common/http.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "./context/AdminAuth.jsx";

const Register = () => {
  //   const { login } = useContext(AdminAuthContext);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    const res = await fetch(apiUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.status == 200) {
          toast.success(result.message);

          navigate("/account/login");
        } else {
          toast.error(result.message);
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
      });
  };

  return (
    <Layout>
      <div className="container py-5 d-flex justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
              <h2 className="w-100 text-center mb-4">Register</h2>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Name
                </label>
                <input
                  {...register("name", {
                    required: "The name field is required.",
                  })}
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="invalid-feedback">{errors.name?.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The email field is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address.",
                    },
                  })}
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.email?.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "The password field is required.",
                  })}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password?.message}</p>
                )}
              </div>

              <button className="btn btn-secondary w-100">Register</button>

              <div className="d-flex justify-content-center pt-4 pb-2">
                Already have an account?
                <a
                  href="/account/login"
                  className="ms-1 text-decoration-underline"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
