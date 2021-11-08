import Client from "../Client";
import { DisTubeEvents } from "distube";

interface Run {
  (...any: any[]);
}

export interface DistubeEvent {
  name: keyof DisTubeEvents;
  run: Run;
}
