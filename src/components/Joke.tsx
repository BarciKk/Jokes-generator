import { IJokeProps } from "../../types/types";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import "animate.css";
import { Box, Flex, Stack, Text } from "@mantine/core";

export const Joke = ({
  id,
  setup,
  delivery,
  handleToggleLike,
  likedJokes,
}: IJokeProps) => {
  const isLiked = likedJokes.some((joke) => joke.id === id);

  return (
    <Stack sx={{ padding: "20px" }}>
      <Box sx={{ paddingBottom: "10px" }}>
        <Text>{setup}</Text>
      </Box>
      <Text>{delivery}</Text>
      <Flex
        justify="flex-end"
        sx={{
          cursor: "pointer",
          margin: "10px",
          color: "gray",
        }}
      >
        <ThumbUpAltIcon
          fontSize="large"
          className={`likeButton ${isLiked ? "liked" : "disLike"}`}
          onClick={() => handleToggleLike(id, isLiked)}
        />
      </Flex>
    </Stack>
  );
};
