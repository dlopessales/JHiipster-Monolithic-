import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IDetalhe } from 'app/shared/model/detalhe.model';
import { DetalheService } from './detalhe.service';
import { IMestre } from 'app/shared/model/mestre.model';
import { MestreService } from 'app/entities/mestre';

@Component({
    selector: 'jhi-detalhe-update',
    templateUrl: './detalhe-update.component.html'
})
export class DetalheUpdateComponent implements OnInit {
    detalhe: IDetalhe;
    isSaving: boolean;

    mestres: IMestre[];
    dataDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected detalheService: DetalheService,
        protected mestreService: MestreService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ detalhe }) => {
            this.detalhe = detalhe;
        });
        this.mestreService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMestre[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMestre[]>) => response.body)
            )
            .subscribe((res: IMestre[]) => (this.mestres = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.detalhe.id !== undefined) {
            this.subscribeToSaveResponse(this.detalheService.update(this.detalhe));
        } else {
            this.subscribeToSaveResponse(this.detalheService.create(this.detalhe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalhe>>) {
        result.subscribe((res: HttpResponse<IDetalhe>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMestreById(index: number, item: IMestre) {
        return item.id;
    }
}
