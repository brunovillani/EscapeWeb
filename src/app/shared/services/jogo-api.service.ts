import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseHttpService } from "./baseHttp.service";

@Injectable()
export class JogoApiService extends BaseHttpService {
    
    constructor(http: HttpClient) {
        super(http);
    }

    testeComm() {
        return this.get(['teste']);
    }
}