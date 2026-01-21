import * as fs from 'fs';
import { google, youtube_v3 } from 'googleapis';
import { parse as yamlParse } from "yaml";
import { VideoData } from '../domain/video-data.js';

const USERNAME: string = 'lexfridman';
const MAX_RESULTS: number = 50; // "Acceptable values are 1 to 50, inclusive. The default value is 5."
const MAX_IDS: number = 50;
const DB_FILE_NAME: string = 'db.json';
var DESTINATION_DIR: string = 'src/assets';

var youtube: youtube_v3.Youtube;
var videoDB: any = [];
var patches: any;

export class TitleData {
  guests: string[] = [];
  title!: string;
  shortTitle!: string;
  episode!: number;
}

async function init() {
  const args = process.argv.slice(2);

  if (args.length != 0) {
    DESTINATION_DIR = args[0];
  }

  if (!fs.existsSync(DESTINATION_DIR)) {
    fs.mkdirSync(DESTINATION_DIR, { recursive: true });
    console.log('Creating directory', DESTINATION_DIR);
  }

  const api_key = process.env['YOUTUBE_API_KEY'];

  if (api_key) {
    youtube = google.youtube({
      version: 'v3',
      auth: api_key
    });
  }
  else {
    console.error('Environment variable not found: YOUTUBE_API_KEY');
    process.exit(1);
  }

  const packageJson: any = readPackageFile();
  patches = readYamlPatchesFile();

  videoDB = {
    description: {},
    videos: []
  }

  videoDB.description.generatedOn = new Date().toISOString();
  videoDB.description.name = packageJson.name;
  videoDB.description.version = packageJson.version;
  videoDB.description.url = packageJson.url;
}

function readPackageFile(): any {
  const data = fs.readFileSync('./package.json', { encoding: 'utf8', flag: 'r' });

  return JSON.parse(data.toString());
}

function readYamlPatchesFile(): any {
  const data = fs.readFileSync('./src/scripts/patches.yaml', { encoding: "utf8" });

  return yamlParse(data);
}

function parseTitle(title: string): TitleData {
  var titleData: TitleData = new TitleData();

  // exemple : "Neil Gershenfeld: Self-Replicating Robots and the Future of Fabrication | Lex Fridman Podcast #380"
  const regexp = /^(.*?): (.*) \|(.*)#([0-9]+)$/;
  const match = title.match(regexp);

  if (match != null) {
    titleData.guests.push(match[1]);
    titleData.title = title;
    titleData.shortTitle = match[2];
    titleData.episode = parseInt(match[4]);
  }
  else {
    titleData.title = title;
    titleData.shortTitle = title;
    titleData.episode = 0;
  }

  return titleData
}

function saveToJsonFile(file: string, data: any, space: number) {
  fs.writeFile(file, JSON.stringify(data, null, space), (error) => {
    if (error) {
      console.log(error);
      throw error;
    }

    console.log('Saved', file);
  });
}

async function save(videoIDs: string[]) {
  if (videoIDs.length != 0) {
    console.log(videoIDs.length, 'videos found');

    for (let i = 0; i < videoIDs.length;) {
      const vids = videoIDs.slice(i, i + MAX_IDS);

      const response = await youtube.videos.list({
        id: vids,
        part: ['snippet', 'statistics', 'contentDetails']
      });

      saveVideoData(response.data.items);

      if (vids.length) {
        i = i + MAX_IDS;
      }
      else {
        break;
      }
    }

    videoDB.videos = videoDB.videos.sort(VideoData.videosByNumberComparator);
  }
  else {
    console.log('No video found');
  }

  console.log(videoDB.videos.length, 'episodes found');
  saveToJsonFile(DESTINATION_DIR + '/' + DB_FILE_NAME, videoDB, 0);
}

function patchTitle(videoID: string, snippet: any) {
  const found = patches.videos.find((element: any) => element.id == videoID);

  if (found && found.title) {
    snippet.title = found.title;
  }
}

function patchGuests(videoID: string, titleData: TitleData) {
  const found = patches.videos.find((element: any) => element.id == videoID);

  if (found && found.guests) {
    titleData.guests = found.guests;
  }
}

function patchDescription(videoID: string, snippet: any) {
  const found = patches.videos.find((element: any) => element.id == videoID);

  if (found && found.replace?.length == 2) {
    snippet.description = snippet.description.replace(found.replace[0], found.replace[1]);
  }
}

function getTranscriptUrl(description: string) {
  // exemple : *Transcript:*\nhttps://lexfridman.com/paul-rosolie-3-transcript\n\n
  const regexp = /\*Transcript:\*\n(.*?)\n\n/;
  const match = description.match(regexp);

  return match ? match[1] : '';
}

function saveVideoData(videoItems: any) {
  videoItems.forEach((item: any) => {
    var videoData = new VideoData();
    const snippet = item.snippet;
    const videoID = item.id;

    patchTitle(videoID, snippet);
    patchDescription(videoID, snippet);
    const titleData: TitleData = parseTitle(snippet.title);
    patchGuests(videoID, titleData);

    if (titleData.guests.length) {
      const retrievedAt = new Date().toISOString();
      const publishedAt = snippet.publishedAt;

      videoData.id = videoID;
      videoData.retrievedAt = retrievedAt;
      videoData.publishedAt = publishedAt;
      videoData.duration = item.contentDetails.duration;
      videoData.originalTitle = titleData.title;
      videoData.shortTitle = titleData.shortTitle;
      videoData.guests = titleData.guests;
      videoData.episode = titleData.episode;
      videoData.description = snippet.description;
      videoData.tags = snippet.tags;
      videoData.thumbnails = snippet.thumbnails;
      videoData.statistics = item.statistics;
      videoData.transcript = getTranscriptUrl(snippet.description);

      console.log('Add episode:', titleData.episode);
      videoDB.videos.push(videoData);
    }
  });
}

async function createDB() {
  init();

  const response: any = await youtube.channels.list({
    forUsername: USERNAME,
    part: ['contentDetails']
  });

  const playlistId = response.data.items.find((value: any) => value?.contentDetails?.relatedPlaylists?.uploads)
    .contentDetails.relatedPlaylists.uploads;

  if (!playlistId) {
    throw "playlistId is missing"
  }

  var nextPageToken: string = '';
  var videoIDs: string[] = [];

  // special case
  // episode #100 6I5I56uVvLw is on an another channel
  videoIDs.push('6I5I56uVvLw');

  do {
    var params = {
      playlistId: playlistId,
      maxResults: MAX_RESULTS,
      pageToken: '',
      part: ['snippet'],
    }

    if (nextPageToken) {
      params.pageToken = nextPageToken;
    }

    const response = await youtube.playlistItems.list(params);

    nextPageToken = response.data.nextPageToken!;
    var snippets = response.data.items?.map((item) => item.snippet);
    snippets?.forEach((snippet) => {
      const videoId: string = snippet?.resourceId?.videoId!;
      console.log('Found video:', videoId);
      videoIDs.push(videoId);
    });
  } while (nextPageToken)

  save(videoIDs);
}

createDB();
