import { Component, OnInit, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { isPlatformServer } from '@angular/common';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-404.component.html',
    styleUrls: ['./page-404.component.scss']
})
export class Page404Component { }
