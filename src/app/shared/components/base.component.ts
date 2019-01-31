import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Filter } from './filter/models/filter.model';
import { Helper } from '../../utils/helper';
import { MessageService } from '../../core/message.service';

@Component({
  template: '',
  selector: 'app-base-component'
})
export class BaseComponent implements OnDestroy {
  loading = false;
  filtros = new Filter();
  
  protected subscriptions: Subscription[] = [];
  private accumulatedValues: Object = {};

  constructor(
    private messageHandler: MessageService,
  ) {}

  //#region Router
  protected findRouteParams(route: ActivatedRoute, setParams: (valueMap: any) => void, ...paramNames: string[]): void {
    const routeSubscription = route.params.subscribe(() => {
      this.findParams(route, setParams, ...paramNames);
    });
    this.subscriptions.push(routeSubscription);
  }

  private findParams(route: ActivatedRoute, setParams: (valueMap: any) => void, ...paramNames: string[]): void {
    const notFound: string[] = [];
    const params = route.snapshot.params;
    paramNames.forEach(paramName => {
      const value = params[paramName];
      if (value) {
        this.accumulatedValues[paramName] = value;
      } else {
        notFound.push(paramName);
      }
    });

    if (notFound.length === 0 || !route.parent || route.parent === route) {
      setParams(this.accumulatedValues);
      this.accumulatedValues = {};
    } else {
      this.findRouteParams(route.parent, setParams, ...notFound);
    }
  }
  //#endregion

  exibirMensagem(mensagem: string, carregando = false, duracao = 5000) {
    this.messageHandler.showMessage(mensagem, duracao);
    this.loading = carregando;
  }

  exibirNome(objeto: any) {
    return Helper.autocomplete.exibirNome(objeto);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
