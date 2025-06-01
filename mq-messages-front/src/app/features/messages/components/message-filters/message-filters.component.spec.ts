import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFiltersComponent } from './message-filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MessageFiltersComponent', () => {
  let component: MessageFiltersComponent;
  let fixture: ComponentFixture<MessageFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageFiltersComponent,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
