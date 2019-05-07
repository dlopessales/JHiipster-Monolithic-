import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalhe } from 'app/shared/model/detalhe.model';
import { DetalheService } from './detalhe.service';

@Component({
    selector: 'jhi-detalhe-delete-dialog',
    templateUrl: './detalhe-delete-dialog.component.html'
})
export class DetalheDeleteDialogComponent {
    detalhe: IDetalhe;

    constructor(protected detalheService: DetalheService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.detalheService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'detalheListModification',
                content: 'Deleted an detalhe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-detalhe-delete-popup',
    template: ''
})
export class DetalheDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ detalhe }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DetalheDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.detalhe = detalhe;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/detalhe', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/detalhe', { outlets: { popup: null } }]);
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
