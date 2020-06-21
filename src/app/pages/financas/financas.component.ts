import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Financa } from 'src/app/models/financa';
import { DaterangepickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-financas',
    templateUrl: './financas.component.html',
    styleUrls: ['./financas.component.scss']
})
export class FinancasComponent {
    @ViewChild(DaterangepickerComponent)
    private picker: DaterangepickerComponent;

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

    options: any;

    constructor(
        private readonly modal: NgbModal,
        private readonly router: Router,
        readonly route: ActivatedRoute
    ) {
        route.queryParams.subscribe((params) => {
            if (params.startDate && params.endDate) {
                const startDate = moment(params.startDate, 'DD-MM-YYYY');
                const endDate = moment(params.endDate, 'DD-MM-YYYY');

                if (startDate.isValid() && endDate.isValid()) {
                    if (!startDate.isSameOrAfter(endDate)) {
                        this.options = {
                            startDate: startDate.format('DD/MM/YYYY'),
                            endDate: endDate.format('DD/MM/YYYY'),
                            locale: {
                                format: 'DD/MM/YYYY',
                                separator: ' - ',
                                applyLabel: 'Aplicar',
                                cancelLabel: 'Cancelar',
                                fromLabel: 'De',
                                toLabel: 'Para',
                                customRangeLabel: 'Custom',
                                weekLabel: 'S',
                                daysOfWeek: [
                                    'Dom',
                                    'Seg',
                                    'Ter',
                                    'Qua',
                                    'Qui',
                                    'Sex',
                                    'Sab'
                                ],
                                monthNames: [
                                    'Janeiro',
                                    'Fevereiro',
                                    'Março',
                                    'Abril',
                                    'Maio',
                                    'Junho',
                                    'Julho',
                                    'Agosto',
                                    'Setembro',
                                    'Outubro',
                                    'Novembro',
                                    'Dezembro'
                                ],
                                firstDay: 1
                            }
                        };
                    } else {
                        this.options = this.defaultDate();
                    }
                } else {
                    this.options = this.defaultDate();
                }
            } else {
                this.options = this.defaultDate();
            }
        });
    }

    defaultDate() {
        return {
            startDate: moment().startOf('month').format('DD/MM/YYYY'),
            endDate: moment().endOf('month').format('DD/MM/YYYY'),
            locale: {
                format: 'DD/MM/YYYY',
                separator: ' - ',
                applyLabel: 'Aplicar',
                cancelLabel: 'Cancelar',
                fromLabel: 'De',
                toLabel: 'Para',
                customRangeLabel: 'Custom',
                weekLabel: 'S',
                daysOfWeek: [
                    'Dom',
                    'Seg',
                    'Ter',
                    'Qua',
                    'Qui',
                    'Sex',
                    'Sab'
                ],
                monthNames: [
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'
                ],
                firstDay: 1
            }
        };
    }

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

    excluir() {
        this.financas = this.financas.filter((item) => item !== this.modalItem);
        this.modal.dismissAll();
    }

    selectedDate({ start, end }: { start: moment.Moment, end: moment.Moment}) {
        const startDate = start.format('DD-MM-YYYY');
        const endDate = end.format('DD-MM-YYYY');

        this.router.navigate(['/financas'], {
            queryParams: { startDate, endDate }
        });
    }
}
