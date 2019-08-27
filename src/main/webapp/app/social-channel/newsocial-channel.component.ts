import { ChannelPublishService } from './../entities/core/channel-publish/channel-publish.service';
import { AccountService, Account } from 'app/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SocialChannel, SocialChannelTypeEnum } from './social-channel.model';
import { SocialChannelService } from './social-channel.service';

import { Title } from '@angular/platform-browser';
import { ChannelPublish } from '../shared/model/core/channel-publish.model';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SharedService } from 'app/shared/services/shared.service';
declare var $: any;

@Component({
  selector: 'jhi-social-channel-new',
  templateUrl: './newsocial-channel.component.html'
})
export class NewSocialChannelComponent implements OnInit {
  channel = new SocialChannel();
  isSaving: boolean;
  account: Account;
  domain = 'test';
  userDomain: any;
  siteDNS: any;
  cahnneltype: string;
  checkcustomdns: any;
  condition = true;
  titleKeyword = 'Site Name';
  isEmail = false;
  socials = { selected: false, name: '' };
  socialchannels = [];
  channelKey: string;
  channledomain: string;
  socialtype: any;
  froalaOption = {
    height: 200,
    key: 'lA5D5C4C2uF2C1F1H2A10B1C7A1E6E5hqszwA2ipejlvtdppeduD3kfg==',
    toolbarButtons: ['bold', 'italic', 'underline', 'formatUL', 'outdent', 'indent', 'insertLink'],
    quickInsertTags: ['']
  };
  requestToken = {
    authenticationURL: '',
    authorizationURL: '',
    token: '',
    tokenSecret: ''
  };
  userToken = {
    token: '',
    tokenSecret: '',
    screenName: '',
    expireIn: '',
    userId: 481856352
  };
  mode: string;

  loading = false;
  pageForm: FormGroup;
  showNameError: boolean;
  showtypeError;
  socialAuth = false;

  constructor(
    // public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
    private socialchannelService: SocialChannelService,
    private eventManager: JhiEventManager,
    private router: Router,
    private titleService: Title,
    //  private channelService: ChannelPublishService,
    public route: ActivatedRoute,
    private datePipe: DatePipe,
    private accountService: AccountService,
    private socialAuthService: AuthService,
    private sharedService: SharedService // private linkedInService: LinkedInService
  ) {}

  changedns() {
    this.siteDNS = 'skywritersaas.com';
  }

  getValue(event, channel) {
    this.channel.type = channel;
  }

  displayLgin(type: string) {
    if (
      this.mode === 'edit' &&
      this.channel.type === type &&
      (!this.channel.type || (this.channel.type === type && this.socialAuth) || !this.socialAuth)
    ) {
      return true;
    } else if (this.mode === 'new' && (!this.channel.type || (this.channel.type === type && this.socialAuth) || !this.socialAuth)) {
      return true;
    }

    return false;
  }

