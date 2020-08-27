import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MatInput, MatButton, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatExpansionModule, MatTooltipModule, MatDividerModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PlayersService } from 'src/app/players/services/players.service';
import { ManagefavouritesComponent } from './managefavourites/managefavourites.component';

@NgModule({
  declarations: [SearchComponent, ManagefavouritesComponent],
  imports: [
    CommonModule,
    MatIconModule, MatFormFieldModule, FormsModule,
    MatInputModule, MatButtonModule, MatExpansionModule, MatTooltipModule, MatDividerModule, MatListModule
  ],
  providers: [PlayersService]
})
export class PlayersModule { }
