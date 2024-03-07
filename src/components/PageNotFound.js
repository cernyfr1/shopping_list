import { Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <VStack>
      <Heading>404 Page Not Found</Heading>
      <Button onClick={handleClick}>Go Home</Button>
    </VStack>
  );
}

export default PageNotFound;
