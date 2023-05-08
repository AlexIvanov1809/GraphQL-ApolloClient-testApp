interface IUser {
  id: string;
  username: string;
  age: number;
  posts: IPost[] | null;
}

interface IPost {
  id: string;
  title: string;
}

type CreateUser = {
  username: string;
  age: string;
};

export type { IUser, IPost, CreateUser };
