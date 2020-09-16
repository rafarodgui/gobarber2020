import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import ImailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMaisTemplateProvider implements ImailTemplateProvider {
  public async parse({
    variables,
    template,
  }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMaisTemplateProvider;
