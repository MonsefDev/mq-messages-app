import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MessageFilter, MessageStatus, ProcessedFlowType } from '../../../../core/models/message.model';

@Component({
  selector: 'app-message-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './message-filters.component.html',
  styleUrl: './message-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageFiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<MessageFilter>();
  @Input() isLoading = false;

  private readonly fb = inject(FormBuilder);

  filterForm: FormGroup;
  statusOptions = Object.values(MessageStatus);
  flowTypeOptions = Object.values(ProcessedFlowType);

  constructor() {
    this.filterForm = this.fb.group({
      search: [''],
      status: [''],
      processedFlowType: [''],
      source: [''],
      destination: [''],
      dateFrom: [null],
      dateTo: [null]
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(values => {
      const filter: MessageFilter = {};

      if (values.search?.trim()) filter.search = values.search.trim();
      if (values.status) filter.status = values.status;
      if (values.processedFlowType) filter.processedFlowType = values.processedFlowType;
      if (values.source?.trim()) filter.source = values.source.trim();
      if (values.destination?.trim()) filter.destination = values.destination.trim();
      if (values.dateFrom) filter.dateFrom = values.dateFrom;
      if (values.dateTo) filter.dateTo = values.dateTo;

      this.filtersChange.emit(filter);
    });
  }

  public clearFilters(): void {
    this.filterForm.reset();
  }
}