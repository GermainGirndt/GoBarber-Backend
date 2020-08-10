import handlebars from 'handlebars';

import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsMailTemaplteProvider
    implements IMailTemplateProvider {
    public async parse({
        template,
        contextVariables,
    }: IParseMailTemplateDTO): Promise<string> {
        // prepares the template for receiving context variables
        const parseTemplate = handlebars.compile(template);

        // injects the context variables
        return parseTemplate(contextVariables);
    }
}
