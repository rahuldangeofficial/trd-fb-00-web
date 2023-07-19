import PropTypes from "prop-types";
import { useState } from "react";
import { forgotPassword } from "../fireAdapter";
import Error from "./Error";
import {
  Button,
  Input,
  Container,
  Card,
  Text,
  Row,
  Spacer,
  Loading,
} from "@nextui-org/react";

const ForgotPassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleForgotPassword = () => {
    if (!emailValidationRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    setLoading(true);

    forgotPassword(email)
      .then(() => {
        setSuccessMessage("Password reset email sent successfully.");
        setCurrentPage("signIn");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Container
      css={{ dflex: "center", fd: "column", minHeight: "80vh", w: "100vw" }}
    >
      <Card css={{ m: "$10", maxWidth: "400px" }}>
        <Row
          css={{ m: "$0", p: "$5", pt: "$15", pb: "$10" }}
          justify="center"
          align="center"
          style={{ border: "0px solid red" }}
        >
          <Text b size={20}>
            Send Password Reset Link
          </Text>
        </Row>
        <Spacer y={1} />
        <Row
          css={{ m: "$0", p: "$5" }}
          justify="center"
          align="center"
          style={{ border: "0px solid red" }}
        >
          <Input
            clearable
            width="300px"
            type="email"
            labelPlaceholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Row>
        <Spacer y={1} />
        <Row
          css={{ m: "$0", p: "$5" }}
          justify="center"
          align="center"
          style={{ border: "0px solid red" }}
        >
          {loading ? (
            <Button disabled>
              <Loading color="currentColor" size="sm" />
            </Button>
          ) : (
            <Button onClick={handleForgotPassword} disabled={loading}>
              Send
            </Button>
          )}
        </Row>
        <Row
          css={{ m: "$0", p: "$5" }}
          justify="center"
          align="center"
          style={{ border: "0px solid red" }}
        >
          {successMessage && <p>{successMessage}</p>}
        </Row>
        <Row
          css={{ m: "$0", p: "$5" }}
          justify="center"
          align="center"
          style={{ border: "0px solid red" }}
        >
          {error && <Error message={error} />}
        </Row>
      </Card>
    </Container>
  );
};

ForgotPassword.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default ForgotPassword;
