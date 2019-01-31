export const Helper = {
  datas: {
    obterDate(data, incluirHora = false): Date {
      if (!data || data === '') {
        return;
      }

      if (data instanceof Date) {
        return data;
      }

      if (data.toString().indexOf('/') >= 0) {
        const dataString = data.split('/');
        return new Date(dataString[1] + '/' + dataString[0] + '/' + dataString[2]);
      }

      if (data.toString().indexOf('T') >= 0) {
        const dataIso = data.toString().split('T')[0].split('-');
        const ano = +dataIso[0];
        const mes = +dataIso[1] - 1;
        const dia = +dataIso[2];

        const horaIso = data.toString().split('T')[1].split(':');
        const hora = incluirHora ? +horaIso[0] : 0;
        const minutos = incluirHora ? +horaIso[1] : 0;

        return new Date(ano, mes, dia, hora, minutos, 0, 0);
      }
    },

    obterDateString(date): string {
      if (date) {
        return date.toISOString().split('T')[0];
      } else {
        return null;
      }
    },

    obterStringDataFormatada(date): string {
      const dataIso = date.toISOString().split('T')[0];
      const ano = dataIso.split('-')[0];
      const mes = dataIso.split('-')[1];
      const dia = dataIso.split('-')[2];

      return (dia + '/' + mes + '/' + ano);
    },

    obterListaMeses(dataInicial: Date, dataFinal: Date): Date[] {
      const duracao = (dataFinal.getFullYear() - dataInicial.getFullYear()) * 12 + (dataFinal.getMonth() - dataInicial.getMonth());
      const listaMeses = [];
      for (let i = 0; i <= duracao; i++) {
        const mes = new Date(dataInicial.getFullYear(), dataInicial.getMonth() + i, 1);
        listaMeses.push(mes);
      }
      return listaMeses;
    },

    mesmoMes(data1: Date, data2: Date) {
      return data1.getFullYear() === data2.getFullYear() && data1.getMonth() === data2.getMonth();
    }
  },

  autocomplete: {
    exibirNome(objeto: any): string {
      if (objeto) {
        return objeto.nome ? objeto.nome : objeto;
      }

      return '';
    },

    prevent(key: string) {
      return key === 'ArrowDown' ||
        key === 'ArrowUp' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight' ||
        key === 'Enter' ||
        key === 'Escape';
    }
  },

  format: {
    number(num: number, digits = 0, showSimbol: boolean = true, showCipher: boolean = false): string {
      const si = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: ' mil' },
        { value: 1E6, symbol: ' MM' },
        { value: 1E9, symbol: ' B' }
      ];
      let i;

      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }

      return this.numberToReal((num / si[i].value), showCipher ? '$' : '', digits) + (showSimbol ? si[i].symbol : '');
    },

    thousands(num: number, prefix: string = '$', digits: number = 2, showSimbol: boolean = true): string {
      return this.numberToReal((num / 1000), prefix, digits) + (showSimbol ? ' mil' : '');
    },

    million(num: number, prefix: string = '$', digits: number = 2, showSimbol: boolean = true): string {
      return this.numberToReal((num / 1000000), prefix, digits) + (showSimbol ? ' MM' : '');
    },

    truncate(value: string, maxLength = 10): string {
      return value && value.length > maxLength ? value.slice(0, maxLength).concat('...') : value;
    },

    ignoreDecimal(value: number) {
      return Math.trunc(value);
    },

    numberToReal(value: number, prefix: string = '$', digits = 2) {
      if (value == null || isNaN(value)) {
        value = 0;
      }

      const numero = value.toFixed(digits).split('.');
      numero[0] = prefix + numero[0].split(/(?=(?:...)*$)/).join('.');
      return numero.join(',');
    }
  },

  compare(a, b, isAsc = true): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  },

  array: {
    copy: function (array: Array<any>) {
    const copia = array.map(item => {
      if (typeof(item) === typeof({})) {
        return Object.assign({}, item);
      } else {
        return item;
      }
     });
    return copia;
    }
  },

  numeros: {
    iguais(a, b): boolean {
      return +a.toFixed(5) === +b.toFixed(5);
    },

    percentual(a, b): number {
      return +b.toFixed(5) !== 0 ? +a.toFixed(5) / +b.toFixed(5) * 100 : 0;
    }
  },

  eventos: {
    opcaoSelecionada(evento): boolean {
      return evento && evento.relatedTarget && Object.values(evento.relatedTarget.classList).includes('mat-option');
    }
  }
};
