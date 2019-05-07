import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'mestre',
                loadChildren: './mestre/mestre.module#JHipsterMonolithicMestreModule'
            },
            {
                path: 'detalhe',
                loadChildren: './detalhe/detalhe.module#JHipsterMonolithicDetalheModule'
            },
            {
                path: 'mestre-detalhe',
                loadChildren: './mestre-detalhe/mestre-detalhe.module#JHipsterMonolithicDetalheModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JHipsterMonolithicEntityModule {}
