/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JHipsterMonolithicTestModule } from '../../../test.module';
import { DetalheDetailComponent } from 'app/entities/detalhe/detalhe-detail.component';
import { Detalhe } from 'app/shared/model/detalhe.model';

describe('Component Tests', () => {
    describe('Detalhe Management Detail Component', () => {
        let comp: DetalheDetailComponent;
        let fixture: ComponentFixture<DetalheDetailComponent>;
        const route = ({ data: of({ detalhe: new Detalhe(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterMonolithicTestModule],
                declarations: [DetalheDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DetalheDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DetalheDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.detalhe).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
