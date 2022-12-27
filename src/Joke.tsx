import { IJokeProps } from "./types";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  FavJokesWrapper,
  iconStyles,
} from "./styledComponents/StyledComponents";
import "animate.css";

export const Joke = ({
  id,
  setup,
  delivery,
  handleToggleLike,
  likedJokes,
}: IJokeProps) => {
  const isLiked = likedJokes.some((joke) => joke.id === id);

  return (
    <FavJokesWrapper>
      <p>{setup}</p>
      <p>{delivery}</p>
      <ThumbUpAltIcon
        style={iconStyles}
        className={`likeButton ${isLiked ? "liked" : "disLike"}`}
        onClick={() => handleToggleLike(id, isLiked)}
      />
    </FavJokesWrapper>
  );
};
