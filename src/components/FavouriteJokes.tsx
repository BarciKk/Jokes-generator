import { Joke } from "./Joke";
import { useContext } from "react";
import { JokesAndLikeHanlder } from "../App";
import { JokeContext, Title } from "../styledComponents/StyledComponents";
import { motion as m } from "framer-motion";

export const FavouriteJokes = () => {
  const context = useContext(JokesAndLikeHanlder);
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "backOut" }}
      className="fav"
    >
      {context?.likeJoke.length === 0 && (
        <Title>You don't have liked any jokes yet</Title>
      )}
      <JokeContext>
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
      </JokeContext>
    </m.div>
  );
};
