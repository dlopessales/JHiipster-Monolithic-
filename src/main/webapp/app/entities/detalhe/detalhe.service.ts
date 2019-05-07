import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDetalhe } from 'app/shared/model/detalhe.model';

type EntityResponseType = HttpResponse<IDetalhe>;
type EntityArrayResponseType = HttpResponse<IDetalhe[]>;

@Injectable({ providedIn: 'root' })
export class DetalheService {
    public resourceUrl = SERVER_API_URL + 'api/detalhes';

    constructor(protected http: HttpClient) {}

    create(detalhe: IDetalhe): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(detalhe);
        return this.http
            .post<IDetalhe>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(detalhe: IDetalhe): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(detalhe);
        return this.http
            .put<IDetalhe>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDetalhe>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDetalhe[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(detalhe: IDetalhe): IDetalhe {
        const copy: IDetalhe = Object.assign({}, detalhe, {
            data: detalhe.data != null && detalhe.data.isValid() ? detalhe.data.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.data = res.body.data != null ? moment(res.body.data) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((detalhe: IDetalhe) => {
                detalhe.data = detalhe.data != null ? moment(detalhe.data) : null;
            });
        }
        return res;
    }
}
