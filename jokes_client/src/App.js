import {
  Card,
  Divider,
  CardBody,
  Heading,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function App() {
  const [joke, setJoke] = useState(null);
  useEffect(() => {
    fetch("api/v1/random-joke/")
      .then((response) => response.json())
      .then((data) => setJoke(data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: joke?.height,
        // width: joke?.width,
        marginTop: "8%",
      }}
    >
      <Card>
        <CardBody>
          <Image
            src={joke?.url || ""}
            alt="Le chat"
            borderRadius="lg"
            width={joke?.width}
            height={joke?.height}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{joke?.setup}</Heading>
            <Text>{joke?.punchline}</Text>
          </Stack>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}

export default App;
