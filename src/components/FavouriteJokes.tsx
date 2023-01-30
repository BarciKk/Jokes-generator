import { Joke } from "./Joke";
import { useContext } from "react";
import { JokesAndLikeHanlder } from "../App";
import { motion as m } from "framer-motion";
import { Box, ScrollArea, Stack, Title } from "@mantine/core";

export const FavouriteJokes = () => {
  const context = useContext(JokesAndLikeHanlder);
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "backOut" }}
    >
      <Stack align="center">
        {context?.likeJoke.length === 0 && (
          <Title color="violet" order={1} mt="xl">
            You don't have liked any jokes yet
          </Title>
        )}
        <ScrollArea
          sx={{
            height: "40rem",
          }}
          type="never"
          scrollbarSize={10}
        >
          <Box
            sx={{
              textAlign: "center",
              width: "30rem",
              marginTop: "5rem",
              background: "white",
              borderRadius: "1rem",
            }}
          >
            {context?.likeJoke.map(({ id, setup, delivery }) => (
              <Joke
                id={id}
                key={id}
                setup={setup}
                delivery={delivery}
                handleToggleLike={context.handleToggleLike}
                likedJokes={context.likeJoke}
              />
            ))}
          </Box>
        </ScrollArea>
      </Stack>
    </m.div>
  );
};
