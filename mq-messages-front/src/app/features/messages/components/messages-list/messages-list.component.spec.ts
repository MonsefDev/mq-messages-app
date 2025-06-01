// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { MessagesListComponent } from './messages-list.component';

// describe('MessagesListComponent', () => {
//   let component: MessagesListComponent;
//   let fixture: ComponentFixture<MessagesListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [MessagesListComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MessagesListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MessagesListComponent } from './messages-list.component';
import { MessageService } from '../../../../core/services/message.service';
import { Message, MessageStatus, ProcessedFlowType } from '../../../../core/models/message.model';

describe('MessagesListComponent', () => {
  let component: MessagesListComponent;
  let fixture: ComponentFixture<MessagesListComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(waitForAsync(() => {
    mockMessageService = jasmine.createSpyObj('MessageService', ['getMessages']);

    TestBed.configureTestingModule({
      imports: [
        MessagesListComponent,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule  // <-- Ajout des animations pour Angular Material
      ],
      providers: [
        { provide: MessageService, useValue: mockMessageService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesListComponent);
    component = fixture.componentInstance;

    mockMessageService.getMessages.and.returnValue(of({
      content: [
        {
          id: '12345678abcdef',
          content: 'Test message',
          timestamp: new Date(),
          source: 'SystemA',
          destination: 'SystemB',
          status: MessageStatus.PROCESSED,
          processedFlowType: ProcessedFlowType.MESSAGE
        } as Message
      ],
      totalElements: 1,
      totalPages: 1,
      page: 0,
      size: 10
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load messages and update datasource', (done) => {
    // Le debounceTime dans le composant nécessite un délai
    setTimeout(() => {
      expect(component.dataSource.data.length).toBe(1);
      expect(component.totalElements).toBe(1);
      expect(component.dataSource.data[0].id).toBe('12345678abcdef');
      done();
    }, 400); // Légèrement plus que debounceTime de 300ms
  });

  it('should open dialog on openMessageDetail call', () => {
    spyOn(component['dialog'], 'open');
    const message: Message = {
      id: '123',
      content: 'content',
      timestamp: new Date(),
      source: 'src',
      destination: 'dest',
      status: MessageStatus.PENDING,
      processedFlowType: ProcessedFlowType.ALERTING
    };
    component.openMessageDetail(message);
    expect(component['dialog'].open).toHaveBeenCalled();
  });
});
