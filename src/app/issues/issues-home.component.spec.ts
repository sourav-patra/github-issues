import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IssuesHomeComponent } from "./issues-home.component";

describe("IssuesHomeComponent", () => {
  let component: IssuesHomeComponent;
  let fixture: ComponentFixture<IssuesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
