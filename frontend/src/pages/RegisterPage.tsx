import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";

import { registerAction } from "../store/actions/AuthAction";
import { authSelectorState } from "../store/selectors/AuthSelector";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(authSelectorState);

  const [data, setData] = useState({
    full_name: "",
    email: "",
    telephone: "",
    password: "",
    password2: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerAction(data) as any);
  };

  return (
    <>
      <NavBar />
      <br />
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            placeholder="Full Name"
            onChange={handleOnChange}
            name="full_name"
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={handleOnChange}
            name="email"
          />
        </div>

        <div>
          <label htmlFor="">Telephone</label>
          <input
            type="text"
            placeholder="Telephone"
            onChange={handleOnChange}
            name="telephone"
          />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={handleOnChange}
            name="password"
          />
        </div>

        <div>
          <label htmlFor="">Password confirm</label>
          <input
            type="password"
            placeholder="Password confirm"
            onChange={handleOnChange}
            name="password2"
          />
        </div>
        {loading ? (
          <button className="btn btn-primary" type="submit" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <button type="submit">Sigin</button>
        )}
      </form>
    </>
  );
};

export default RegisterPage;
