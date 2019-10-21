/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  CommunicationmethodComponentsPage,
  CommunicationmethodDeleteDialog,
  CommunicationmethodUpdatePage
} from './communicationmethod.page-object';

const expect = chai.expect;

describe('Communicationmethod e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let communicationmethodUpdatePage: CommunicationmethodUpdatePage;
  let communicationmethodComponentsPage: CommunicationmethodComponentsPage;
  let communicationmethodDeleteDialog: CommunicationmethodDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Communicationmethods', async () => {
    await navBarPage.goToEntity('communicationmethod');
    communicationmethodComponentsPage = new CommunicationmethodComponentsPage();
    await browser.wait(ec.visibilityOf(communicationmethodComponentsPage.title), 5000);
    expect(await communicationmethodComponentsPage.getTitle()).to.eq('gatewayApp.coreCommunicationmethod.home.title');
  });

  it('should load create Communicationmethod page', async () => {
    await communicationmethodComponentsPage.clickOnCreateButton();
    communicationmethodUpdatePage = new CommunicationmethodUpdatePage();
    expect(await communicationmethodUpdatePage.getPageTitle()).to.eq('gatewayApp.coreCommunicationmethod.home.createOrEditLabel');
    await communicationmethodUpdatePage.cancel();
  });

  it('should create and save Communicationmethods', async () => {
    const nbButtonsBeforeCreate = await communicationmethodComponentsPage.countDeleteButtons();

    await communicationmethodComponentsPage.clickOnCreateButton();
    await promise.all([
      communicationmethodUpdatePage.setValueStringInput('valueString'),
      communicationmethodUpdatePage.setCountryCodeInput('countryCode'),
      communicationmethodUpdatePage.setCreatedByUserInput('createdByUser'),
      communicationmethodUpdatePage.setCreatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      communicationmethodUpdatePage.setUpdatedByUserInput('updatedByUser'),
      communicationmethodUpdatePage.setUpdatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      communicationmethodUpdatePage.setStatusInput('status'),
      communicationmethodUpdatePage.setDomainInput('domain'),
      communicationmethodUpdatePage.contactSelectLastOption()
    ]);
    expect(await communicationmethodUpdatePage.getValueStringInput()).to.eq(
      'valueString',
      'Expected ValueString value to be equals to valueString'
    );
    expect(await communicationmethodUpdatePage.getCountryCodeInput()).to.eq(
      'countryCode',
      'Expected CountryCode value to be equals to countryCode'
    );
    expect(await communicationmethodUpdatePage.getCreatedByUserInput()).to.eq(
      'createdByUser',
      'Expected CreatedByUser value to be equals to createdByUser'
    );
    expect(await communicationmethodUpdatePage.getCreatedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDateTime value to be equals to 2000-12-31'
    );
    expect(await communicationmethodUpdatePage.getUpdatedByUserInput()).to.eq(
      'updatedByUser',
      'Expected UpdatedByUser value to be equals to updatedByUser'
    );
    expect(await communicationmethodUpdatePage.getUpdatedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected updatedDateTime value to be equals to 2000-12-31'
    );
    expect(await communicationmethodUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
    expect(await communicationmethodUpdatePage.getDomainInput()).to.eq('domain', 'Expected Domain value to be equals to domain');
    await communicationmethodUpdatePage.save();
    expect(await communicationmethodUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await communicationmethodComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last Communicationmethod', async () => {
    const nbButtonsBeforeDelete = await communicationmethodComponentsPage.countDeleteButtons();
    await communicationmethodComponentsPage.clickOnLastDeleteButton();

    communicationmethodDeleteDialog = new CommunicationmethodDeleteDialog();
    expect(await communicationmethodDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreCommunicationmethod.delete.question');
    await communicationmethodDeleteDialog.clickOnConfirmButton();

    expect(await communicationmethodComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
