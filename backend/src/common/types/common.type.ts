import { Branded } from "./types";

export type Uuid = Branded<string, "Uuid">;

export type MessageResponse = {
  message: string;
};
