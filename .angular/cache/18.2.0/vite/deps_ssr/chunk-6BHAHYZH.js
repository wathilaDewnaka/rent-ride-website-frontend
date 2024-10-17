import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-LUUSIJBU.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  Input,
  NgModule,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate
} from "./chunk-TCWX6PIO.js";
import {
  require_cjs
} from "./chunk-VDZEJD3D.js";
import {
  __toESM
} from "./chunk-NQ4HTGF6.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-form.mjs
var import_rxjs = __toESM(require_cjs(), 1);
function NzFormItemFeedbackIconComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("nzType", ctx_r0.iconType);
  }
}
var _NzFormStatusService = class _NzFormStatusService {
  constructor() {
    this.formStatusChanges = new import_rxjs.ReplaySubject(1);
  }
};
_NzFormStatusService.ɵfac = function NzFormStatusService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormStatusService)();
};
_NzFormStatusService.ɵprov = ɵɵdefineInjectable({
  token: _NzFormStatusService,
  factory: _NzFormStatusService.ɵfac
});
var NzFormStatusService = _NzFormStatusService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormStatusService, [{
    type: Injectable
  }], null, null);
})();
var _NzFormNoStatusService = class _NzFormNoStatusService {
  constructor() {
    this.noFormStatus = new import_rxjs.BehaviorSubject(false);
  }
};
_NzFormNoStatusService.ɵfac = function NzFormNoStatusService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormNoStatusService)();
};
_NzFormNoStatusService.ɵprov = ɵɵdefineInjectable({
  token: _NzFormNoStatusService,
  factory: _NzFormNoStatusService.ɵfac
});
var NzFormNoStatusService = _NzFormNoStatusService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormNoStatusService, [{
    type: Injectable
  }], null, null);
})();
var iconTypeMap = {
  error: "close-circle-fill",
  validating: "loading",
  success: "check-circle-fill",
  warning: "exclamation-circle-fill"
};
var _NzFormItemFeedbackIconComponent = class _NzFormItemFeedbackIconComponent {
  constructor(cdr) {
    this.cdr = cdr;
    this.status = "";
    this.iconType = null;
  }
  ngOnChanges(_changes) {
    this.updateIcon();
  }
  updateIcon() {
    this.iconType = this.status ? iconTypeMap[this.status] : null;
    this.cdr.markForCheck();
  }
};
_NzFormItemFeedbackIconComponent.ɵfac = function NzFormItemFeedbackIconComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormItemFeedbackIconComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
};
_NzFormItemFeedbackIconComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzFormItemFeedbackIconComponent,
  selectors: [["nz-form-item-feedback-icon"]],
  hostAttrs: [1, "ant-form-item-feedback-icon"],
  hostVars: 8,
  hostBindings: function NzFormItemFeedbackIconComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ant-form-item-feedback-icon-error", ctx.status === "error")("ant-form-item-feedback-icon-warning", ctx.status === "warning")("ant-form-item-feedback-icon-success", ctx.status === "success")("ant-form-item-feedback-icon-validating", ctx.status === "validating");
    }
  },
  inputs: {
    status: "status"
  },
  exportAs: ["nzFormFeedbackIcon"],
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 1,
  vars: 1,
  consts: [["nz-icon", "", 3, "nzType"]],
  template: function NzFormItemFeedbackIconComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NzFormItemFeedbackIconComponent_Conditional_0_Template, 1, 1, "span", 0);
    }
    if (rf & 2) {
      ɵɵconditional(ctx.iconType ? 0 : -1);
    }
  },
  dependencies: [NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
});
var NzFormItemFeedbackIconComponent = _NzFormItemFeedbackIconComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormItemFeedbackIconComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-item-feedback-icon",
      exportAs: "nzFormFeedbackIcon",
      standalone: true,
      imports: [NzIconModule],
      preserveWhitespaces: false,
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (iconType) {
      <span nz-icon [nzType]="iconType"></span>
    }
  `,
      host: {
        class: "ant-form-item-feedback-icon",
        "[class.ant-form-item-feedback-icon-error]": 'status==="error"',
        "[class.ant-form-item-feedback-icon-warning]": 'status==="warning"',
        "[class.ant-form-item-feedback-icon-success]": 'status==="success"',
        "[class.ant-form-item-feedback-icon-validating]": 'status==="validating"'
      }
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    status: [{
      type: Input
    }]
  });
})();
var _NzFormPatchModule = class _NzFormPatchModule {
};
_NzFormPatchModule.ɵfac = function NzFormPatchModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormPatchModule)();
};
_NzFormPatchModule.ɵmod = ɵɵdefineNgModule({
  type: _NzFormPatchModule,
  imports: [NzFormItemFeedbackIconComponent],
  exports: [NzFormItemFeedbackIconComponent]
});
_NzFormPatchModule.ɵinj = ɵɵdefineInjector({
  imports: [NzFormItemFeedbackIconComponent]
});
var NzFormPatchModule = _NzFormPatchModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormPatchModule, [{
    type: NgModule,
    args: [{
      imports: [NzFormItemFeedbackIconComponent],
      exports: [NzFormItemFeedbackIconComponent]
    }]
  }], null, null);
})();

export {
  NzFormStatusService,
  NzFormNoStatusService,
  NzFormItemFeedbackIconComponent,
  NzFormPatchModule
};
//# sourceMappingURL=chunk-6BHAHYZH.js.map
