import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CPlayersUI';
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }



}
