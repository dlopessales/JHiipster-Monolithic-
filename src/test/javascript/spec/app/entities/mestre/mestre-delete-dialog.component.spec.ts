/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JHipsterMonolithicTestModule } from '../../../test.module';
import { MestreDeleteDialogComponent } from 'app/entities/mestre/mestre-delete-dialog.component';
import { MestreService } from 'app/entities/mestre/mestre.service';

describe('Component Tests', () => {
    describe('Mestre Management Delete Component', () => {
        let comp: MestreDeleteDialogComponent;
        let fixture: ComponentFixture<MestreDeleteDialogComponent>;
        let service: MestreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterMonolithicTestModule],
                declarations: [MestreDeleteDialogComponent]
            })
                .overrideTemplate(MestreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MestreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MestreService);
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
