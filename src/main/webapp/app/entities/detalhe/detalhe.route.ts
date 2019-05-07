import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Detalhe } from 'app/shared/model/detalhe.model';
import { DetalheService } from './detalhe.service';
import { DetalheComponent } from './detalhe.component';
import { DetalheDetailComponent } from './detalhe-detail.component';
import { DetalheUpdateComponent } from './detalhe-update.component';
import { DetalheDeletePopupComponent } from './detalhe-delete-dialog.component';
import { IDetalhe } from 'app/shared/model/detalhe.model';

@Injectable({ providedIn: 'root' })
export class DetalheResolve implements Resolve<IDetalhe> {
    constructor(private service: DetalheService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetalhe> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Detalhe>) => response.ok),
                map((detalhe: HttpResponse<Detalhe>) => detalhe.body)
            );
        }
        return of(new Detalhe());
    }
}

export const detalheRoute: Routes = [
    {
        path: '',
        component: DetalheComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jHipsterMonolithicApp.detalhe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DetalheDetailComponent,
        resolve: {
            detalhe: DetalheResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterMonolithicApp.detalhe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DetalheUpdateComponent,
        resolve: {
            detalhe: DetalheResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterMonolithicApp.detalhe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DetalheUpdateComponent,
        resolve: {
            detalhe: DetalheResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterMonolithicApp.detalhe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const detalhePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DetalheDeletePopupComponent,
        resolve: {
            detalhe: DetalheResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterMonolithicApp.detalhe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
