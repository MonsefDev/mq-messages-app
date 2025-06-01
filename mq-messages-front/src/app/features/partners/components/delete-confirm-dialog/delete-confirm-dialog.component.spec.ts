import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DeleteConfirmDialogComponent, DeleteConfirmData } from './delete-confirm-dialog.component';

describe('DeleteConfirmDialogComponent', () => {
  let component: DeleteConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DeleteConfirmDialogComponent>>;
  let mockData: DeleteConfirmData;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    mockData = {
      partnerName: 'Test Partner'
    };

    await TestBed.configureTestingModule({
      imports: [
        DeleteConfirmDialogComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display partner name in confirmation message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const strongElement = compiled.querySelector('strong');

    expect(strongElement?.textContent).toContain('Test Partner');
  });

  it('should display warning icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const warningIcon = compiled.querySelector('.warning-icon');

    expect(warningIcon).toBeTruthy();
    expect(warningIcon?.textContent?.trim()).toBe('warning');
  });

  it('should have cancel and delete buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent?.trim()).toContain('Annuler');
    expect(buttons[1].textContent?.trim()).toContain('Supprimer');
  });

  it('should display confirmation title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h2[mat-dialog-title]');

    expect(title?.textContent?.trim()).toBe('Confirmer la suppression');
  });

  it('should display warning text about irreversible action', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const warningText = compiled.querySelector('.warning-text');

    expect(warningText?.textContent?.trim()).toContain('Cette action est irréversible');
  });

  it('should have proper dialog close values on buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cancelButton = compiled.querySelector('button[mat-dialog-close="false"]');
    const deleteButton = compiled.querySelector('button[mat-dialog-close="true"]');

    expect(cancelButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });

  it('should inject dialogRef and data correctly', () => {
    expect(component.dialogRef).toBe(mockDialogRef);
    expect(component.data).toBe(mockData);
    expect(component.data.partnerName).toBe('Test Partner');
  });
});


