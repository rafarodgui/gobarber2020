import ImailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMaisTemplateProvider implements ImailTemplateProvider {
  public async parse(): Promise<string> {
    return 'template';
  }
}

export default FakeMaisTemplateProvider;
