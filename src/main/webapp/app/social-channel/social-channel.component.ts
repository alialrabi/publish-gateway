import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Title } from '@angular/platform-browser';
import { SocialChannel } from './social-channel.model';
import { SocialChannelService } from './social-channel.service';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LoginModalService, AccountService, Account } from 'app/core';

declare var $;

@Component({
  selector: 'jhi-socialchannel',
  templateUrl: './social-channel.component.html',
  styleUrls: ['socialchannel.scss']
})
export class SocialChannelComponent implements OnInit, OnDestroy {
  currentAccount: any;
  account: Account;
  channels: SocialChannel[];
  deletechannel = new SocialChannel();
  error: any;
  success: any;
  eventSubscriber: Subscription;
  currentSearch: string;
  routeData: any;
  links: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  domain: any;
  customCallback: any;
  customTableParam: any;
  // dtOptions: DataTables.Settings = {};
  dtOptions;
  dtTrigger: Subject<any> = new Subject();
  checkedList = [];
  noDataFlag = false;
  loading = false;
  searchKeyword: any;
  check: boolean;
  channelId: any;
  flag = 0;
  removed_id: any;
  private userDomainSubject: Subscription;
  expires_inlist = [];

  constructor(
    private socialchannelService: SocialChannelService,
    private parseLinks: JhiParseLinks,
    private jhiAlertService: JhiAlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager,
    private titleService: Title,
    private datePipe: DatePipe,
    private accountService: AccountService
  ) {
    // this.itemsPerPage = ITEMS_PER_PAGE;
    // this.routeData = this.activatedRoute.data.subscribe((data) => {
    //     this.page = data.pagingParams.page;
    //     this.previousPage = data.pagingParams.page;
    //     this.reverse = data.pagingParams.ascending;
    //     this.predicate = data.pagingParams.predicate;
    // });
    // this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
    //     this.activatedRoute.snapshot.params['search'] : '';
  }

  confirmDelete(id: number) {
    let deletedChannel = Object.assign({}, this.channels.filter(ch => ch.id == id)[0]);
    deletedChannel.status = 'DELETED';
    deletedChannel.createdDateTime = this.datePipe.transform(deletedChannel.createdDateTime, 'yyyy-MM-ddTHH:mm:ss');
    deletedChannel.updatedDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    this.socialchannelService.update(deletedChannel).subscribe(
      res => {
        this.channels = this.channels.filter(ch => ch.id != id);

        //console.log('removed index');
        this.expires_inlist.splice(this.removed_id, 1);
        //console.log(this.expires_inlist);

        $('#deletelu').modal('hide');
        // this.contentSiteService.deletebucket(this.domain,this.deletechannel.name).subscribe(res=>{
        //     console.log(res)
        // })
      },
      err => console.log('Error :: ' + err)
    );
  }

  changeIcon(event) {
    // tslint:disable-next-line:prefer-const
    let target = event.currentTarget;
    // tslint:disable-next-line:prefer-const
    let pElement = target.parentElement;
    // tslint:disable-next-line:prefer-const
    let pclassAttr = pElement.attributes.class.nodeValue.split(' ');
    // tslint:disable-next-line:prefer-const

    let parentClass = '.' + pclassAttr[0];
    //console.log('sdsdsdsdsdsd ' + parentClass);
    //console.log('value =  ' + event.target.value);
    // let newDOM = '';

    if (event.target.value != '') {
      $(parentClass + ' i')
        .removeClass('fa fa-search')
        .addClass('fa fa-times');
    } else {
      //console.log('ssss');
      $(parentClass + ' i')
        .removeClass('fa fa-times')
        .addClass('fa fa-search');
    }
  }

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.domain = account.login;
      // this.account.login = userprofile.user.login;
      // this.userId = userprofile.user.id;
      this.socialchannelService.getChannelsByDOmainAndType(this.domain, 'POST').subscribe(data => {
        this.channels = data.body.filter(ch => ch.status != 'DELETED');
        this.expires_inlist = [];
        this.channels.forEach(a => {
          const obj = JSON.parse(a.details);
          const MAX_TIMESTAMP = 8640000000000000;
          const unlimited_expiredate = this.datePipe.transform(new Date(MAX_TIMESTAMP), 'MM/dd/yyyy hh:mm');
          const currentdate = this.datePipe.transform(new Date(), 'MM/dd/yyyy HH:mm');

          if (obj.expireIn && obj.expireIn.length !== 0) {
            this.expires_inlist.push(obj.expireIn);
            if (new Date(obj.expireIn).getTime() <= new Date(currentdate).getTime() && a.status != 'EXPIRED') {
              a.status = 'EXPIRED';
              a.createdDateTime = this.datePipe.transform(a.createdDateTime, 'yyyy-MM-ddTHH:mm:ss');
              a.updatedDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');

              this.socialchannelService.update(a).subscribe(res => {});

              //console.log('expired');
            }
          } else {
            this.expires_inlist.push(unlimited_expiredate);
          }
        });
        //console.log(this.expires_inlist);
        //console.log('====================================');
        //console.log(this.channels);
        if (this.domain != '' && this.domain != undefined && this.domain != null) {
          this.dtTrigger.next();
        }
        this.noDataFlag = true;
      });
      //});
    });

    this.titleService.setTitle('Skywriter');

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.itemsPerPage,
      searching: false,
      order: [0, 'asc'],
      lengthMenu: [5, 10, 25]
    };

    //  this.registerChangeInChannels();
  }

  // ngOnDestroy() {
  //     this.eventManager.destroy(this.eventSubscriber);
  // }

  trackId(index: number, item: SocialChannel) {
    return item.id;
  }

  // registerChangeInChannels() {
  //     this.eventSubscriber = this.eventManager.subscribe('ChannelModification', (response) =>   this.tableFilter(this.customTableParam, this.customCallback,this.searchKeyword));
  // }

  setdatatopopup(channel, i) {
    this.removed_id = i;
    this.check = false;
    this.deletechannel = channel;
    this.channelId = channel.id;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(data, headers) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    // this.page = pagingParams.page;
    this.channels = data;
  }

  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }

  ngOnDestroy(): void {
    // this.userDomainSubject.unsubscribe();
  }
}
