import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMestre } from 'app/shared/model/mestre.model';

type EntityResponseType = HttpResponse<IMestre>;
type EntityArrayResponseType = HttpResponse<IMestre[]>;

@Injectable({ providedIn: 'root' })
export class MestreService {
    public resourceUrl = SERVER_API_URL + 'api/mestres';

    constructor(protected http: HttpClient) {}

    create(mestre: IMestre): Observable<EntityResponseType> {
        return this.http.post<IMestre>(this.resourceUrl, mestre, { observe: 'response' });
    }

    update(mestre: IMestre): Observable<EntityResponseType> {
        return this.http.put<IMestre>(this.resourceUrl, mestre, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMestre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMestre[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
