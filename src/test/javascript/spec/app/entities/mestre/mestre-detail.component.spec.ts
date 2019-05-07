/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JHipsterMonolithicTestModule } from '../../../test.module';
import { MestreDetailComponent } from 'app/entities/mestre/mestre-detail.component';
import { Mestre } from 'app/shared/model/mestre.model';

describe('Component Tests', () => {
    describe('Mestre Management Detail Component', () => {
        let comp: MestreDetailComponent;
        let fixture: ComponentFixture<MestreDetailComponent>;
        const route = ({ data: of({ mestre: new Mestre(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterMonolithicTestModule],
                declarations: [MestreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MestreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MestreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mestre).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
