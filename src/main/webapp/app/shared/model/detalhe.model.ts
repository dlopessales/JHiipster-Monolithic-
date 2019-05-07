import { Moment } from 'moment';
import { IMestre } from 'app/shared/model/mestre.model';

export interface IDetalhe {
    id?: number;
    nome?: string;
    data?: Moment;
    mestre?: IMestre;
}

export class Detalhe implements IDetalhe {
    constructor(public id?: number, public nome?: string, public data?: Moment, public mestre?: IMestre) {}
}
