import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsMailTemaplteProvider
    implements IMailTemplateProvider {
    public async parse({
        file,
        contextVariables,
    }: IParseMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        // prepares the template for receiving context variables
        const parseTemplate = handlebars.compile(templateFileContent);

        // injects the context variables
        return parseTemplate(contextVariables);
    }
}
