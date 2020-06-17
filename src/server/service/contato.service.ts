import { Contato } from '../model/contato.model';
import { ContatoTable } from '../schema/contato.schema';

export function Save(data: Contato) {
    return ContatoTable.create(data);
}
