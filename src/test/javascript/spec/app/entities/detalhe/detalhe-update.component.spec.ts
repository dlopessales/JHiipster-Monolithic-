/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JHipsterMonolithicTestModule } from '../../../test.module';
import { DetalheUpdateComponent } from 'app/entities/detalhe/detalhe-update.component';
import { DetalheService } from 'app/entities/detalhe/detalhe.service';
import { Detalhe } from 'app/shared/model/detalhe.model';

describe('Component Tests', () => {
    describe('Detalhe Management Update Component', () => {
        let comp: DetalheUpdateComponent;
        let fixture: ComponentFixture<DetalheUpdateComponent>;
        let service: DetalheService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterMonolithicTestModule],
                declarations: [DetalheUpdateComponent]
            })
                .overrideTemplate(DetalheUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DetalheUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetalheService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Detalhe(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.detalhe = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Detalhe();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.detalhe = entity;
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
