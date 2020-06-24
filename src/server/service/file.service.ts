import { AnexoTable } from '../schema/anexo.schema';

export async function save(idUsuario: string, anexo: Buffer, nome: string) {
    const create = await AnexoTable.create({
        nome,
        anexo,
        idUsuario
    });

    return create.get('id');
}

export async function getData(id: string, idUsuario: string) {
    const data = await AnexoTable.findOne({ id, idUsuario });

    return {
        id: data.get('id'),
        nome: data.get('nome'),
        anexo: data.get('anexo')
    };
}
