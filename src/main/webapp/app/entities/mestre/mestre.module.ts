import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JHipsterMonolithicSharedModule } from 'app/shared';
import {
    MestreComponent,
    MestreDetailComponent,
    MestreUpdateComponent,
    MestreDeletePopupComponent,
    MestreDeleteDialogComponent,
    mestreRoute,
    mestrePopupRoute
} from './';

const ENTITY_STATES = [...mestreRoute, ...mestrePopupRoute];

@NgModule({
    imports: [JHipsterMonolithicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MestreComponent, MestreDetailComponent, MestreUpdateComponent, MestreDeleteDialogComponent, MestreDeletePopupComponent],
    entryComponents: [MestreComponent, MestreUpdateComponent, MestreDeleteDialogComponent, MestreDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterMonolithicMestreModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
