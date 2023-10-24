import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Data } from 'src/domain/data';
import { DatabaseService } from 'src/services/database.service';

@Injectable()
export class InitService {
    private DATA_URL = 'assets/db.json';
    private errorMessages: string[] = [];

    constructor(private http: HttpClient, private dbService: DatabaseService) { }

    private getData(): Observable<any> {
        return this.http.get(this.DATA_URL).pipe(catchError(
            error => {
                let errorMessage: string = '';

                if (error.error instanceof ErrorEvent) {
                    errorMessage = error.error.message;
                } else {
                    errorMessage = error.message;
                }

                this.errorMessages.push(errorMessage);

                return of([]);
            })
        );
    }

    public init(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this.getData().subscribe((data: Data) => {
                        this.dbService.setData(data);
                        resolve(data);
                    });
                }
                catch (error: any) {
                    this.errorMessages.push(error.message);
                };
            }, 500);
        });
    }

    public getErrorMessages(): string[] {
        return this.errorMessages;
    }
}