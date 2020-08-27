import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { PlayersService } from 'src/app/players/services/players.service';
import { takeWhile, finalize } from 'rxjs/operators';
import { ManageFavouriteObject } from 'src/app/players/model/players';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-managefavourites',
  templateUrl: './managefavourites.component.html',
  styleUrls: ['./managefavourites.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagefavouritesComponent implements OnInit {
  userid: number;
  canSubscribe: boolean;
  playerid: number;
  favouriteList: ManageFavouriteObject[];
  @Input() set pid(pid: number) {
    this.playerid = pid;
    console.log(this.playerid)
  }
  constructor(private readonly playersSearchService: PlayersService, private readonly changeDetector: ChangeDetectorRef, private readonly toastr: ToastrManager) { }

  ngOnInit() {

    this.canSubscribe = true;
    this.getAllUserFavourites(1);
  }
  getAllUserFavourites(userid: number) {
    this.playersSearchService.getMyFavourites(userid).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges()
    })).subscribe((data: any) => {
      if (data) {
        this.favouriteList = data;
      }
      else {
        this.toastr.infoToastr('Problem fetching your Favourite List. Please try later.', 'Info', { positionClass: 'toast-top-right' });
      }
    }, (error: Error) => {
      this.toastr.errorToastr('Error occurred while fetching your Favourite List', 'Error', { positionClass: 'toast-top-right' });
    });
  }

}


