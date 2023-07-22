import PropTypes from "prop-types";
import { useState } from "react";
import { signIn, signInWithGoogle } from "../fireAdapter";
import Error from "./Error";
import {
  Button,
  Input,
  Container,
  Card,
  Text,
  Link,
  Row,
  Spacer,
  Loading,
} from "@nextui-org/react";

const SignIn = ({ setUserCredentials, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordValidationRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  const passwordValidationMessage =
    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

  const handleSignIn = () => {
    if (!emailValidationRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    if (!passwordValidationRegex.test(password)) {
      setError(passwordValidationMessage);
      return;
    }

    setLoading(true);

    signIn(email, password)
      .then((userCredential) => {
        setUserCredentials(userCredential);
        setCurrentPage("home");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);

    signInWithGoogle()
      .then((userCredential) => {
        setUserCredentials(userCredential);
        setCurrentPage("home");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSignUp = () => {
    setCurrentPage("signUp");
  };

  const handleForgotPassword = () => {
    setCurrentPage("forgotPassword");
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
            Log in to trd-fb-00-web
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
          <Input.Password
            width="300px"
            type="password"
            labelPlaceholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <Button onClick={handleSignIn}>Log In</Button>
          )}
        </Row>
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
            <Button onClick={handleGoogleSignIn}>Log In With Google</Button>
          )}
        </Row>
        <Row
          css={{ m: "$0", p: "$5" }}
          justify="center"
          align="center"
          style={{ border: "0px solid red" }}
        >
          <Link
            color="$colors$primary"
            css={{ m: "$1" }}
            onClick={handleForgotPassword}
          >
            Forgotten account?
          </Link>
          <Text css={{ p: "$1" }}>·</Text>
          <Link
            color="$colors$primary"
            css={{ m: "$1" }}
            onClick={handleSignUp}
          >
            Sign up for trd-fb-00-web
          </Link>
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

SignIn.propTypes = {
  setUserCredentials: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default SignIn;
