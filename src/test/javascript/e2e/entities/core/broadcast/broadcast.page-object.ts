import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class BroadcastComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-broadcast div table .btn-danger'));
  title = element.all(by.css('jhi-broadcast div h2#page-heading span')).first();

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

export class BroadcastUpdatePage {
  pageTitle = element(by.id('jhi-broadcast-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  fromnameInput = element(by.id('field_fromname'));
  fromemailInput = element(by.id('field_fromemail'));
  titleInput = element(by.id('field_title'));
  audiencejsonInput = element(by.id('field_audiencejson'));
  contenthtmlInput = element(by.id('field_contenthtml'));
  deliveryDateTimeInput = element(by.id('field_deliveryDateTime'));
  tagsInput = element(by.id('field_tags'));
  statusInput = element(by.id('field_status'));
  createdByUserInput = element(by.id('field_createdByUser'));
  createdDateTimeInput = element(by.id('field_createdDateTime'));
  updatedByUserInput = element(by.id('field_updatedByUser'));
  updatedDateTimeInput = element(by.id('field_updatedDateTime'));
  domainInput = element(by.id('field_domain'));
  publishondatetimeInput = element(by.id('field_publishondatetime'));
  publishdatetimeInput = element(by.id('field_publishdatetime'));
  imageInput = element(by.id('file_image'));
  contentjsonInput = element(by.id('field_contentjson'));
  channelSelect = element(by.id('field_channel'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFromnameInput(fromname) {
    await this.fromnameInput.sendKeys(fromname);
  }

  async getFromnameInput() {
    return await this.fromnameInput.getAttribute('value');
  }

  async setFromemailInput(fromemail) {
    await this.fromemailInput.sendKeys(fromemail);
  }

  async getFromemailInput() {
    return await this.fromemailInput.getAttribute('value');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setAudiencejsonInput(audiencejson) {
    await this.audiencejsonInput.sendKeys(audiencejson);
  }

  async getAudiencejsonInput() {
    return await this.audiencejsonInput.getAttribute('value');
  }

  async setContenthtmlInput(contenthtml) {
    await this.contenthtmlInput.sendKeys(contenthtml);
  }

  async getContenthtmlInput() {
    return await this.contenthtmlInput.getAttribute('value');
  }

  async setDeliveryDateTimeInput(deliveryDateTime) {
    await this.deliveryDateTimeInput.sendKeys(deliveryDateTime);
  }

  async getDeliveryDateTimeInput() {
    return await this.deliveryDateTimeInput.getAttribute('value');
  }

  async setTagsInput(tags) {
    await this.tagsInput.sendKeys(tags);
  }

  async getTagsInput() {
    return await this.tagsInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return await this.statusInput.getAttribute('value');
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

  async setDomainInput(domain) {
    await this.domainInput.sendKeys(domain);
  }

  async getDomainInput() {
    return await this.domainInput.getAttribute('value');
  }

  async setPublishondatetimeInput(publishondatetime) {
    await this.publishondatetimeInput.sendKeys(publishondatetime);
  }

  async getPublishondatetimeInput() {
    return await this.publishondatetimeInput.getAttribute('value');
  }

  async setPublishdatetimeInput(publishdatetime) {
    await this.publishdatetimeInput.sendKeys(publishdatetime);
  }

  async getPublishdatetimeInput() {
    return await this.publishdatetimeInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return await this.imageInput.getAttribute('value');
  }

  async setContentjsonInput(contentjson) {
    await this.contentjsonInput.sendKeys(contentjson);
  }

  async getContentjsonInput() {
    return await this.contentjsonInput.getAttribute('value');
  }

  async channelSelectLastOption(timeout?: number) {
    await this.channelSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async channelSelectOption(option) {
    await this.channelSelect.sendKeys(option);
  }

  getChannelSelect(): ElementFinder {
    return this.channelSelect;
  }

  async getChannelSelectedOption() {
    return await this.channelSelect.element(by.css('option:checked')).getText();
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

export class BroadcastDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-broadcast-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-broadcast'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
