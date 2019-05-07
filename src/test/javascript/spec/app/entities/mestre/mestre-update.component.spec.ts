/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JHipsterMonolithicTestModule } from '../../../test.module';
import { MestreUpdateComponent } from 'app/entities/mestre/mestre-update.component';
import { MestreService } from 'app/entities/mestre/mestre.service';
import { Mestre } from 'app/shared/model/mestre.model';

describe('Component Tests', () => {
    describe('Mestre Management Update Component', () => {
        let comp: MestreUpdateComponent;
        let fixture: ComponentFixture<MestreUpdateComponent>;
        let service: MestreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterMonolithicTestModule],
                declarations: [MestreUpdateComponent]
            })
                .overrideTemplate(MestreUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MestreUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MestreService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Mestre(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.mestre = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Mestre();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.mestre = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
