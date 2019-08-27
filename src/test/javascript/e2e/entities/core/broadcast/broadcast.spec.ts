/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BroadcastComponentsPage, BroadcastDeleteDialog, BroadcastUpdatePage } from './broadcast.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Broadcast e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let broadcastUpdatePage: BroadcastUpdatePage;
  let broadcastComponentsPage: BroadcastComponentsPage;
  /*let broadcastDeleteDialog: BroadcastDeleteDialog;*/
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Broadcasts', async () => {
    await navBarPage.goToEntity('broadcast');
    broadcastComponentsPage = new BroadcastComponentsPage();
    await browser.wait(ec.visibilityOf(broadcastComponentsPage.title), 5000);
    expect(await broadcastComponentsPage.getTitle()).to.eq('gatewayApp.coreBroadcast.home.title');
  });

  it('should load create Broadcast page', async () => {
    await broadcastComponentsPage.clickOnCreateButton();
    broadcastUpdatePage = new BroadcastUpdatePage();
    expect(await broadcastUpdatePage.getPageTitle()).to.eq('gatewayApp.coreBroadcast.home.createOrEditLabel');
    await broadcastUpdatePage.cancel();
  });

  /* it('should create and save Broadcasts', async () => {
        const nbButtonsBeforeCreate = await broadcastComponentsPage.countDeleteButtons();

        await broadcastComponentsPage.clickOnCreateButton();
        await promise.all([
            broadcastUpdatePage.setFromnameInput('fromname'),
            broadcastUpdatePage.setFromemailInput('fromemail'),
            broadcastUpdatePage.setTitleInput('title'),
            broadcastUpdatePage.setAudiencejsonInput('audiencejson'),
            broadcastUpdatePage.setContenthtmlInput('contenthtml'),
            broadcastUpdatePage.setDeliveryDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            broadcastUpdatePage.setTagsInput('tags'),
            broadcastUpdatePage.setStatusInput('status'),
            broadcastUpdatePage.setCreatedByUserInput('createdByUser'),
            broadcastUpdatePage.setCreatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            broadcastUpdatePage.setUpdatedByUserInput('updatedByUser'),
            broadcastUpdatePage.setUpdatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            broadcastUpdatePage.setDomainInput('domain'),
            broadcastUpdatePage.setPublishondatetimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            broadcastUpdatePage.setPublishdatetimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            broadcastUpdatePage.setImageInput(absolutePath),
            broadcastUpdatePage.setContentjsonInput('contentjson'),
            broadcastUpdatePage.channelSelectLastOption(),
        ]);
        expect(await broadcastUpdatePage.getFromnameInput()).to.eq('fromname', 'Expected Fromname value to be equals to fromname');
        expect(await broadcastUpdatePage.getFromemailInput()).to.eq('fromemail', 'Expected Fromemail value to be equals to fromemail');
        expect(await broadcastUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
        expect(await broadcastUpdatePage.getAudiencejsonInput()).to.eq('audiencejson', 'Expected Audiencejson value to be equals to audiencejson');
        expect(await broadcastUpdatePage.getContenthtmlInput()).to.eq('contenthtml', 'Expected Contenthtml value to be equals to contenthtml');
        expect(await broadcastUpdatePage.getDeliveryDateTimeInput()).to.contain('2001-01-01T02:30', 'Expected deliveryDateTime value to be equals to 2000-12-31');
        expect(await broadcastUpdatePage.getTagsInput()).to.eq('tags', 'Expected Tags value to be equals to tags');
        expect(await broadcastUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
        expect(await broadcastUpdatePage.getCreatedByUserInput()).to.eq('createdByUser', 'Expected CreatedByUser value to be equals to createdByUser');
        expect(await broadcastUpdatePage.getCreatedDateTimeInput()).to.contain('2001-01-01T02:30', 'Expected createdDateTime value to be equals to 2000-12-31');
        expect(await broadcastUpdatePage.getUpdatedByUserInput()).to.eq('updatedByUser', 'Expected UpdatedByUser value to be equals to updatedByUser');
        expect(await broadcastUpdatePage.getUpdatedDateTimeInput()).to.contain('2001-01-01T02:30', 'Expected updatedDateTime value to be equals to 2000-12-31');
        expect(await broadcastUpdatePage.getDomainInput()).to.eq('domain', 'Expected Domain value to be equals to domain');
        expect(await broadcastUpdatePage.getPublishondatetimeInput()).to.contain('2001-01-01T02:30', 'Expected publishondatetime value to be equals to 2000-12-31');
        expect(await broadcastUpdatePage.getPublishdatetimeInput()).to.contain('2001-01-01T02:30', 'Expected publishdatetime value to be equals to 2000-12-31');
        expect(await broadcastUpdatePage.getImageInput()).to.endsWith(fileNameToUpload, 'Expected Image value to be end with ' + fileNameToUpload);
        expect(await broadcastUpdatePage.getContentjsonInput()).to.eq('contentjson', 'Expected Contentjson value to be equals to contentjson');
        await broadcastUpdatePage.save();
        expect(await broadcastUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await broadcastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Broadcast', async () => {
        const nbButtonsBeforeDelete = await broadcastComponentsPage.countDeleteButtons();
        await broadcastComponentsPage.clickOnLastDeleteButton();

        broadcastDeleteDialog = new BroadcastDeleteDialog();
        expect(await broadcastDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.coreBroadcast.delete.question');
        await broadcastDeleteDialog.clickOnConfirmButton();

        expect(await broadcastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
