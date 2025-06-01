import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, merge, of } from 'rxjs';
import { startWith, switchMap, catchError, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Message, MessageFilter, PagedResult} from '../../../../core/models/message.model';
import { MessageService } from '../../../../core/services/message.service';
import { MessageDetailModalComponent } from '../message-detail-modal/message-detail-modal.component';
import { MessageFiltersComponent } from '../message-filters/message-filters.component';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MessageFiltersComponent],

  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly messageService = inject(MessageService);
  private readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'timestamp', 'source', 'destination', 'status', 'processedFlowType', 'actions'];
  dataSource = new MatTableDataSource<Message>();
  totalElements = 0;
  isLoading = false;
  currentFilter: MessageFilter = {};

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.setupDataSource();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupDataSource(): void {
    setTimeout(() => {
      if (this.paginator && this.sort) {
        merge(
          this.sort.sortChange,
          this.paginator.page
        ).pipe(
          startWith({}),
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(() => {
            this.isLoading = true;
            return this.messageService.getMessages(
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.currentFilter
            ).pipe(
              catchError(() => of({ content: [], totalElements: 0, totalPages: 0, page: 0, size: 0 } as PagedResult<Message>))
            );
          }),
          takeUntil(this.destroy$)
        ).subscribe(result => {
          this.isLoading = false;
          this.dataSource.data = result.content;
          this.totalElements = result.totalElements;
         // this.paginator.length = result.totalElements;
        });
      }
    });
  }

  public onFiltersChange(filter: MessageFilter): void {
    this.currentFilter = filter;
    this.paginator.pageIndex = 0;
    this.setupDataSource();
  }

  public openMessageDetail(message: Message): void {
    this.dialog.open(MessageDetailModalComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { messageId: message.id }
    });
  }

  public trackByMessageId(index: number, message: Message): string {
    return message.id;
  }
}
