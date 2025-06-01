import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { PartnerFormModalComponent } from './partner-form-modal.component';
import { PartnerService } from '../../../../core/services/partner.service';
import {
  Partner,
  Direction,
  ProcessedFlowType,
  PartnerFormData,
} from '../../../../core/models/partner.model';

describe('PartnerFormModalComponent (Standalone)', () => {
  let component: PartnerFormModalComponent;
  let fixture: ComponentFixture<PartnerFormModalComponent>;
  let mockPartnerService: jasmine.SpyObj<PartnerService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<PartnerFormModalComponent>>;

  const mockPartner: Partner = {
    id: '456e7890-e89b-12d3-a456-426614174001',
    alias: 'TestPartner',
    type: 'BANK',
    direction: Direction.INBOUND,
    application: 'TestApp',
    processedFlowType: ProcessedFlowType.MESSAGE,
    description: 'Test partner description',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
  };

  const mockDialogData: PartnerFormData = {
    partner: null,
    isEdit: false,
  };

  beforeEach(async () => {
    const partnerServiceSpy = jasmine.createSpyObj('PartnerService', [
      'createPartner',
      'updatePartner',
    ]);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [PartnerFormModalComponent], // Import du standalone component
      providers: [
        provideNoopAnimations(),
        provideHttpClientTesting(),
        { provide: PartnerService, useValue: partnerServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    mockPartnerService = TestBed.inject(
      PartnerService
    ) as jasmine.SpyObj<PartnerService>;
    mockDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<PartnerFormModalComponent>
    >;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values for new partner', () => {
    expect(component.partnerForm.get('alias')?.value).toBe('');
    expect(component.partnerForm.get('type')?.value).toBe('');
    expect(component.partnerForm.get('direction')?.value).toBe('');
  });

  it('should initialize form with partner data for edit mode', () => {
    component.data = { partner: mockPartner, isEdit: true };
    component.ngOnInit(); // Important !
    fixture.detectChanges();

    expect(component.partnerForm.get('alias')?.value).toBe(mockPartner.alias);
    expect(component.partnerForm.get('type')?.value).toBe(mockPartner.type);
    expect(component.partnerForm.get('direction')?.value).toBe(
      mockPartner.direction
    );
  });

  it('should validate required fields', () => {
    component.partnerForm.patchValue({
      alias: '',
      type: '',
      direction: '',
      description: '',
    });

    expect(component.partnerForm.invalid).toBeTruthy();
    expect(
      component.partnerForm.get('alias')?.hasError('required')
    ).toBeTruthy();
    expect(
      component.partnerForm.get('type')?.hasError('required')
    ).toBeTruthy();
    expect(
      component.partnerForm.get('direction')?.hasError('required')
    ).toBeTruthy();
    expect(
      component.partnerForm.get('description')?.hasError('required')
    ).toBeTruthy();
  });

  it('should create partner when form is valid', () => {
    const newPartner = { ...mockPartner };
    mockPartnerService.createPartner.and.returnValue(of(newPartner));

    component.partnerForm.patchValue({
      alias: 'TestPartner',
      type: 'BANK',
      direction: Direction.INBOUND,
      application: 'TestApp',
      processedFlowType: ProcessedFlowType.MESSAGE,
      description: 'Test description with sufficient length',
    });

    component.onSubmit();

    expect(mockPartnerService.createPartner).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(newPartner);
  });

  it('should not submit when form is invalid', () => {
    component.partnerForm.patchValue({
      alias: '', // Invalid - required
      type: 'BANK',
      direction: Direction.INBOUND,
      description: 'Test',
    });

    component.onSubmit();

    expect(mockPartnerService.createPartner).not.toHaveBeenCalled();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should show correct title for add mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Ajouter un partenaire'
    );
  });

  it('should show correct title for edit mode', () => {
    component.data = { partner: mockPartner, isEdit: true };
    component.ngOnInit(); // Ajouté pour réinitialiser correctement les données
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Modifier un partenaire'
    );
  });

  it('should show validation errors', () => {
    component.partnerForm.get('alias')?.setValue('');
    component.partnerForm.get('alias')?.markAsTouched();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-error')?.textContent).toContain(
      "L'alias est obligatoire"
    );
  });
});
