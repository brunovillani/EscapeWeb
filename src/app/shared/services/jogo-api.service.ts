import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseHttpService } from "./baseHttp.service";
import { Main } from "src/app/models/main";

@Injectable()
export class JogoApiService extends BaseHttpService {
    
    constructor(http: HttpClient, router: Router) {
        super(http, router, 'jogo');
    }

    obterLogicas() {
        return this.get<Main.Logica[]>(['logica']);
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