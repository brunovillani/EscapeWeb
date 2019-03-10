export class Logica {
    indice: number;
    status: boolean;
    tempoInicio: Date;
    tempoFim: Date;
    tempoCorrido: string;

    constructor(model: Logica) {
        this.indice = model.indice;
        this.status = model.status;
        this.tempoInicio = model.tempoInicio;
        this.tempoFim = model.tempoFim;
    }

    public contarTempo(): string {
        if (!this.status && this.tempoInicio != null) {
            const tempo = new Date(this.tempoFim.getTime() - this.tempoInicio.getTime());
            this.tempoCorrido = '${tempo.getHours()}:${tempo.getMinutes()}:${tempo.getSeconds()}'
        }
        return this.tempoCorrido;
    }
}