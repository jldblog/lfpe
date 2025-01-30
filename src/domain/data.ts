import { Video } from "./video";

export class Data {
  description!: Description;
  videos!: Video[];
}

export interface Description {
  generatedOn: string,
  name: string,
  version: string,
  url: string
}