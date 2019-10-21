/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ContactComponentsPage, ContactDeleteDialog, ContactUpdatePage } from './contact.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Contact e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contactUpdatePage: ContactUpdatePage;
  let contactComponentsPage: ContactComponentsPage;
  let contactDeleteDialog: ContactDeleteDialog;
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

  it('should load Contacts', async () => {
    await navBarPage.goToEntity('contact');
    contactComponentsPage = new ContactComponentsPage();
    await browser.wait(ec.visibilityOf(contactComponentsPage.title), 5000);
    expect(await contactComponentsPage.getTitle()).to.eq('gatewayApp.coreContact.home.title');
  });

  it('should load create Contact page', async () => {
    await contactComponentsPage.clickOnCreateButton();
    contactUpdatePage = new ContactUpdatePage();
    expect(await contactUpdatePage.getPageTitle()).to.eq('gatewayApp.coreContact.home.createOrEditLabel');
    await contactUpdatePage.cancel();
  });

  it('should create and save Contacts', async () => {
    const nbButtonsBeforeCreate = await contactComponentsPage.countDeleteButtons();

    await contactComponentsPage.clickOnCreateButton();
    await promise.all([
      contactUpdatePage.setNameFirstInput('nameFirst'),
      contactUpdatePage.setNameLastInput('nameLast'),
      contactUpdatePage.setTitleInput('title'),
      contactUpdatePage.setCompanyInput('company'),
      contactUpdatePage.setContactImageInput(absolutePath),
      contactUpdatePage.setContactImageContentTypeInput('contactImageContentType'),
      contactUpdatePage.setCreatedByUserInput('createdByUser'),
      contactUpdatePage.setCreatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      contactUpdatePage.setUpdatedByUserInput('updatedByUser'),
      contactUpdatePage.setUpdatedDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      contactUpdatePage.setStatusInput('status'),
      contactUpdatePage.setDomainInput('domain')
    ]);
    expect(await contactUpdatePage.getNameFirstInput()).to.eq('nameFirst', 'Expected NameFirst value to be equals to nameFirst');
    expect(await contactUpdatePage.getNameLastInput()).to.eq('nameLast', 'Expected NameLast value to be equals to nameLast');
    expect(await contactUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await contactUpdatePage.getCompanyInput()).to.eq('company', 'Expected Company value to be equals to company');
    expect(await contactUpdatePage.getContactImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected ContactImage value to be end with ' + fileNameToUpload
    );
    expect(await contactUpdatePage.getContactImageContentTypeInput()).to.eq(
      'contactImageContentType',
      'Expected ContactImageContentType value to be equals to contactImageContentType'
    );
    expect(await contactUpdatePage.getCreatedByUserInput()).to.eq(
      'createdByUser',
      'Expected CreatedByUser value to be equals to createdByUser'
    );
    expect(await contactUpdatePage.getCreatedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDateTime value to be equals to 2000-12-31'
    );
    expect(await contactUpdatePage.getUpdatedByUserInput()).to.eq(
      'updatedByUser',
      'Expected UpdatedByUser value to be equals to updatedByUser'
    );
    expect(await contactUpdatePage.getUpdatedDateTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected updatedDateTime value to be equals to 2000-12-31'
    );
    expect(await contactUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
    expect(await contactUpdatePage.getDomainInput()).to.eq('domain', 'Expected Domain value to be equals to domain');
    await contactUpdatePage.save();
    expect(await contactUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Contact', async () => {
    const nbButtonsBeforeDelete = await contactComponentsPage.countDeleteButtons();
    await contactComponentsPage.clickOnLastDeleteButton();

    contactDeleteDialog = new ContactDeleteDialog();
    expect(await contactDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreContact.delete.question');
    await contactDeleteDialog.clickOnConfirmButton();

    expect(await contactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
