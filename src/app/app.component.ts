import {Component, OnInit} from '@angular/core';
import {SseDetectorService} from './sse-detector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor( private sse: SseDetectorService ) {}

  ngOnInit() {
    this.sse.getServerSentEvent('http://localhost:3000/sse-endpoint')
      .subscribe(data => console.log(data));
  }
}
