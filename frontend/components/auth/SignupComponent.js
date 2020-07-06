import { useState } from "react";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password, error, loading, message, showForm });
  };
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    console.log(e.target.value);
  };
  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            type="text"
            className="form-control"
            onChange={handleChange("name")}
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <input
            input={email}
            type="email"
            className="form-control"
            onChange={handleChange("email")}
            placeholder="Your Email"
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            placeholder="Your Password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  };
  return <React.Fragment>{signupForm()}</React.Fragment>;
};
export default SignupComponent;
