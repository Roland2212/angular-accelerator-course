import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-generic-dialog",
  templateUrl: "./generic-dialog.component.html",
  styleUrl: "./generic-dialog.component.css",
  standalone: true,
  imports: [],
})
export class GenericDialogComponent {
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

  onOpen(): void {
    this.dialog.nativeElement.showModal();
  }

  onClose(): void {
    this.dialog.nativeElement.close();
  }
}
