import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AddressComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-address div table .btn-danger'));
  title = element.all(by.css('jhi-address div h2#page-heading span')).first();

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

export class AddressUpdatePage {
  pageTitle = element(by.id('jhi-address-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  address1Input = element(by.id('field_address1'));
  cityInput = element(by.id('field_city'));
  stateInput = element(by.id('field_state'));
  zipcodeInput = element(by.id('field_zipcode'));
  countryInput = element(by.id('field_country'));
  createdByUserInput = element(by.id('field_createdByUser'));
  createdDateTimeInput = element(by.id('field_createdDateTime'));
  updatedByUserInput = element(by.id('field_updatedByUser'));
  updatedDateTimeInput = element(by.id('field_updatedDateTime'));
  statusInput = element(by.id('field_status'));
  domainInput = element(by.id('field_domain'));
  addressTypeSelect = element(by.id('field_addressType'));
  contactSelect = element(by.id('field_contact'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAddress1Input(address1) {
    await this.address1Input.sendKeys(address1);
  }

  async getAddress1Input() {
    return await this.address1Input.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return await this.cityInput.getAttribute('value');
  }

  async setStateInput(state) {
    await this.stateInput.sendKeys(state);
  }

  async getStateInput() {
    return await this.stateInput.getAttribute('value');
  }

  async setZipcodeInput(zipcode) {
    await this.zipcodeInput.sendKeys(zipcode);
  }

  async getZipcodeInput() {
    return await this.zipcodeInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return await this.countryInput.getAttribute('value');
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

  async setAddressTypeSelect(addressType) {
    await this.addressTypeSelect.sendKeys(addressType);
  }

  async getAddressTypeSelect() {
    return await this.addressTypeSelect.element(by.css('option:checked')).getText();
  }

  async addressTypeSelectLastOption(timeout?: number) {
    await this.addressTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class AddressDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-address-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-address'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
