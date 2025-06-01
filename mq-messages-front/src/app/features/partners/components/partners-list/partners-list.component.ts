import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Partner } from '../../../../core/models/partner.model';
import { PartnerService } from '../../../../core/services/partner.service';
import { PartnerFormModalComponent } from '../partner-form-modal/partner-form-modal.component';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-partners-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './partners-list.component.html',
  styleUrl: './partners-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PartnersListComponent implements OnInit, OnDestroy {
  private readonly partnerService = inject(PartnerService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = [
    'alias',
    'type',
    'direction',
    'application',
    'processedFlowType',
    'description',
    'createdAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<Partner>();
  partners: Partner[] = [];
  isLoading = false;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadPartners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public loadPartners(): void {
    this.isLoading = true;
    this.partnerService
      .getPartners()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (partners) => {
          this.isLoading = false;
          this.partners = partners;
          this.cdr.markForCheck();
          this.dataSource.data = partners;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des partenaires:', error);
          this.snackBar.open(
            'Erreur lors du chargement des partenaires',
            'Fermer',
            {
              duration: 5000,
              panelClass: ['error-snackbar'],
            }
          );
          this.isLoading = false;
        },
      });
  }

  public openAddPartnerDialog(): void {
    const dialogRef = this.dialog.open(PartnerFormModalComponent, {
      width: '600px',
      data: { partner: null, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPartners();
        this.snackBar.open('Partenaire ajouté avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      }
    });
  }

  public editPartner(partner: Partner): void {
    const dialogRef = this.dialog.open(PartnerFormModalComponent, {
      width: '600px',
      data: { partner, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPartners();
        this.snackBar.open('Partenaire modifié avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      }
    });
  }

  public deletePartner(partner: Partner): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: { partnerName: partner.alias },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.partnerService
          .deletePartner(partner.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.loadPartners();
              this.snackBar.open('Partenaire supprimé avec succès', 'Fermer', {
                duration: 3000,
                panelClass: ['success-snackbar'],
              });
            },
            error: (error) => {
              console.error('Erreur lors de la suppression:', error);
              this.snackBar.open(
                'Erreur lors de la suppression du partenaire',
                'Fermer',
                {
                  duration: 5000,
                  panelClass: ['error-snackbar'],
                }
              );
            },
          });
      }
    });
  }

  public trackByPartnerId(index: number, partner: Partner): string {
    return partner.id;
  }
}
