import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ChannelComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-channel-publish div table .btn-danger'));
  title = element.all(by.css('jhi-channel-publish div h2#page-heading span')).first();

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

export class ChannelUpdatePage {
  pageTitle = element(by.id('jhi-channel-publish-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  typeInput = element(by.id('field_type'));
  channeltypeInput = element(by.id('field_channeltype'));
  detailsInput = element(by.id('field_details'));
  createdByUserInput = element(by.id('field_createdByUser'));
  createdDateTimeInput = element(by.id('field_createdDateTime'));
  updatedByUserInput = element(by.id('field_updatedByUser'));
  updatedDateTimeInput = element(by.id('field_updatedDateTime'));
  statusInput = element(by.id('field_status'));
  domainInput = element(by.id('field_domain'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return await this.typeInput.getAttribute('value');
  }

  async setChanneltypeInput(channeltype) {
    await this.channeltypeInput.sendKeys(channeltype);
  }

  async getChanneltypeInput() {
    return await this.channeltypeInput.getAttribute('value');
  }

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return await this.detailsInput.getAttribute('value');
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

export class ChannelDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-channel-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-channel'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
