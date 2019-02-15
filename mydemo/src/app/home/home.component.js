"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var data_service_1 = require("./../core/_service/data.service");
var HomeComponent = (function () {
    function HomeComponent(dataService, modalService) {
        this.dataService = dataService;
        this.modalService = modalService;
        this.mDash = {};
        this.apiUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';
    }
    // function called on load
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mDash.pagelength = [5, 10, 25, 50, 100];
        this.mDash.cTblPage = 10;
        this.dataService.setUrl(this.apiUrl);
        //Called on load
        this.dataService.rowDataAPI(function (data) {
            _this.mDash.rows = data;
            _this.mDash.temp = data;
        });
        //Called on every 10 seconds
        setInterval(function () {
            _this.dataService.rowDataAPI(function (data) {
                _this.mDash.rows = data;
                _this.mDash.temp = data;
            });
        }, 10000);
    };
    // funtion used for search functionality in table
    HomeComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var tmpIB = this.mDash.temp.filter(function (t) {
            var title = t.title.toString().toLowerCase().indexOf(val);
            var rt = title !== -1 || !val;
            return rt;
        });
        // update the rows
        this.mDash.rows = tmpIB;
        this.table.offset = 0;
    };
    HomeComponent.prototype.renderRawJson = function (row, $event) {
        this._docclickEvent = $event;
        this.msg = row;
        this.thModal = this.modalService.open(this.modalBox, { windowClass: 'success-modal', backdrop: 'static', keyboard: false });
    };
    // function to change table records limit
    HomeComponent.prototype.onLimitChange = function (limit) {
        var _this = this;
        this.mDash.cTblPage = parseInt(limit, 10);
        this.table.limit = this.mDash.cTblPage;
        this.table.recalculate();
        setTimeout(function () {
            if (_this.table.bodyComponent.temp.length <= 0) {
                _this.table.offset = Math.floor((_this.table.rowCount - 1) / _this.table.limit);
            }
        });
    };
    /**
    @Method :toggle
    @Descp : checked/unchecked checkbox
    **/
    HomeComponent.prototype.toggle = function ($event) {
        this._docclickEvent = $event;
    };
    HomeComponent.prototype.onDocumentClick = function (event) {
        if (this.thModal && event != this._docclickEvent) {
            this.thModal.dismiss('');
        }
    };
    return HomeComponent;
}());
__decorate([
    core_1.ViewChild(ngx_datatable_1.DatatableComponent),
    __metadata("design:type", ngx_datatable_1.DatatableComponent)
], HomeComponent.prototype, "table", void 0);
__decorate([
    core_1.ViewChild('modalBox'),
    __metadata("design:type", Object)
], HomeComponent.prototype, "modalBox", void 0);
__decorate([
    core_1.HostListener('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], HomeComponent.prototype, "onDocumentClick", null);
HomeComponent = __decorate([
    core_1.Component({
        templateUrl: "home.component.html",
        providers: [data_service_1.DataService]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, ng_bootstrap_1.NgbModal])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map