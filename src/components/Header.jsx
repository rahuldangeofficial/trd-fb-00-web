import { Navbar, Text } from "@nextui-org/react";

const Header = () => {
  return (
    <>
      <Navbar variant="sticky">
        <Navbar.Brand>
          <Text b hideIn="xs">
            trd-fb-00-web
          </Text>
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default Header;
