import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-header-item',
    templateUrl: './header-item.component.html'
})
export class HeaderItemComponent {
    @Input() disabled = false;
    @Input() link: string | string[];
}
