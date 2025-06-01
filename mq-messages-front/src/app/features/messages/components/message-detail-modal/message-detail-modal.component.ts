import { Component, Inject, OnInit, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Message } from '../../../../core/models/message.model';
import { MessageService } from '../../../../core/services/message.service';

export interface MessageDetailData {
  messageId: string;
}

@Component({
  selector: 'app-message-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './message-detail-modal.component.html',
  styleUrl: './message-detail-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessageDetailModalComponent implements OnInit {
  private readonly messageService = inject(MessageService);

  message$!: Observable<Message>;

  constructor(
    public dialogRef: MatDialogRef<MessageDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDetailData
  ) {}

  ngOnInit(): void {
    this.message$ = this.messageService.getMessageById(this.data.messageId);
  }

  public hasHeaders(headers: { [key: string]: string }): boolean {
    return Object.keys(headers).length > 0;
  }

  public getHeaderEntries(headers: { [key: string]: string }): Array<{key: string, value: string}> {
    return Object.entries(headers).map(([key, value]) => ({ key, value }));
  }
}