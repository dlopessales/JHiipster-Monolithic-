import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMestre } from 'app/shared/model/mestre.model';

@Component({
    selector: 'jhi-mestre-detail',
    templateUrl: './mestre-detail.component.html'
})
export class MestreDetailComponent implements OnInit {
    mestre: IMestre;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mestre }) => {
            this.mestre = mestre;
        });
    }

    previousState() {
        window.history.back();
    }
}
