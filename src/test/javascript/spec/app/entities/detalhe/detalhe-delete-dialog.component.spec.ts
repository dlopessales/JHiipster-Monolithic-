/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JHipsterMonolithicTestModule } from '../../../test.module';
import { DetalheDeleteDialogComponent } from 'app/entities/detalhe/detalhe-delete-dialog.component';
import { DetalheService } from 'app/entities/detalhe/detalhe.service';

describe('Component Tests', () => {
    describe('Detalhe Management Delete Component', () => {
        let comp: DetalheDeleteDialogComponent;
        let fixture: ComponentFixture<DetalheDeleteDialogComponent>;
        let service: DetalheService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterMonolithicTestModule],
                declarations: [DetalheDeleteDialogComponent]
            })
                .overrideTemplate(DetalheDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DetalheDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetalheService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
