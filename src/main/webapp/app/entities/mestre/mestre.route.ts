import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mestre } from 'app/shared/model/mestre.model';
import { MestreService } from './mestre.service';
import { MestreComponent } from './mestre.component';
import { MestreDetailComponent } from './mestre-detail.component';
import { MestreUpdateComponent } from './mestre-update.component';
import { MestreDeletePopupComponent } from './mestre-delete-dialog.component';
import { IMestre } from 'app/shared/model/mestre.model';

@Injectable({ providedIn: 'root' })
export class MestreResolve implements Resolve<IMestre> {
    constructor(private service: MestreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMestre> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Mestre>) => response.ok),
                map((mestre: HttpResponse<Mestre>) => mestre.body)
            );
        }
        return of(new Mestre());
    }
}

export const mestreRoute: Routes = [
    {
        path: '',
        component: MestreComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jHipsterMonolithicApp.mestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MestreDetailComponent,
        resolve: {
            mestre: MestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterMonolithicApp.mestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MestreUpdateComponent,
        resolve: {
            mestre: MestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterMonolithicApp.mestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MestreUpdateComponent,
        resolve: {
            mestre: MestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterMonolithicApp.mestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mestrePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MestreDeletePopupComponent,
        resolve: {
            mestre: MestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterMonolithicApp.mestre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
