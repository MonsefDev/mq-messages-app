import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Partner, CreatePartnerRequest } from '../models/partner.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/partners`;

  public getPartners(): Observable<Partner[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        const partners = response.data || response || [];
        return partners.map((partner: any) => ({
          ...partner,
          id: partner.id || partner._id,
          createdAt: partner.createdAt || partner.createdAt || new Date(),
          updatedAt: partner.updatedAt || partner.updatedAt || new Date(),
        }));
      }),
      catchError(() => of([]))
    );
  }

  public getPartnerById(id: string): Observable<Partner> {
    if (!id || id === 'undefined' || id === 'null') {
      return throwError(() => new Error(`ID invalide: ${id}`));
    }

    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        const partner = response.data || response;
        return {
          ...partner,
          id: partner.id || partner._id,
        };
      }),
      catchError((error) => {
        return throwError(() => new Error(`Partner ${id} not found`));
      })
    );
  }

  public updatePartner(id: string, updates: Partial<Partner>): Observable<Partner> {
    if (!id || id === 'undefined' || id === 'null') {
      return throwError(
        () => new Error(`ID invalide pour modification: ${id}`)
      );
    }

    return this.http.patch<any>(`${this.apiUrl}/${id}`, updates).pipe(
      map((response) => {
        const partner = response.data || response;
        return {
          ...partner,
          id: partner.id || partner._id,
        };
      }),
      catchError((error) => {
        return throwError(
          () => new Error(`Impossible de modifier le partner ${id}`)
        );
      })
    );
  }

  public deletePartner(id: string): Observable<void> {
    if (!id || id === 'undefined' || id === 'null') {
      return throwError(() => new Error(`ID invalide pour suppression: ${id}`));
    }

    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map(() => void 0),
      catchError((error) => {
        return throwError(
          () => new Error(`Impossible de supprimer le partner ${id}`)
        );
      })
    );
  }

  public createPartner(request: CreatePartnerRequest): Observable<Partner> {
    return this.http.post<any>(this.apiUrl, request).pipe(
      map((response) => {
        const partner = response.data || response;
        return {
          ...partner,
          id: partner.id || partner._id,
        };
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
