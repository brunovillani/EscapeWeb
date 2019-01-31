import { Helper } from './../utils/helper';

export class Mensagem {
  public id: number;
  public texto: string;
  public dataInclusao: Date;
  public usuarioInclusao: string;

  constructor(mensagem: Mensagem) {
    this.id = mensagem.id;
    this.texto = mensagem.texto;
    this.dataInclusao = Helper.datas.obterDate(mensagem.dataInclusao);
    this.usuarioInclusao = mensagem.usuarioInclusao;
  }
}
