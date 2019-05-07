import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetalhe } from 'app/shared/model/detalhe.model';

@Component({
    selector: 'jhi-detalhe-detail',
    templateUrl: './detalhe-detail.component.html'
})
export class DetalheDetailComponent implements OnInit {
    detalhe: IDetalhe;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ detalhe }) => {
            this.detalhe = detalhe;
        });
    }

    previousState() {
        window.history.back();
    }
}
