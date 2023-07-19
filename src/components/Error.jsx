import PropTypes from "prop-types";
import { Badge } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";

const Error = ({ message }) => {
  return (
    <Card variant="bordered">
      <Card.Body>
        <Badge isSquared color="error" variant="flat">
          Error
        </Badge>
        <Spacer y={0.5} />
        <Text size={12} b color="error">
          {message}
        </Text>
      </Card.Body>
    </Card>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
