import DataFetching from "./DataFetching";
import { Routes, Route } from "react-router-dom";
import { FavouriteJokes } from "./FavouriteJokes";
import { useState } from "react";
import { IJoke, HandleToggleLike } from "./types";
import { createContext } from "react";
import { AnimatePresence } from "framer-motion";

export const JokesAndLikeHanlder = createContext<null | {
  likeJoke: IJoke[];
  handleToggleLike: HandleToggleLike;
}>(null);

function App() {
  const [joke, setJoke] = useState<IJoke>();
  const [likeJoke, setLikeJoke] = useState<IJoke[]>([]);

  const handleToggleLike = (targetedJokeId: IJoke["id"], isLiked: boolean) => {
    if (joke && !isLiked) {
      setLikeJoke([...likeJoke, joke]);

      return;
    }

    if (isLiked) {
      setLikeJoke(
        likeJoke.filter((likedJoke) => likedJoke.id !== targetedJokeId)
      );
    }
  };

  return (
    <AnimatePresence>
      <JokesAndLikeHanlder.Provider value={{ likeJoke, handleToggleLike }}>
        <Routes>
          <Route
            path="/"
            element={<DataFetching joke={joke} setJoke={setJoke} />}
          />
          <Route path="/favourite-jokes" element={<FavouriteJokes />} />
        </Routes>
      </JokesAndLikeHanlder.Provider>
    </AnimatePresence>
  );
}

export default App;
