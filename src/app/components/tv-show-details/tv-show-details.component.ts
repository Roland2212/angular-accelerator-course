import { DatePipe, DecimalPipe, I18nPluralPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TvShow } from "../../interfaces/tv-show.interface";
import { CountSeasonsPipe } from "../../pipe/count-seasons.pipe";
import { TvShowCardComponent } from "../tv-show-card/tv-show-card.component";
import { GenericDialogComponent } from "../generic-dialog/generic-dialog.component";

@Component({
  selector: "app-tv-show-details",
  templateUrl: "./tv-show-details.component.html",
  styleUrl: "./tv-show-details.component.css",
  standalone: true,
  imports: [
    NgFor,
    DatePipe,
    DecimalPipe,
    I18nPluralPipe,
    CountSeasonsPipe,
    TvShowCardComponent,
    GenericDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowDetailsComponent {
  @ViewChild("galleryDialog") galleryDialog!: GenericDialogComponent;
  @Input() tvShow!: TvShow;

  currentImageSrc: string = "";

  constructor(private router: Router) {}

  onNavigateBack(): void {
    this.router.navigate(["../../"]);
  }

  onOpenGalleryDialog(): void {
    this.galleryDialog.onOpen();
  }

  onSelectImage(imageSrc: string): void {
    this.currentImageSrc = imageSrc;
  }
}
