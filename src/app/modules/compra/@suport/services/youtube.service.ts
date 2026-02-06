import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class YoutubeService {

  private API_KEY = 'AIzaSyCD0fJTg-ROdRWF5Il5ivAchfHwJFtHcjg';
  private API_URL = 'https://www.googleapis.com/youtube/v3/videos';

  constructor(private http: HttpClient) {}

  getVideoInfo(videoId: string) {
    return this.http.get<any>(this.API_URL, {
      params: {
        part: 'snippet,contentDetails',
        id: videoId,
        key: this.API_KEY
      }
    }).pipe(
      map(res => {
        const video = res.items?.[0];
        if (!video) return null;

        return {
          videoId,
          titulo: video.snippet.title,
          duracao: this.parseDuration(video.contentDetails.duration)
        };
      })
    );
  }

  private parseDuration(iso: string): string {
    const match = iso.match(/PT(\d+M)?(\d+S)?/);
    const min = match?.[1]?.replace('M', '') ?? '0';
    const sec = match?.[2]?.replace('S', '') ?? '00';
    return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
  }
}