  capitalFirstChar(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });

    this.pageForm = new FormGroup({
      channelName: new FormControl(null, [Validators.required])
      // type: new FormControl(null, [Validators.required]),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.load(paramMap.get('id'));
        this.mode = 'edit';
      } else {
        this.mode = 'new';
        this.channel.details = JSON.stringify({
          token: '',
          expireIn: ''
        });

        this.channel.channeltype = 'POST';
      }
    });
    this.titleService.setTitle('Skywriter');

    // tslint:disable-next-line:forin
    for (let item in SocialChannelTypeEnum) {
      this.socials = { selected: false, name: '' };
      if (isNaN(Number(item))) {
        this.socials.name = item;
        // console.log(item);
        if (item.toLowerCase() === 'facebook') {
          this.socials.selected = true;
        }
        this.socialchannels.push(this.socials);
      }
    }

    this.isSaving = false;

    // Stepper
    // const $stepper = $('#stepper');
    // const $form = $stepper.first('form');

    // $stepper.steps({
    //     stepSelector: '.stepper-component__step',
    //     contentSelector: '.stepper-component__panel',
    //     footerSelector: '.stepper-component__nav',
    //     onChange: () => {
    //         const isValid = this.checkFormIsValid($form);
    //         // You can check for valid data on each step in the onChange callback, return false if not valid.
    //         return isValid;
    //     },
    //     onFinish: () => { },
    // });
  }

  checkFormIsValid($form) {
    if (!this.pageForm.get('channelName').valid) {
      this.showNameError = this.pageForm.get('channelName').valid ? false : true;
    }
    let isValid = true;
    $form.find('.form-group').removeClass('has-error');

    const inputs = $form.find("input[type='text'],input[type='radio']");

    for (const input of inputs) {
      if (!input.validity.valid) {
        isValid = false;
        // $(input)
        //     .closest('.form-group')
        //     .addClass('has-danger');
        // //console.log(input.name);
        // $('.required-error').removeClass('hide');
      }
    }
    return isValid;
  }

  load(id) {
    // this.channelService.find(id).subscribe(
    //     res => {
    //         this.channel = res.body;
    //         //console.log(this.channel);
    //     },
    //     err => { },
    // );
  }

  socialLogin(socialType: string) {
    try {
      this.channel.type = socialType;
      // console.log(socialType + '============= ' + this.channel.type);
      // console.log(socialType == this.channel.type);
      //    this.loading = true;
      if (socialType.toLowerCase() === 'twitter') {
        this.loading = true;
        this.twitterLogin();
      } else if (socialType.toLowerCase() === 'linkedin') {
        this.loading = true;
      } else if (socialType.toLowerCase() === 'facebook') {
        this.socialSignIn(this.channel.type.toLocaleLowerCase());
      }
    } catch (e) {
      // console.log(e);
    }
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      console.log(socialPlatform + ' sign in data : ', userData);

      this.sharedService.FBLongLiveToken(userData.authToken).subscribe(
        data => {
          const currentDate = Date.now();
          const expireDate = currentDate + 1000 * 60 * 60 * 24 * 30 * 12;
          this.channel.details = JSON.stringify({
            token: data.access_token,
            expireIn: this.datePipe.transform(new Date(expireDate), 'yyyy-MM-dd hh:mm:ss a')
          });
          this.channel.createdDateTime = '2018-01-01T01:00';
          this.channel.updatedDateTime = '2018-02-01T01:00';
          this.channel.channeltype = 'POST';
          this.channel.domain = this.domain;
          this.socialAuth = true;
          // this.loading = false;
          // this.channelService.create(this.channel).subscribe(
          //     data => {
          //         this.ngOnInit();
          //     },
          //     error => //console.log(JSON.stringify(error)),
          // );
          // console.log(this.channel);
        },
        err => {
          //   this.loading = false;
        }
      );
    });
  }

  LoginSuccessfuly() {
    //  this.toasterService.pop('success', 'Created', 'Logged-in successfuly');
  }

  twitterLogin() {
    try {
      let PIN = '';
      let that = this;
      this.socialchannelService.twitterLogin().subscribe(
        res => {
          this.requestToken = res.body;
          // let twitterPopup = window.open(
          //     this.requestToken.authorizationURL,
          //     'popUpWindow',
          //     'height=900,width=700,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes',
          // );
          let twitterPopup = window.open(this.requestToken.authorizationURL, '_blank');
          // search for oauth_verifier before redirect finished
          var checkInterval = setInterval(function() {
            try {
              var currentLoc = twitterPopup.location.href;
              // console.log(currentLoc + ' ' + twitterPopup.location.host);

              if (twitterPopup.closed) {
                that.loading = false;
                clearInterval(checkInterval);
              }

              if (currentLoc.includes('oauth_verifier')) {
                var pinIndex = currentLoc.indexOf('oauth_verifier');
                PIN = currentLoc.substring(pinIndex, currentLoc.length).split('=')[1];
                twitterPopup.close();
                clearInterval(checkInterval);
                that.getUserToken(PIN, that.requestToken);
              }
            } catch (err) {}
          }, 500);
        },
        err => {
          that.loading = false;
          // console.log(err);
        }
      );
    } catch (e) {
      // console.log("==== " + e);
    }
  }

  getUserToken(PIN, requestToken) {
    this.socialchannelService.twitterUserToken(PIN, requestToken).subscribe(
      token => {
        const currentDate = Date.now();
        const expireDate = currentDate + 1000 * 60 * 60 * 24 * 30 * 12;
        token.body['expireIn'] = this.datePipe.transform(new Date(expireDate), 'yyyy-MM-dd hh:mm:ss a');
        this.userToken = token.body;
        this.channel.details = JSON.stringify(this.userToken);
        this.loading = false;
        this.socialAuth = true;
        this.LoginSuccessfuly();
      },
      err => {
        this.loading = false;
        // console.log(err);
      }
    );
  }

  getLinkedinToken(code) {
    this.socialchannelService.linkedinToken(code).subscribe(
      token => {
        // console.log(token);
        const currentDate = Date.now();
        const expireDate = currentDate + parseInt(token.expires_in);
        this.datePipe.transform(new Date(expireDate), 'yyyy-MM-dd hh:mm:ss a');
        this.channel.details = JSON.stringify({
          token: token.access_token,
          expireIn: this.datePipe.transform(new Date(expireDate), 'yyyy-MM-dd hh:mm:ss a'),
          userId: token.id
        });
        this.loading = false;
        this.socialAuth = true;
        this.LoginSuccessfuly();
      },
      err => {
        this.loading = false;
        // console.log(err);
      }
    );
  }

  // registerImage(token) {
  //     this.linkedInService.registerImage(token).subscribe(res => {
  //         // console.log("-----------======= Image subscribed ======-----------------");
  //         // console.log(res);
  //     })
  // }

  // getLinkedUserDetails(token) {
  //     this.linkedInService.getUserDetails(token).subscribe(res => {
  //         // console.log("-----------==============-----------------");
  //         // console.log(res);
  //     })
  // }

  setLabels() {
    // console.log('========= ====================' + this.channel.channeltype);
    if (this.channel.channeltype.toLowerCase() != 'email') {
      this.titleKeyword = 'Site Name';
      this.isEmail = false;
    } else {
      this.titleKeyword = 'Channel Name';
      this.isEmail = true;
    }
  }

  clear() {
    // this.activeModal.dismiss('cancel');
  }

  save() {
    if (this.pageForm.get('channelName').valid && this.socialAuth) {
      if (this.mode === 'edit') {
        this.channel.createdDateTime = this.datePipe.transform(this.channel.createdDateTime, 'yyyy-MM-ddTHH:mm:ss');
        this.channel.updatedDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      }

      this.isSaving = true;
      this.channel.domain = this.domain;
      if (this.channel.id !== undefined) {
        this.channel.updatedByUser = this.account.login;
        this.channel.status = 'ACTIVE';
        this.socialchannelService.update(this.channel).subscribe(
          res => {
            this.router.navigate(['/socialchannel']);
            //  this.toasterService.pop('success', 'Updated', 'Channel updated');
          },
          err => console.log('Error:: ' + err)
        );
      } else {
        this.channel.domain = this.channel.domain;
        this.channel.createdByUser = this.account.login;
        this.channel.updatedByUser = this.account.login;
        this.channel.name = this.channel.name.toLowerCase();
        this.channel.channeltype = this.channel.channeltype.toUpperCase();
        this.channel.type = this.channel.type;
        this.channel.details = this.channel.details;
        this.channel.createdDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
        this.channel.updatedDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
        this.channel.status = 'ACTIVE';
        this.socialchannelService.create(this.channel).subscribe(
          res => {
            this.router.navigate(['/socialchannel']);
            // this.toasterService.pop('success', 'created', 'Channel created');
          },
          err => console.log('Error:: ' + err)
        );
      }
    } else {
      // console.log('llllllllllllllllllllllllllllllllllllll');
      this.showNameError = this.pageForm.get('channelName').valid ? false : true;
      this.showtypeError = !this.socialAuth;
    }
  }

  radioButtom(e) {
    if (e.target.id === 'radio_1') {
      this.condition = true;
    }
    if (e.target.id === 'radio_2') {
      this.condition = false;
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<SocialChannel>>) {
    result.subscribe((res: HttpResponse<SocialChannel>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: SocialChannel) {
    this.eventManager.broadcast({
      name: 'channelListModification',
      content: 'OK'
    });
    this.isSaving = false;
    // this.activeModal.dismiss(result);
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(error: any) {
    this.jhiAlertService.error(error.message, null, null);
  }
}
