import React, { useContext } from "react";
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from "../common/http.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth.jsx";

const Login = () => {
  const { login } = useContext(AdminAuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    const res = await fetch(apiUrl + "admin/login", {
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
          const adminInfo = {
            token: result.token,
            id: result.id,
            name: result.name,
          };

          localStorage.setItem("adminInfo", JSON.stringify(adminInfo));

          login(adminInfo);

          navigate("/admin/dashboard");
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <Layout>
      <div className="container py-5 d-flex justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
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
                {errors.email && (
                  <p className="invalid-feedback">{errors.password?.message}</p>
                )}
              </div>

              <button className="btn btn-secondary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
