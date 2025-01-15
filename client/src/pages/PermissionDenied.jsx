import React from "react";
import { Link } from "react-router-dom";

function PermissionDenied() {
  return (
    <section className="error-page">
      <div className="center">
        <h2>Permission Denied</h2>{" "}
        <p>
          Please{" "}
          <Link className="small__sign" to="/login">
            login
          </Link>{" "}
          or{" "}
          <Link className="small__sign" to="/register">
            register
          </Link>{" "}
        </p>
        <Link to="/" className="btn primary">
          Go Back Home
        </Link>
      </div>
    </section>
  );
}

export default PermissionDenied;
