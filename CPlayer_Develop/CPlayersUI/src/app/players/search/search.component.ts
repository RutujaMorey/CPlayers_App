import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { PlayersService } from 'src/app/players/services/players.service';
import { takeWhile, finalize } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { PlayersModel, PlayerProfile, ManageFavouriteObject } from './../../players/model/players';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  canSubscribe: boolean;
  playerName: string;
  players: PlayersModel[];
  favouriteList: ManageFavouriteObject[];
  constructor(private readonly playersSearchService: PlayersService, private readonly changeDetector: ChangeDetectorRef, private toastr: ToastrManager) { }

  ngOnInit() {
    this.canSubscribe = true;
  }
  onSearchClear() {
    this.playerName = '';
    this.players = [];
  }
  searchPlayerByName(playerName: string) {
    let wordSearch = this.playerName;
    setTimeout(() => {
      if (wordSearch == this.playerName) {
        if (this.playerName) {

          this.playersSearchService.searchPlayersByName(this.playerName).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
            this.changeDetector.detectChanges()
          })).subscribe((data: any) => {
            if (data && data.data) {
              this.players = data.data;
              this.players.forEach(player => {
                player.image = `https://www.cricapi.com/playerpic/${player.pid}.jpg`;
                this.searchPlayerStatistics(player.pid, player);
              });
            }
            else {
              this.toastr.infoToastr('No data not available for your search', 'Info', { positionClass: 'toast-top-right' });
            }
          }, (error: Error) => {
            this.toastr.errorToastr('Error fetching Player Details', 'Error', { positionClass: 'toast-top-right' });
          });
        } else {
          //code here
        }
      }
    }, 2000);

  }

  searchPlayerStatistics(pid: number, player: PlayersModel) {
    this.playersSearchService.getPlayerStatistics(pid).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges()
    })).subscribe((data: PlayerProfile) => {
      if (data) {
        player.born = data.born;
        player.battingStyle = data.battingStyle;
        player.bowlingstyle = data.bowlingStyle;
        player.country = data.country;
        player.currentAge = data.currentAge;
      } else {
        this.toastr.infoToastr(`Statistics data not available for ${player.name}`, 'Info', { positionClass: 'toast-top-right' });
      }
    }, (error: Error) => {
      this.toastr.errorToastr('Error fetching Player\'s Statistics', 'Error', { positionClass: 'toast-top-right' });
    });
  }
  addToFavourites(playerid: any, playername: string) {
    this.favouriteList = [];
    const request: ManageFavouriteObject = {
      id: 1,
      pid: playerid,
      pname: playername
    }
    this.playersSearchService.addToFavourites(request).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges()
    })).subscribe((data: any) => {
      if (data) {
        this.favouriteList = data;
        this.toastr.successToastr(`${playername} has been added to your Favourite List`, 'Success', { positionClass: 'toast-top-right' });

      } else {
        this.toastr.infoToastr(`Problem adding ${playername} to your Favourite List. Please try later.`, 'Info', { positionClass: 'toast-top-right' });
      }
    }, (error: Error) => {
      this.toastr.errorToastr('Error while adding player to your Favourite List', 'Error', { positionClass: 'toast-top-right' });
    });

  }
  deleteFromFavourites(playerid: any, playername: string) {
    const request: ManageFavouriteObject = {
      id: 1,
      pid: playerid,
      pname: playername
    }
    this.playersSearchService.deleteFromFavourites(request).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges()
    })).subscribe((data: any) => {
      if (data) {
        this.favouriteList = data;
        this.toastr.successToastr(`${playername} has been deleted from your Favourite List`, 'Success', { positionClass: 'toast-top-right' });
      }
      else {
        this.toastr.infoToastr(`Problem deleting ${playername} from your Favourite List. Please try later.`, 'Info', { positionClass: 'toast-top-right' });
      }
    }, (error: Error) => {
      this.toastr.errorToastr('Error occurred while deleting player to your Favourite List', 'Error', { positionClass: 'toast-top-right' });
    });

  }

}




