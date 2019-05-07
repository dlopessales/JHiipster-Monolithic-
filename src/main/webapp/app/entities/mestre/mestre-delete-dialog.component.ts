import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMestre } from 'app/shared/model/mestre.model';
import { MestreService } from './mestre.service';

@Component({
    selector: 'jhi-mestre-delete-dialog',
    templateUrl: './mestre-delete-dialog.component.html'
})
export class MestreDeleteDialogComponent {
    mestre: IMestre;

    constructor(protected mestreService: MestreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mestreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mestreListModification',
                content: 'Deleted an mestre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mestre-delete-popup',
    template: ''
})
export class MestreDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mestre }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MestreDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.mestre = mestre;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/mestre', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/mestre', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
