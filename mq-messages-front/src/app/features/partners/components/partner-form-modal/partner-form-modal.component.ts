import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  CreatePartnerRequest,
  Direction,
  ProcessedFlowType,
  PartnerFormData,
} from '../../../../core/models/partner.model';
import { PartnerService } from '../../../../core/services/partner.service';

@Component({
  selector: 'app-partner-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './partner-form-modal.component.html',
  styleUrl: './partner-form-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PartnerFormModalComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly partnerService = inject(PartnerService);

  partnerForm: FormGroup;
  directionOptions = Object.values(Direction);
  flowTypeOptions = Object.values(ProcessedFlowType);
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<PartnerFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartnerFormData
  ) {
    this.partnerForm = this.fb.group({
      alias: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
      direction: ['', Validators.required],
      application: [''],
      processedFlowType: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    if (this.data.isEdit && this.data.partner) {
      this.partnerForm.patchValue({
        alias: this.data.partner.alias,
        type: this.data.partner.type,
        direction: this.data.partner.direction,
        application: this.data.partner.application,
        processedFlowType: this.data.partner.processedFlowType,
        description: this.data.partner.description,
      });
    }
  }

  public onSubmit(): void {
    if (this.partnerForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const formData = this.partnerForm.value;

    const request: CreatePartnerRequest = {
      alias: formData.alias.trim(),
      type: formData.type.trim(),
      direction: formData.direction,
      application: formData.application?.trim() || '',
      processedFlowType: formData.processedFlowType,
      description: formData.description.trim(),
    };

    const operation = this.data.isEdit
      ? this.partnerService.updatePartner(this.data.partner!.id, request)
      : this.partnerService.createPartner(request);

    operation.subscribe({
      next: (result) => {
        this.isSubmitting = false;
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
        this.isSubmitting = false;
      },
    });
  }
}
