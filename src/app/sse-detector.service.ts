import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { SseService } from './sse.service';

@Injectable({
  providedIn: 'root',
})
export class SseDetectorService {
  constructor(private zone: NgZone, private sseService: SseService) {}

  getServerSentEvent(url: string) {
    return Observable.create(obs => {
      const eventSource = this.sseService.getEventSource(url);

      eventSource.onmessage = event => {
        this.zone.run(() => {
          obs.next(event);
        });
      };

      eventSource.onerror = error => {
        this.zone.run(() => {
          obs.error(error);
        });
      };
    });
  }
}
