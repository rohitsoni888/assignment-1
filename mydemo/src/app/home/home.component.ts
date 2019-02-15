import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {DataService} from './../core/_service/data.service';

@Component({
    templateUrl: `home.component.html`,
    providers: [DataService]
})
export class HomeComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('modalBox') modalBox: any;

    public mDash: any = {};
    public msg: any;
    public thModal: any;
    public _docclickEvent: any;
    private apiUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';

    constructor(private dataService: DataService, private modalService: NgbModal) {}

    // function called on load
    ngOnInit() {
        this.mDash.pagelength = [5, 10, 25, 50, 100];
        this.mDash.cTblPage = 10;
        this.dataService.setUrl(this.apiUrl);

        //Called on load
        this.dataService.rowDataAPI((data: any) => {
            this.mDash.rows = data;
            this.mDash.temp = data;
        });

        //Called on every 10 seconds
        setInterval(() => {
            this.dataService.rowDataAPI((data: any) => {
                this.mDash.rows = data;
                this.mDash.temp = data;
            });
        }, 10000);
    }

    // funtion used for search functionality in table
    public updateFilter(event: any) {
        var val = event.target.value.toLowerCase();
        // filter our data
        const tmpIB = this.mDash.temp.filter(function (t: any) {
            let title = t.title.toString().toLowerCase().indexOf(val);
            let rt = title !== -1 || !val;
            return rt;
        });
        // update the rows
        this.mDash.rows = tmpIB;
        this.table.offset = 0;
    }

    renderRawJson(row: any, $event: any) {
        this._docclickEvent = $event;
        this.msg = row;
        this.thModal = this.modalService.open(this.modalBox, {windowClass: 'success-modal', backdrop: 'static', keyboard: false});
    }

    // function to change table records limit
    public onLimitChange(limit: any): void {
        this.mDash.cTblPage = parseInt(limit, 10);
        this.table.limit = this.mDash.cTblPage;
        this.table.recalculate();

        setTimeout(() => {
            if (this.table.bodyComponent.temp.length <= 0) {
                this.table.offset = Math.floor((this.table.rowCount - 1) / this.table.limit);
            }
        });
    }

    /**
    @Method :toggle
    @Descp : checked/unchecked checkbox
    **/
    toggle($event: any) {
        this._docclickEvent = $event;
    }

    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {
        if (this.thModal && event != this._docclickEvent) {
            this.thModal.dismiss('');
        }
    }

}