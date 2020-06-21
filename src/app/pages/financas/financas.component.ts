import { Component, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Financa } from 'src/app/models/financa';
import { DaterangepickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FinancasService } from 'src/app/service/financas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-financas',
    templateUrl: './financas.component.html',
    styleUrls: ['./financas.component.scss']
})
export class FinancasComponent {
    isBrowser = false;
    @ViewChild(DaterangepickerComponent)
    private picker: DaterangepickerComponent;

    modalItem: Financa;

    total: number;
    financas: Financa[];

    options: any;

    constructor(
        private readonly api: FinancasService,
        private readonly toastr: ToastrService,
        private readonly modal: NgbModal,
        private readonly router: Router,
        readonly route: ActivatedRoute,
        @Inject(PLATFORM_ID) platformId: string
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
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

        route.data.subscribe(({ financa }) => {
            console.log('Callable');

            if (financa) {
                this.total = financa.total;
                this.financas = financa.financas;
            } else {
                this.total = 0;
                this.financas = null;
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
        this.modal.dismissAll();
        this.api.delete(this.modalItem.id)
            .subscribe((response) => {
                if (response) {
                    this.toastr.success('Lançamento removido!', this.modalItem.title);
                    this.router.navigate(['/financas']);
                } else {
                    this.toastr.error('Lançamento não encontrado!', this.modalItem.title);
                }
            }, (err) => this.toastr.error(err.message, 'Falha ao acessar a aplicação'));
    }

    selectedDate({ start, end }: { start: moment.Moment, end: moment.Moment}) {
        const startDate = start.format('DD-MM-YYYY');
        const endDate = end.format('DD-MM-YYYY');

        this.router.navigate(['/financas'], {
            queryParams: { startDate, endDate }
        });
    }
}
