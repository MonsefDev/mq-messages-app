import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, catchError, map } from 'rxjs/operators';
import { Message, PagedResult, MessageFilter } from '../models/message.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/messages`;

  public getMessages(page: number = 0, limit: number = 20, filter?: MessageFilter): Observable<PagedResult<Message>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', limit.toString());

    if (filter) {
      if (filter.status) params = params.set('status', filter.status);
      if (filter.processedFlowType) params = params.set('processedFlowType', filter.processedFlowType);
      if (filter.source) params = params.set('source', filter.source);
      if (filter.destination) params = params.set('destination', filter.destination);
      if (filter.search) params = params.set('search', filter.search);
      if (filter.dateFrom) params = params.set('dateFrom', filter.dateFrom.toISOString());
      if (filter.dateTo) params = params.set('dateTo', filter.dateTo.toISOString());
    }

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        const data = response.data || response;
        return {
          content: data.content || [],
          totalElements: data.totalElements || 0,
          totalPages: data.totalPages || 0,
          page: data.page || 0,
          size: data.size || limit
        };
      }),
      shareReplay(1),
      catchError(() => of({
        content: [],
        totalElements: 0,
        totalPages: 0,
        page: 0,
        size: limit
      }))
    );
  }

  public getMessageById(id: string): Observable<Message> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data || response)
    );
  }
}