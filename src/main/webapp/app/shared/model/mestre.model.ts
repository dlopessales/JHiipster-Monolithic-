import { IDetalhe } from 'app/shared/model/detalhe.model';

export interface IMestre {
    id?: number;
    descricao?: string;
    detalhes?: IDetalhe[];
}

export class Mestre implements IMestre {
    constructor(public id?: number, public descricao?: string, public detalhes?: IDetalhe[]) {}
}
