import Client from "../Client";
import { PlayerEvents } from "discord-music-player";

interface Run {
  (...any: any[]);
}

export interface PlayerEvent {
  name: keyof PlayerEvents;
  run: Run;
}
