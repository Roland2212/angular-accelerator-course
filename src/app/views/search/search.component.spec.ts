import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchViewComponent } from "./search.component";

describe("SearchViewComponent", () => {
  let component: SearchViewComponent;
  let fixture: ComponentFixture<SearchViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchViewComponent],
    });
    fixture = TestBed.createComponent(SearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
