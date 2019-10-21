/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AddressComponentsPage, AddressDeleteDialog, AddressUpdatePage } from './address.page-object';

const expect = chai.expect;

describe('Address e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let addressUpdatePage: AddressUpdatePage;
  let addressComponentsPage: AddressComponentsPage;
  let addressDeleteDialog: AddressDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Addresses', async () => {
    await navBarPage.goToEntity('address');
    addressComponentsPage = new AddressComponentsPage();
    await browser.wait(ec.visibilityOf(addressComponentsPage.title), 5000);
    expect(await addressComponentsPage.getTitle()).to.eq('gatewayApp.coreAddress.home.title');
  });

  it('should load create Address page', async () => {
    await addressComponentsPage.clickOnCreateButton();
    addressUpdatePage = new AddressUpdatePage();
    expect(await addressUpdatePage.getPageTitle()).to.eq('gatewayApp.coreAddress.home.createOrEditLabel');
    await addressUpdatePage.cancel();
  });

  it('should create and save Addresses', async () => {
    const nbButtonsBeforeCreate = await addressComponentsPage.countDeleteButtons();

    await addressComponentsPage.clickOnCreateButton();
    await promise.all([
      addressUpdatePage.setAddress1Input('address1'),
      addressUpdatePage.setCityInput('city'),
      addressUpdatePage.setStateInput('state'),
      addressUpdatePage.setZipcodeInput('zipcode'),
      addressUpdatePage.setCountryInput('country'),
      addressUpdatePage.setCreatedByUserInput('createdByUser'),
      addressUpdatePage.setCreatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      addressUpdatePage.setUpdatedByUserInput('updatedByUser'),
      addressUpdatePage.setUpdatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      addressUpdatePage.setStatusInput('status'),
      addressUpdatePage.setDomainInput('domain'),
      addressUpdatePage.addressTypeSelectLastOption(),
      addressUpdatePage.contactSelectLastOption()
    ]);
    expect(await addressUpdatePage.getAddress1Input()).to.eq('address1', 'Expected Address1 value to be equals to address1');
    expect(await addressUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await addressUpdatePage.getStateInput()).to.eq('state', 'Expected State value to be equals to state');
    expect(await addressUpdatePage.getZipcodeInput()).to.eq('zipcode', 'Expected Zipcode value to be equals to zipcode');
    expect(await addressUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
    expect(await addressUpdatePage.getCreatedByUserInput()).to.eq(
      'createdByUser',
      'Expected CreatedByUser value to be equals to createdByUser'
    );
    expect(await addressUpdatePage.getCreatedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDateTime value to be equals to 2000-12-31'
    );
    expect(await addressUpdatePage.getUpdatedByUserInput()).to.eq(
      'updatedByUser',
      'Expected UpdatedByUser value to be equals to updatedByUser'
    );
    expect(await addressUpdatePage.getUpdatedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected updatedDateTime value to be equals to 2000-12-31'
    );
    expect(await addressUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
    expect(await addressUpdatePage.getDomainInput()).to.eq('domain', 'Expected Domain value to be equals to domain');
    await addressUpdatePage.save();
    expect(await addressUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await addressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Address', async () => {
    const nbButtonsBeforeDelete = await addressComponentsPage.countDeleteButtons();
    await addressComponentsPage.clickOnLastDeleteButton();

    addressDeleteDialog = new AddressDeleteDialog();
    expect(await addressDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreAddress.delete.question');
    await addressDeleteDialog.clickOnConfirmButton();

    expect(await addressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
