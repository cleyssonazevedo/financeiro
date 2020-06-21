import { Component } from '@angular/core';
import { NgbModal, NgbInputDatepickerConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Financa } from 'src/app/models/financa';

@Component({
    selector: 'app-financas',
    templateUrl: './financas.component.html',
    styleUrls: ['./financas.component.scss']
})
export class FinancasComponent {
    modalItem: Financa;

    total = 4230.30 - 250 - 100 - 180 - 600;
    financas: Financa[] = [
        {
            title: 'Salário',
            valor: 4230.00,
            tipo: 0
        },
        {
            title: 'Conta de Luz',
            vencimento: '20/06/2020',
            valor: 250.00,
            tipo: 1,
            status: 2,
            anexo: '/api/download/38120983912038'
        },
        {
            title: 'Conta de Água',
            vencimento: '05/06/2020',
            valor: 100.00,
            tipo: 1,
            status: 1
        },
        {
            title: 'Conta de Telefone',
            vencimento: '05/06/2020',
            valor: 180.00,
            tipo: 1,
            status: 0
        },
        {
            title: 'Prestação carro',
            vencimento: '20/06/2020',
            valor: 600.00,
            tipo: 1,
            status: 2
        },
    ];

    abrirFiltroData = false;
    filtroData: string;

    constructor(
        private readonly modal: NgbModal
    ) { }

    openModal(item: Financa, modalTemplate: any) {
        if (item.tipo === 1) {
            this.modalItem = item;
            this.modal.open(modalTemplate, { centered: true, size: 'lg' });
        }
    }

    openModalConfirm(modalTemplate: any) {
        this.modal.dismissAll();
        this.modal.open(modalTemplate, { centered: true });
    }

    closeModal() {
        this.modal.dismissAll();
    }

    abrirCalendario(dp) {
        this.abrirFiltroData = true;
    }

    excluir() {
        this.financas = this.financas.filter((item) => item !== this.modalItem);
        this.modal.dismissAll();
    }
}
