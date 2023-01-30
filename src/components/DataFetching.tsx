import { useEffect, useState, useCallback, useRef, useContext } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Text, Button, Loader, Title, Stack, MediaQuery } from "@mantine/core";
import { IDataFetchingProps, HandleToggleLike } from "../../types/types";
import { getJoke } from "../service/server";
import { Link } from "react-router-dom";
import { Joke } from "./Joke";
import { JokesAndLikeHanlder } from "../App";
import { motion as m } from "framer-motion";

const DataFetching = ({ joke, setJoke }: IDataFetchingProps) => {
  const [isError, setIsError] = useState(false);
  const [isAllowedRequest, setIsAllowedRequest] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(JokesAndLikeHanlder);

  const userJokeRequest = useRef(0);
  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);
    if (!isAllowedRequest) return;

    try {
      const data = await getJoke();
      if (data.error || !data.setup || !data.delivery) throw new Error(); //this is error handler (it won't be here because all the jokes have data.setup and data.delivery)
      setJoke(data);

      userJokeRequest.current += 1;
    } catch {
      setIsError(true);
    } finally {
      setIsAllowedRequest(false);
      setIsLoading(false);
    }
  }, [setJoke]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isLoading && (userJokeRequest.current !== 0 || isError)) {
      setTimeout(() => {
        setIsAllowedRequest(true);
      }, 3000);
    }
  }, [userJokeRequest.current, isError]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="container"
    >
      <Link to="/favourite-jokes">Favourite </Link>
      <Stack align="center">
        <MediaQuery
          largerThan={250}
          styles={{
            fontSize: 20,
            width: "auto",
          }}
        >
          <Stack
            ta="center"
            sx={{
              background: "white",
              borderRadius: "1rem",
            }}
          >
            {!isError && joke && !isLoading && (
              <Joke
                id={joke.id}
                setup={joke.setup}
                delivery={joke.delivery}
                handleToggleLike={context?.handleToggleLike as HandleToggleLike}
                likedJokes={context?.likeJoke ?? []}
              />
            )}
          </Stack>
        </MediaQuery>
        {isLoading && <Loader variant="dots" size="xl" color="violet" />}
      </Stack>

      <Stack>
        {isError && <Title order={1}>Error</Title>}
        {!isLoading && (
          <Button
            color="violet"
            rightIcon={<KeyboardDoubleArrowRightIcon />}
            onClick={fetchData}
            disabled={!isAllowedRequest}
            size="lg"
          >
            <Text>Next jokie</Text>
          </Button>
        )}
      </Stack>
    </m.div>
  );
};

export default DataFetching;
