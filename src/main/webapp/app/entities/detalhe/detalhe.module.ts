import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JHipsterMonolithicSharedModule } from 'app/shared';
import {
    DetalheComponent,
    DetalheDetailComponent,
    DetalheUpdateComponent,
    DetalheDeletePopupComponent,
    DetalheDeleteDialogComponent,
    detalheRoute,
    detalhePopupRoute
} from './';

const ENTITY_STATES = [...detalheRoute, ...detalhePopupRoute];

@NgModule({
    imports: [JHipsterMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DetalheComponent,
        DetalheDetailComponent,
        DetalheUpdateComponent,
        DetalheDeleteDialogComponent,
        DetalheDeletePopupComponent
    ],
    entryComponents: [DetalheComponent, DetalheUpdateComponent, DetalheDeleteDialogComponent, DetalheDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterMonolithicDetalheModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
