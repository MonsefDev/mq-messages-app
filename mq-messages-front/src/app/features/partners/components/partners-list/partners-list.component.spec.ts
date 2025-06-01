import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnersListComponent } from './partners-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { MOCK_PARTNERS } from '../../../../core/data/mock-partners';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

class MatDialogMock {
  open(): MatDialogRef<unknown> {
    const dialogRefMock = {
      afterClosed: () => of(true),
      _overlayRef: {
        detachments: {
          push: () => {
            // mock implementation
          },
        },
      },
    };
    return dialogRefMock as unknown as MatDialogRef<unknown>;
  }
}

describe('PartnersListComponent', () => {
  let component: PartnersListComponent;
  let fixture: ComponentFixture<PartnersListComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [PartnersListComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnersListComponent);
    component = fixture.componentInstance;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    spyOn(component, 'loadPartners').and.callFake(() => {
      component.partners = [...MOCK_PARTNERS];
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
