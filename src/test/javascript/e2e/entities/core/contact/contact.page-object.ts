import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ContactComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contact div table .btn-danger'));
  title = element.all(by.css('jhi-contact div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ContactUpdatePage {
  pageTitle = element(by.id('jhi-contact-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameFirstInput = element(by.id('field_nameFirst'));
  nameLastInput = element(by.id('field_nameLast'));
  titleInput = element(by.id('field_title'));
  companyInput = element(by.id('field_company'));
  contactImageInput = element(by.id('file_contactImage'));
  contactImageContentTypeInput = element(by.id('field_contactImageContentType'));
  createdByUserInput = element(by.id('field_createdByUser'));
  createdDateTimeInput = element(by.id('field_createdDateTime'));
  updatedByUserInput = element(by.id('field_updatedByUser'));
  updatedDateTimeInput = element(by.id('field_updatedDateTime'));
  statusInput = element(by.id('field_status'));
  domainInput = element(by.id('field_domain'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameFirstInput(nameFirst) {
    await this.nameFirstInput.sendKeys(nameFirst);
  }

  async getNameFirstInput() {
    return await this.nameFirstInput.getAttribute('value');
  }

  async setNameLastInput(nameLast) {
    await this.nameLastInput.sendKeys(nameLast);
  }

  async getNameLastInput() {
    return await this.nameLastInput.getAttribute('value');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setCompanyInput(company) {
    await this.companyInput.sendKeys(company);
  }

  async getCompanyInput() {
    return await this.companyInput.getAttribute('value');
  }

  async setContactImageInput(contactImage) {
    await this.contactImageInput.sendKeys(contactImage);
  }

  async getContactImageInput() {
    return await this.contactImageInput.getAttribute('value');
  }

  async setContactImageContentTypeInput(contactImageContentType) {
    await this.contactImageContentTypeInput.sendKeys(contactImageContentType);
  }

  async getContactImageContentTypeInput() {
    return await this.contactImageContentTypeInput.getAttribute('value');
  }

  async setCreatedByUserInput(createdByUser) {
    await this.createdByUserInput.sendKeys(createdByUser);
  }

  async getCreatedByUserInput() {
    return await this.createdByUserInput.getAttribute('value');
  }

  async setCreatedDateTimeInput(createdDateTime) {
    await this.createdDateTimeInput.sendKeys(createdDateTime);
  }

  async getCreatedDateTimeInput() {
    return await this.createdDateTimeInput.getAttribute('value');
  }

  async setUpdatedByUserInput(updatedByUser) {
    await this.updatedByUserInput.sendKeys(updatedByUser);
  }

  async getUpdatedByUserInput() {
    return await this.updatedByUserInput.getAttribute('value');
  }

  async setUpdatedDateTimeInput(updatedDateTime) {
    await this.updatedDateTimeInput.sendKeys(updatedDateTime);
  }

  async getUpdatedDateTimeInput() {
    return await this.updatedDateTimeInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return await this.statusInput.getAttribute('value');
  }

  async setDomainInput(domain) {
    await this.domainInput.sendKeys(domain);
  }

  async getDomainInput() {
    return await this.domainInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ContactDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contact-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contact'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
