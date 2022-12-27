import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  margin-left: 25rem;
  color: palevioletred;
`;
const JokeContainer = styled.div`
  text-align: center;
  border-radius: 1rem;
  height: 200px;
  width: 450px;
  background-color: rgb(255, 255, 255);
`;

const FavJokesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const iconStyles = {
  fontSize: "50px",
};
const JokeContext = styled.div`
  margin-top: 5rem;
  border-radius: 1rem;
  text-align: center;
  width: 30rem;
  max-height: 500px;
  background-color: white;
`;

const SingleJoke = styled.div`
  text-align: center;
  border-radius: 1rem;
  height: 200px;
  width: 450px;
  background-color: rgb(255, 255, 255);
`;

export {
  Title,
  iconStyles,
  FavJokesWrapper,
  JokeContainer,
  JokeContext,
  SingleJoke,
};
