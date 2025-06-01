import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    retry(1),
    catchError((error) => {
      let errorMessage = 'Une erreur est survenue';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erreur: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = 'Requête invalide';
            break;
          case 401:
            errorMessage = 'Non autorisé';
            break;
          case 403:
            errorMessage = 'Accès interdit';
            break;
          case 404:
            errorMessage = 'Ressource non trouvée';
            break;
          case 500:
            errorMessage = 'Erreur interne du serveur';
            break;
          default:
            errorMessage = `Erreur ${error.status}: ${error.message}`;
        }
      }

      snackBar.open(errorMessage, 'Fermer', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });

      return throwError(() => error);
    })
  );
};