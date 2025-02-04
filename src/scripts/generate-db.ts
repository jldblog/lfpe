import * as fs from 'fs';
import { google, youtube_v3 } from 'googleapis';
import { Video } from '../domain/video.js';

const USERNAME: string = 'lexfridman';
const MAX_RESULTS: number = 50; // "Acceptable values are 1 to 50, inclusive. The default value is 5."
const MAX_IDS: number = 50;
const DB_FILE_NAME: string = 'db.json';
var DESTINATION_DIR: string = 'src/assets';

var youtube: youtube_v3.Youtube;
var videoDB: any = [];

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

function parseTitle(title: string): any {
  var titleData: any = {};

  // exemple : "Neil Gershenfeld: Self-Replicating Robots and the Future of Fabrication | Lex Fridman Podcast #380"
  const regexp = /^(.*?): (.*) \|(.*)#([0-9]+)$/;
  const match = title.match(regexp);

  if (match != null) {
    titleData.guest = match[1];
    titleData.title = title;
    titleData.shortTitle = match[2];
    titleData.episode = parseInt(match[4]);
  }
  else {
    titleData.guest = '';
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

    videoDB.videos = videoDB.videos.sort(Video.videosByNumberComparator);
  }
  else {
    console.log('No video found');
  }

  console.log(videoDB.videos.length, 'episodes found');
  saveToJsonFile(DESTINATION_DIR + '/' + DB_FILE_NAME, videoDB, 0);
}

function specialCases(videoID: string, snippet: any) {
  if (videoID === '6I5I56uVvLw') {
    // #100 "Dr Lex Fridman: Navigating Conflict, Finding Purpose & Maintaining Drive | Huberman Lab Podcast #100"
    snippet.title = 'Lex Fridman: Navigating Conflict, Finding Purpose & Maintaining Drive | Huberman Lab Podcast #100';
    snippet.description = snippet.description.replace('Timestamps', 'OUTLINE:');
  }
  else if (videoID === 'SFxIazwNP_0') {
    // #279 "Alien Debate: Sara Walker and Lee Cronin | Lex Fridman Podcast #279"
    snippet.title = "Sara Walker and Lee Cronin: Alien Debate | Lex Fridman Podcast #279";
  }
  else if (videoID === '4AWLcxTGZPA') {
    // #332 "Kanye 'Ye' West Interview | Lex Fridman Podcast #332"
    snippet.title = "Kanye 'Ye' West: Interview | Lex Fridman Podcast #332";
  }
  else if (videoID === '5Gk9gIpGvSE') {
    // #339 "Climate Change Debate: Bjørn Lomborg and Andrew Revkin | Lex Fridman Podcast #339"
    snippet.title = "Bjørn Lomborg and Andrew Revkin: Climate Change Debate | Lex Fridman Podcast #339";
  }
  else if (videoID === 'hLZ6PACCBy8') {
    // #363 "B-Team Jiu Jitsu: Craig Jones, Nicky Rod, and Nicky Ryan | Lex Fridman Podcast #363"
    snippet.title = "Craig Jones, Nicky Rod, and Nicky Ryan: B-Team Jiu Jitsu | Lex Fridman Podcast #363";
  }
  else if (videoID === '5t1vTLU7s40') {
    // #416 "Yann Lecun: Meta AI, Open Source, Limits of LLMs, AGI & the Future of AI | Lex Fridman Podcast #416"
    snippet.title = "Yann LeCun: Meta AI, Open Source, Limits of LLMs, AGI & the Future of AI | Lex Fridman Podcast #416";
  }
  else if (videoID === "qCbfTN-caFI") {
    // #442 "Donald Trump Interview | Lex Fridman Podcast #442"
    snippet.title = "Donald Trump: Interview | Lex Fridman Podcast #442"
  }
  else if (videoID === "_1f-o0nqpEI") {
    // #459 "DeepSeek, China, OpenAI, NVIDIA, xAI, TSMC, Stargate, and AI Megaclusters | Lex Fridman Podcast #459"
    snippet.title = "Dylan Patel and Nathan Lambert: DeepSeek, China & AI | Lex Fridman Podcast #459"
  }
}

function saveVideoData(videoItems: any) {
  videoItems.forEach((item: any) => {
    var videoData: any = {};
    const snippet = item.snippet;
    const videoID = item.id;

    specialCases(videoID, snippet);

    const titleData = parseTitle(snippet.title);

    if (titleData.guest) {
      const retrievedAt = new Date().toISOString();
      const publishedAt = snippet.publishedAt;

      videoData.id = videoID;
      videoData.retrievedAt = retrievedAt;
      videoData.publishedAt = publishedAt;
      videoData.duration = item.contentDetails.duration;
      videoData.originalTitle = titleData.title;
      videoData.shortTitle = titleData.shortTitle;
      videoData.guest = titleData.guest;
      videoData.episode = titleData.episode;
      videoData.description = snippet.description;
      videoData.tags = snippet.tags;
      videoData.thumbnails = snippet.thumbnails;
      videoData.statistics = item.statistics;

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