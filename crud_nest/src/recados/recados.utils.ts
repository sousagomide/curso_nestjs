import { Injectable } from "@nestjs/common";

@Injectable()
export class RecadoUtils {

    inverteString(str: String) {
        return str.split('').reverse().join('');
    }

}