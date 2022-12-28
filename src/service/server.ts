import jsonData from "./data.json";
import { IJoke } from "../../types/types";

export const getJoke = (): Promise<IJoke> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const randomNumberOfJoke = Math.floor(Math.random() * (10 - 0));

      const joke = jsonData.data[randomNumberOfJoke];

      if (!joke) {
        rej(undefined);
      }

      res(joke);
    }, 2500);
  });
};
