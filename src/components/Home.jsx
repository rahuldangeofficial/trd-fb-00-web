import PropTypes from "prop-types";
import { useState } from "react";
import { auth, signOut } from "../fireAdapter";
import Error from "./Error";
import {
  Button,
  Container,
  Card,
  Text,
  Row,
  Spacer,
  Loading,
} from "@nextui-org/react";

const Home = ({ userCredentials, setUserCredentials, setCurrentPage }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUserCredentials(null);
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
          <Text b size={15}>
            Email - {userCredentials.user.email}
          </Text>
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
            <Button onClick={handleSignOut} disabled={loading}>
              Sign Out
            </Button>
          )}
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

Home.propTypes = {
  userCredentials: PropTypes.object,
  setUserCredentials: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default Home;
