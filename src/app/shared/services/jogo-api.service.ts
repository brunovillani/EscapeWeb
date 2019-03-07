import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseHttpService } from "./baseHttp.service";

@Injectable()
export class JogoApiService extends BaseHttpService {
    
    constructor(http: HttpClient) {
        super(http);
    }

    start() {
        return this.put(['command', 'start']);
    }

    stop() {
        return this.put(['command', 'stop']);
    }

    pause() {
        return this.put(['command', 'pause']);
    }

    restart() {
        return this.put(['command', 'restart']);
    }

    forward() {
        return this.put(['command', 'forward']);
    }

    backward() {
        return this.put(['command', 'backward']);
    }
}