import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CommunicationmethodComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-communicationmethod div table .btn-danger'));
  title = element.all(by.css('jhi-communicationmethod div h2#page-heading span')).first();

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

export class CommunicationmethodUpdatePage {
  pageTitle = element(by.id('jhi-communicationmethod-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  valueStringInput = element(by.id('field_valueString'));
  countryCodeInput = element(by.id('field_countryCode'));
  createdByUserInput = element(by.id('field_createdByUser'));
  createdDateTimeInput = element(by.id('field_createdDateTime'));
  updatedByUserInput = element(by.id('field_updatedByUser'));
  updatedDateTimeInput = element(by.id('field_updatedDateTime'));
  statusInput = element(by.id('field_status'));
  domainInput = element(by.id('field_domain'));
  contactSelect = element(by.id('field_contact'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setValueStringInput(valueString) {
    await this.valueStringInput.sendKeys(valueString);
  }

  async getValueStringInput() {
    return await this.valueStringInput.getAttribute('value');
  }

  async setCountryCodeInput(countryCode) {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput() {
    return await this.countryCodeInput.getAttribute('value');
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

  async contactSelectLastOption(timeout?: number) {
    await this.contactSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async contactSelectOption(option) {
    await this.contactSelect.sendKeys(option);
  }

  getContactSelect(): ElementFinder {
    return this.contactSelect;
  }

  async getContactSelectedOption() {
    return await this.contactSelect.element(by.css('option:checked')).getText();
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

export class CommunicationmethodDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-communicationmethod-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-communicationmethod'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
