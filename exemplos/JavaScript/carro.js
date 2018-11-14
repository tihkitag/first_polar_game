/**
 * Created by Tiago on 11/07/2014.
 */

function Carro(cor, velocidadeMaxima) {
    this.cor = cor;
    this.velocidadeMaxima = velocidadeMaxima;
    this.velocidadeAtual = 0;
}

Carro.prototype = {
    acelerar: function() {
        this.velocidadeAtual += 10;
    }
}
