// types/index.ts
export interface User {
  name?: string;
  email?: string;
  image?: string;
}

export interface Room {
  name: string;
  participants: User[];
}

export interface StreamsMap {
  [key: string]: MediaStream;
}
