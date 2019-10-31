import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import * as grapesjs from '../../../../../node_modules/grapesjs/dist/grapes.js';
declare var $;

@Component({
  selector: 'jhi-publish',
  templateUrl: './publish.component.html',
  // styleUrls: ['home.scss']
})
export class PublishComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
editor:any;
  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.editor = grapesjs.init({
      container: '#gjs',
      // crossOrigin: 'anonymous',
       fromElement: 1,

      // avoidInlineStyle: 1,
      // fromElement: 1,
      canvas: {
        // styles: this.customConfig.styles,
        // scripts: this.customConfig.grapeScripts,
      },
      // modal: {
      //   // options
      // },
      domComponents: {
        // options
      },
      storageManager: {
        autosave: false,
        autoload: false
      },

      assetManager: {
        storageType: '',
        storeOnChange: true,
        storeAfterUpload: true,
        upload: 'https://localhost/assets/upload', //for temporary storage
        // assets: this.imageslist,

        addBtnText: 'Add '
      },
      colorPicker: { appendTo: 'parent', offset: { top: 26, left: -166 } },

      plugins: [
        // 'skywriter',
        //  'gjs-preset-webpage',
         'gjs-blocks-basic'
        // 'grapesjs-parser-postcss',
        // 'grapesjs-custom-code',
        // 'grapesjs-touch',
        // 'gjs-component-countdown',
        //  'gjs-navbar',
      ],

      allowScripts: 1,
      //
      // pluginsOpts: {
      //    // 'gjs-preset-webpage': {},
      //   // 'gjs-blocks-basic': {
      //   //   /* ...options */
      //   // }
      // }
      // });
    });
  }

  // registerAuthenticationSuccess() {
  //   this.eventManager.subscribe('authenticationSuccess', message => {
  //     this.accountService.identity().then(account => {
  //       this.account = account;
  //     });
  //   });
  // }
  //
  // isAuthenticated() {
  //   return this.accountService.isAuthenticated();
  // }
  //
  // login() {
  //   this.modalRef = this.loginModalService.open();
  // }
}
