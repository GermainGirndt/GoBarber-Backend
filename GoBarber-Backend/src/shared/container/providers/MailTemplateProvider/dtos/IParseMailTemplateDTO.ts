// [key: string] === undefined number of string keys
interface ITemplateVariables {
    [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
    template: string;
    contextVariables: ITemplateVariables;
}
