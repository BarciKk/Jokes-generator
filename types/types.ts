interface IJoke {
  error: boolean;
  category: string;
  type: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export type HandleToggleLike = (
  targetedJokeId: IJoke["id"],
  isLiked: boolean
) => void;

interface IDataFetchingProps {
  joke: IJoke | undefined;
  setJoke: React.Dispatch<React.SetStateAction<IJoke | undefined>>;
}

export type IJokeProps = Pick<IJoke, "id" | "setup" | "delivery"> & {
  likedJokes: IJoke[];
  handleToggleLike: HandleToggleLike;
};
export type { IJoke, IDataFetchingProps };
