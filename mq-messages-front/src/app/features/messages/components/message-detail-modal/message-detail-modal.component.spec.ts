import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageDetailModalComponent, MessageDetailData } from './message-detail-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MessageService } from '../../../../core/services/message.service';
import { MOCK_MESSAGES } from '../../../../core/data/mock-messages';

describe('MessageDetailModalComponent', () => {
  let component: MessageDetailModalComponent;
  let fixture: ComponentFixture<MessageDetailModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<MessageDetailModalComponent>>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  const testMessage = MOCK_MESSAGES[0];
  const mockData: MessageDetailData = { messageId: testMessage.id };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['getMessageById']);
    mockMessageService.getMessageById.and.returnValue(of(testMessage));

    await TestBed.configureTestingModule({
      imports: [MessageDetailModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MessageService, useValue: mockMessageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMessageById with the injected messageId', () => {
    expect(mockMessageService.getMessageById).toHaveBeenCalledWith(testMessage.id);
  });

  it('message$ observable should emit the expected message', (done) => {
    component.message$.subscribe(message => {
      expect(message).toEqual(testMessage);
      done();
    });
  });

  it('should close the dialog when dialogRef.close is called', () => {
    component.dialogRef.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('hasHeaders should return true if headers object has keys', () => {
    const headers = { 'header1': 'value1', 'header2': 'value2' };
    expect(component.hasHeaders(headers)).toBeTrue();
  });

  it('hasHeaders should return false if headers object is empty', () => {
    expect(component.hasHeaders({})).toBeFalse();
  });

  it('getHeaderEntries should return array of key/value pairs', () => {
    const headers = { 'h1': 'v1', 'h2': 'v2' };
    const entries = component.getHeaderEntries(headers);
    expect(entries).toEqual([
      { key: 'h1', value: 'v1' },
      { key: 'h2', value: 'v2' }
    ]);
  });
});
