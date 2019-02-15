import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home.routing.module';

@NgModule({
    imports: [HomeRoutingModule, CommonModule, NgxDatatableModule, NgbModule],
    declarations: [HomeComponent],
    exports: [NgxDatatableModule, NgbModule]
})
export class HomeModule {}