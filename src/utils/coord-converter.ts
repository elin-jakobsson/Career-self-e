import { Coord } from '@/models';

export const coordAsExperience = ({ x = 0 }: Coord, round: boolean = true) =>
  round ? Math.round(x * 10) : x * 10;

export const coordAsInterest = ({ y = 0 }: Coord, round: boolean = true) =>
  y === 0 ? 0 : round ? Math.round((1 - y) * 10) : (1 - y) * 10;
