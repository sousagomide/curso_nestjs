import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RegexProtocol } from "./regex.protocol";
import { OnlyLowercaseLetterRegex } from "./only-lowercase-letters.regex";
import { RemoveSpaceRegex } from "./remove-space.regex";

export type ClassNames = 'OnlyLowerCaseLettersRegex' | 'RemoveSpaceRegex';

@Injectable()
export class RegexFactory {
    create(className: ClassNames): RegexProtocol {
        switch(className) {
            case 'OnlyLowerCaseLettersRegex':
                return new OnlyLowercaseLetterRegex();
            case 'RemoveSpaceRegex':
                return new RemoveSpaceRegex();
            default:
                throw new InternalServerErrorException(`Class Not Found for ${className}`);
        }
    }
}