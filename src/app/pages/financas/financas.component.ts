import { Component, ViewChild, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Financa } from 'src/app/models/financa';
import { DaterangepickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FinancasService } from 'src/app/service/financas.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FinancasResolverService } from './financas-resolver.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-financas',
    templateUrl: './financas.component.html',
    styleUrls: ['./financas.component.scss']
})
export class FinancasComponent implements OnDestroy {
    startDate: string;
    endDate: string;

    isBrowser = false;

    modalItem: Financa;

    total: number;
    financas: Financa[];

    options: any;
    lancamento: FormGroup;

    constructor(
        private readonly api: FinancasService,
        private readonly toastr: ToastrService,
        private readonly modal: NgbModal,
        private readonly router: Router,
        private readonly builder: FormBuilder,
        readonly route: ActivatedRoute,
        private readonly resolver: FinancasResolverService,
        @Inject(PLATFORM_ID) platformId: string
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        route.queryParams.subscribe((params) => {
            if (params.startDate && params.endDate) {
                const startDate = moment(params.startDate, 'DD-MM-YYYY');
                const endDate = moment(params.endDate, 'DD-MM-YYYY');

                if (startDate.isValid() && endDate.isValid()) {
                    if (!startDate.isSameOrAfter(endDate)) {
                        this.startDate = startDate.format('DD/MM/YYYY');
                        this.endDate = endDate.format('DD/MM/YYYY');

                        this.options = {
                            startDate,
                            endDate,
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
        this.startDate = moment().startOf('month').format('DD/MM/YYYY');
        this.endDate = moment().endOf('month').format('DD/MM/YYYY');

        return {
            startDate: this.startDate,
            endDate: this.endDate,
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
                    this.getDataFromFinancas(this.startDate, this.endDate);
                } else {
                    this.toastr.error('Lançamento não encontrado!', this.modalItem.title);
                }
            }, (err) => this.toastr.error(err.message, 'Falha ao acessar a aplicação'));
    }

    selectedDate({ start, end }: { start: moment.Moment, end: moment.Moment }) {
        const startDate = start.format('DD-MM-YYYY');
        const endDate = end.format('DD-MM-YYYY');

        this.startDate = startDate;
        this.endDate = endDate;

        this.getDataFromFinancas(startDate, endDate);
    }

    getDataFromFinancas(startDate, endDate) {
        this.resolver.getData(startDate, endDate)
            .subscribe((financa) => {
                if (financa) {
                    this.total = financa.total;
                    this.financas = financa.financas;
                } else {
                    this.total = 0;
                    this.financas = null;
                }
            });
    }

    novaFinanca(modal) {
        this.lancamento = this.builder.group({
            title: [null, Validators.required],
            tipo: [0, Validators.required],
            valor: [null, Validators.required],
            lancarEm: [null],
            vencimento: [null]
        });

        this.modal.open(modal, {
            centered: true,
            size: 'lg'
        });
    }

    cancelarModalFinanca() {
        this.lancamento = null;
        this.modal.dismissAll();
    }

    novoLancamento(fileInput: HTMLInputElement) {
        const { title, tipo, valor } = this.lancamento.value;

        if (tipo === 0) {
            if (this.lancamento.value.lancarEm) {
                const send = {
                    title,
                    tipo,
                    valor,
                    lancarEm: this.lancamento.value.lancarEm ?
                        moment(this.lancamento.value.lancarEm, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
                };

                this.api.save(send)
                    .subscribe(
                        () => {
                            this.toastr.success('Dados salvos com sucesso', 'Dados enviados');
                            this.modal.dismissAll();
                            this.router.navigate(['/financas']);
                        },
                        (err) => {
                            console.error(err);
                            this.toastr.error('Falha ao enviar dados para a aplicação', 'Falha ao enviar');
                            this.modal.dismissAll();
                        });
            } else {
                this.toastr.warning('Escolha uma data de lançamento', 'Não foi possível enviar dados');
            }
        } else {
            const send = {
                title,
                tipo,
                valor,
                anexo: null,
                vencimento: this.lancamento.value.vencimento ?
                    moment(this.lancamento.value.vencimento, 'YYYY-MM-DD').format('DD/MM/YYYY') : null,
            };
            const file = fileInput.files[0];

            if (file) {
                if (file.size <= 5 * 1024 * 1024 * 1024) {
                    this.api.upload(file, file.name)
                        .pipe(switchMap((id) => {
                            send.anexo = id;

                            return this.api.save(send);
                        }))
                        .subscribe(
                            () => {
                                this.toastr.success('Dados salvos com sucesso', 'Dados enviados');
                                this.modal.dismissAll();
                                this.router.navigate(['/financas']);
                            },
                            (err) => {
                                console.error(err);
                                this.toastr.error('Falha ao enviar dados para a aplicação', 'Falha ao enviar');
                                this.modal.dismissAll();
                            });
                } else {
                    this.toastr.warning('Arquivo maior que o permitido, somente arquivos menores que 5MB', 'Envio de arquivo');
                    fileInput.files = null;
                }
            } else {
                this.api.save(send)
                    .subscribe(
                        () => {
                            this.toastr.success('Dados salvos com sucesso', 'Dados enviados');
                            this.modal.dismissAll();
                            this.router.navigate(['/financas']);
                        },
                        (err) => {
                            console.error(err);
                            this.toastr.error('Falha ao enviar dados para a aplicação', 'Falha ao enviar');
                            this.modal.dismissAll();
                        });
            }
        }
    }

    marcarComoPago(item) {
        this.api.marcarComoPago(item.id)
            .subscribe(() => {
                console.log('Ok');
                this.getDataFromFinancas(this.startDate, this.endDate);
            });
    }

    ngOnDestroy() {
        this.modal.dismissAll();
    }
}
