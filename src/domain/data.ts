import { VideoData } from "./video-data";

export class Data {
  description!: Description;
  videos!: VideoData[];
}

export interface Description {
  generatedOn: string,
  name: string,
  version: string,
  url: string
}