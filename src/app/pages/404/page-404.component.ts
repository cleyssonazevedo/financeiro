import { Component, OnInit, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';

@Component({
    selector: 'app--page-not-found',
    templateUrl: './page-404.component.html',
    styleUrls: ['./page-404.component.scss']
})
export class Page404Component implements OnInit {
    constructor(
        private readonly meta: Meta,
        @Optional() @Inject(RESPONSE) private readonly response?: any,
        @Optional() @Inject(PLATFORM_ID) private readonly platform?: any
    ) { }

    ngOnInit() {
        if (isPlatformServer(this.platform)) {
            console.log('Run in server side');
            this.response.status(404);

            this.meta.addTags([
                {
                    name: 'robots',
                    content: 'noindex'
                },
                {
                    name: 'googlebot',
                    content: 'noindex'
                }
            ]);
        }
    }
}
