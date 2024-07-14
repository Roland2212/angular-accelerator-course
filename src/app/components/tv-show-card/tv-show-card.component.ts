import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-tv-show-card",
  templateUrl: "./tv-show-card.component.html",
  styleUrl: "./tv-show-card.component.css",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowCardComponent {
  @Input() title!: string;
}
