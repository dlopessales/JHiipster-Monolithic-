import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMestre } from 'app/shared/model/mestre.model';
import { MestreService } from './mestre.service';

@Component({
    selector: 'jhi-mestre-update',
    templateUrl: './mestre-update.component.html'
})
export class MestreUpdateComponent implements OnInit {
    mestre: IMestre;
    isSaving: boolean;

    constructor(protected mestreService: MestreService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mestre }) => {
            this.mestre = mestre;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mestre.id !== undefined) {
            this.subscribeToSaveResponse(this.mestreService.update(this.mestre));
        } else {
            this.subscribeToSaveResponse(this.mestreService.create(this.mestre));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMestre>>) {
        result.subscribe((res: HttpResponse<IMestre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
