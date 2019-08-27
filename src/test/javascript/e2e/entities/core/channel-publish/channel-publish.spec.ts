/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ChannelComponentsPage, ChannelDeleteDialog, ChannelUpdatePage } from './channel-publish.page-object';

const expect = chai.expect;

describe('Channel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let channelUpdatePage: ChannelUpdatePage;
  let channelComponentsPage: ChannelComponentsPage;
  let channelDeleteDialog: ChannelDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Channels', async () => {
    await navBarPage.goToEntity('channel-publish');
    channelComponentsPage = new ChannelComponentsPage();
    await browser.wait(ec.visibilityOf(channelComponentsPage.title), 5000);
    expect(await channelComponentsPage.getTitle()).to.eq('gatewayApp.coreChannel.home.title');
  });

  it('should load create Channel page', async () => {
    await channelComponentsPage.clickOnCreateButton();
    channelUpdatePage = new ChannelUpdatePage();
    expect(await channelUpdatePage.getPageTitle()).to.eq('gatewayApp.coreChannel.home.createOrEditLabel');
    await channelUpdatePage.cancel();
  });

  it('should create and save Channels', async () => {
    const nbButtonsBeforeCreate = await channelComponentsPage.countDeleteButtons();

    await channelComponentsPage.clickOnCreateButton();
    await promise.all([
      channelUpdatePage.setNameInput('name'),
      channelUpdatePage.setDescriptionInput('description'),
      channelUpdatePage.setTypeInput('type'),
      channelUpdatePage.setChanneltypeInput('channeltype'),
      channelUpdatePage.setDetailsInput('details'),
      channelUpdatePage.setCreatedByUserInput('createdByUser'),
      channelUpdatePage.setCreatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      channelUpdatePage.setUpdatedByUserInput('updatedByUser'),
      channelUpdatePage.setUpdatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      channelUpdatePage.setStatusInput('status'),
      channelUpdatePage.setDomainInput('domain')
    ]);
    expect(await channelUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await channelUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await channelUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');
    expect(await channelUpdatePage.getChanneltypeInput()).to.eq('channeltype', 'Expected Channeltype value to be equals to channeltype');
    expect(await channelUpdatePage.getDetailsInput()).to.eq('details', 'Expected Details value to be equals to details');
    expect(await channelUpdatePage.getCreatedByUserInput()).to.eq(
      'createdByUser',
      'Expected CreatedByUser value to be equals to createdByUser'
    );
    expect(await channelUpdatePage.getCreatedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDateTime value to be equals to 2000-12-31'
    );
    expect(await channelUpdatePage.getUpdatedByUserInput()).to.eq(
      'updatedByUser',
      'Expected UpdatedByUser value to be equals to updatedByUser'
    );
    expect(await channelUpdatePage.getUpdatedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected updatedDateTime value to be equals to 2000-12-31'
    );
    expect(await channelUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
    expect(await channelUpdatePage.getDomainInput()).to.eq('domain', 'Expected Domain value to be equals to domain');
    await channelUpdatePage.save();
    expect(await channelUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await channelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Channel', async () => {
    const nbButtonsBeforeDelete = await channelComponentsPage.countDeleteButtons();
    await channelComponentsPage.clickOnLastDeleteButton();

    channelDeleteDialog = new ChannelDeleteDialog();
    expect(await channelDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreChannel.delete.question');
    await channelDeleteDialog.clickOnConfirmButton();

    expect(await channelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
