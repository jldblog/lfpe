import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { Data } from 'src/domain/data';
import { Guest } from 'src/domain/guest';
import { Title } from 'src/domain/title';
import { Tag, Video } from 'src/domain/video';

@Injectable({ providedIn: 'root' })

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class DatabaseService {
  private data!: Data;

  constructor() {
    this.data = new Data();
  }

  setData(data: Data) {
    this.data = data;
  }

  public getLastUpdated(): string {
    if (this.data && this.data.description) {
      return this.data.description.generatedOn;
    }
    else {
      return '';
    }
  }

  public getAllGuests(): Guest[] {
    let guests: Guest[] = [];
    let names: string[] = [];

    if (this.data && this.data.videos) {
      this.data.videos.forEach((video: Video) => {
        let name = video.guest;

        if (name != '' && !names.includes(name)) {
          names.push(name);
          let guest: Guest = { name: name };
          guests.push(guest);
        }
      });

      guests.sort(Guest.guestsComparator);
    }

    return guests;
  }

  private getGuestsByName(name: string, guests: Guest[]): Guest {
    let guest!: Guest;

    guests.every(g => {
      if (g.name === name) {
        guest = g;
        return false;
      }

      return true;
    });

    return guest;
  }

  public getTitles(): Title[] {
    let titles: Title[] = [];

    if (this.data && this.data.videos) {
      this.data.videos.forEach((video: Video) => {
        if (video.guest) {
          let title: Title = { title: video.shortTitle };
          titles.push(title);
        }
      });

      titles.sort(Title.titleComparator);
    }

    return titles;
  }

  public getTags(): Tag[] {
    let result: Tag[] = [];
    let values: string[] = [];

    if (this.data && this.data.videos) {
      this.data.videos.forEach((video: Video) => {
        const tags = video.tags;

        if (tags) {
          tags.forEach(tag => {
            if (!values.includes(tag.toUpperCase())) {
              const newTag: Tag = { value: tag.toUpperCase() };
              result.push(newTag);
              values.push(tag.toUpperCase());
            }
          });
        }
      });

      result = result.sort(Tag.sortTagComparator);
    }

    return result;
  }

  public getRoundsMap(): Map<Guest, Video[]> {
    let tmpMap: Map<string, Video[]> = new Map();

    if (this.data && this.data.videos) {
      this.data.videos.forEach((video: Video) => {
        let name = video.guest;

        if (name) {
          if (tmpMap.has(name)) {
            tmpMap.get(name)!.push(video);
          }
          else {
            let value: Video[] = [];
            value.push(video);
            tmpMap.set(name, value);
          }
        }
      });
    }

    let resultMap: Map<Guest, Video[]> = new Map();

    tmpMap.forEach(function (value, key) {
      if (value.length != 1) {
        let guest: Guest = { name: key };
        resultMap.set(guest, value);
      }
    });

    return resultMap;
  }

  public getAllVideos(): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos) {
      videos = this.data.videos;
      videos = videos.sort(Video.videosByNumberComparator);
    }

    return videos;
  }

  public getLastVideos(quantity: number): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos && quantity > 0) {
      videos = this.data.videos;
      videos = videos.sort(Video.videosByNumberComparator);
      videos = videos.slice(0, quantity);
    }

    return videos;
  }
  public getMostViewVideos(quantity: number): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos && quantity > 0) {
      videos = this.data.videos;
      videos = videos.sort(Video.videosByViewCountComparator);
      videos = this.data.videos.slice(0, quantity);
    }

    return videos;
  }

  public getMostLikedVideos(quantity: number): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos && quantity > 0) {
      videos = this.data.videos;
      videos = videos.sort(Video.videosByLikeCountComparator);
      videos = this.data.videos.slice(0, quantity);
    }

    return videos;
  }

  public getRandomVideos(quantity: number): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos && quantity > 0) {
      let indexes: number[] = []
      const min: number = 0;
      const max: number = this.data.videos.length - 1;

      while (videos.length != quantity) {
        const index = Math.floor(Math.random() * (max - min + 1) + min);

        if (!indexes.includes(index)) {
          videos.push(this.data.videos[index]);
        }
      }

      videos = videos.sort(Video.videosByNumberComparator);
    }

    return videos;
  }

  public getVideosByGuests(selectedGuests: Guest[]): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos) {
      this.data.videos.forEach((video: Video) => {
        let name = video.guest;

        if (name && this.getGuestsByName(name, selectedGuests)) {
          videos.push(video);
        }
      });

      videos = videos.sort(Video.videosByNumberComparator);
    }

    return videos;
  }

  public getVideosByTitles(titles: Title[]): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos) {
      this.data.videos.forEach((video: Video) => {
        let title = video.shortTitle;

        titles.every(t => {
          if (t.title === title) {
            videos.push(video);
            return false;
          }

          return true;
        });
      });

      videos = videos.sort(Video.videosByNumberComparator);
    }

    return videos;
  }

  public getVideosByDates(fromDate: Date, toDate: Date, interviewsOnly: boolean): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos) {
      this.data.videos.forEach((video: Video) => {
        const date = new Date(video.publishedAt);
        const endDate: Date = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0);

        if (fromDate <= date && date <= endDate) {
          if (interviewsOnly && video.guest) {
            videos.push(video);
          }
        }
      });

      videos = videos.sort(Video.videosByNumberComparator);
    }

    return videos;
  }

  public getVideosByTags(tags: Tag[]): Video[] {
    let videos: Video[] = [];

    if (this.data && this.data.videos) {
      this.data.videos.forEach((video: Video) => {
        const vtags: string[] = video.tags;

        if (vtags) {
          tags.every(tag => {
            if (vtags.filter(vt => vt.localeCompare(tag.value, 'en', { sensitivity: 'base' }) == 0).length != 0) {
              videos.push(video);
              return false;
            }

            return true;
          });
        }
      });

      videos = videos.sort(Video.videosByNumberComparator);
    }

    return videos;
  }
}
