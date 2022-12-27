import { useEffect, useState, useCallback, useRef, useContext } from "react";
import Lottie from "react-lottie";
import * as loadingIconAnimationData from "./icons/loadingIcon.json";
import { DupaDupa, HandleToggleLike } from "./types";
import { getJoke } from "./service/server";
import { Link } from "react-router-dom";
import { Joke } from "./Joke";
import { JokesAndLikeHanlder } from "./App";
import { motion as m } from "framer-motion";

import { SingleJoke } from "./styledComponents/StyledComponents";

const DataFetching = ({ joke, setJoke }: DupaDupa) => {
  const [isError, setIsError] = useState(false);
  const [isAllowedRequest, setIsAllowedRequest] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(JokesAndLikeHanlder);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingIconAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const userJokeRequest = useRef(0);
  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true); //przed samym fetchem ustawiam na true
    if (!isAllowedRequest) return;

    try {
      const data = await getJoke();
      if (data.error || !data.setup || !data.delivery) throw new Error();

      setJoke(data);

      userJokeRequest.current += 1;
    } catch {
      setIsError(true);
    } finally {
      setIsAllowedRequest(false);
      setIsLoading(false); //jesli fetch przejdzie to ustawiam na false
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
      <div className="fav-jokes-link">
        <Link to="/favourite-jokes">Favourite </Link>
      </div>

      <SingleJoke>
        {!isError && joke && !isLoading && (
          <Joke
            id={joke.id}
            setup={joke.setup}
            delivery={joke.delivery}
            handleToggleLike={context?.handleToggleLike as HandleToggleLike}
            likedJokes={context?.likeJoke ?? []}
          />
        )}
        {isLoading && (
          <Lottie options={defaultOptions} height={120} width={120}></Lottie>
        )}{" "}
      </SingleJoke>
      <div className="next-joke-wrapper">
        {isError && <h1>Error</h1>}
        {!isLoading && (
          <button
            className="next-joke-button"
            onClick={fetchData}
            disabled={!isAllowedRequest}
          >
            <span className="circle">
              <span className="arrow"></span>
            </span>
            <span className="text">Next Joke</span>
          </button>
        )}
      </div>
    </m.div>
  );
};

export default DataFetching;
