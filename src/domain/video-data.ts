export class VideoData {
  id!: string;
  retrievedAt!: string;
  publishedAt!: string;
  duration!: string;
  originalTitle!: string;
  shortTitle!: string;
  guests: string[] = []
  episode!: number;
  description!: string;
  thumbnails!: Thumbnail;
  tags: string[] = []
  statistics!: Statistics;
  transcript!: string;

  static videosByNumberComparator(video1: VideoData, video2: VideoData): number {
    return (video2.episode ? video2.episode : 0) - (video1.episode ? video1.episode : 0);
  }

  static videosByViewCountComparator(video1: VideoData, video2: VideoData): number {
    return Statistics.viewCountComparator(video1.statistics, video2.statistics);
  }

  static videosByLikeCountComparator(video1: VideoData, video2: VideoData): number {
    return Statistics.likeCountComparator(video1.statistics, video2.statistics);
  }

  static videosByFavoriteCountComparator(video1: VideoData, video2: VideoData): number {
    return Statistics.favoriteCountComparator(video1.statistics, video2.statistics);
  }
}

export class Tag {
  value!: string;

  static sortTagComparator(t1: Tag, t2: Tag): number {
    return t1.value.localeCompare(t2.value, 'en');
  }
}

export interface Thumbnail {
  default: ThumbnailData;
  medium: ThumbnailData;
  high: ThumbnailData;
  standard: ThumbnailData;
  maxres: ThumbnailData;
}

export interface ThumbnailData {
  url: string;
  width: string;
  height: string;
}

export class Statistics {
  viewCount!: string;
  likeCount!: string;
  favoriteCount!: string;
  commentCount!: string;

  static viewCountComparator(s1: Statistics, s2: Statistics): number {
    return parseInt(s2.viewCount) - parseInt(s1.viewCount);
  }

  static likeCountComparator(s1: Statistics, s2: Statistics): number {
    return parseInt(s2.likeCount) - parseInt(s1.likeCount);
  }

  static favoriteCountComparator(s1: Statistics, s2: Statistics): number {
    return parseInt(s2.favoriteCount) - parseInt(s1.favoriteCount);
  }
}