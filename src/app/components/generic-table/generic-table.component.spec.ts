import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GenericTableComponent } from "./generic-table.component";

describe("TvShowTableComponent", () => {
  let component: GenericTableComponent<any, any>;
  let fixture: ComponentFixture<GenericTableComponent<any, any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GenericTableComponent],
    });
    fixture = TestBed.createComponent(GenericTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
