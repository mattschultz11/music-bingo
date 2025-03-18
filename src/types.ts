import { DateTime } from "effect";

type Game = {
  readonly id: string;
  readonly week: number;
  readonly teams: [string, string] | [];
  readonly dateTime: DateTime.Zoned;
  readonly date: string;
  readonly time: string;
};

type GameSerialized = {
  readonly week: number;
  readonly teams: [string, string] | [];
  readonly dateTime: string;
};

type Position = "REP" | "G" | "F" | "D" | "F/D" | "D/F";
type Rating = 5.0 | 4.5 | 4.0 | 3.5 | 3.0 | 2.5 | 2.0 | 1.5 | 1.0;

type Player = {
  readonly team: string;
  readonly name: string;
  readonly position: Position;
  readonly rating: Rating;
  readonly weight: number;
  readonly unavailability: boolean[];
};

export type { Game, GameSerialized, Player };
