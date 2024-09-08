class RecintosZoo {
    constructor() {
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['MACACO', 'MACACO'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: ['MACACO', 'MACACO','MACACO'] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: ['GAZELA', 'MACACO'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: ['CROCODILO'] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['LEAO'] },
        ];
    }

    
    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }
    
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
    
        const { tamanho, biomas, carnivoro } = this.animais[animal];
        const espacoNecessario = tamanho * quantidade;
    
        let recintosViaveis = this.recintos.filter(recinto => {
            const animaisNoRecinto = recinto.animais.map(a => this.animais[a]);
            let espacoOcupado = animaisNoRecinto.reduce((total, a) => total + a.tamanho, 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
    
            // Verifica se há espaço suficiente no recinto para adicionar os novos animais
            if (espacoLivre < espacoNecessario) {
                return false;
            }
    
            // Verifica se o bioma do recinto é adequado
            const biomaAdequado = biomas.some(bioma => recinto.bioma.includes(bioma)) || recinto.bioma === 'savana e rio';
            if (!biomaAdequado) {
                return false;
            }
    
            // Verifica se é carnívoro e se o recinto já contém animais não-carnívoros
            if (carnivoro && animaisNoRecinto.some(a => !a.carnivoro)) {
                return false;
            }
    
            // Verifica a regra dos macacos: não podem ficar sozinhos
            if (animal === 'MACACO' && (recinto.animais.length === 0 || !recinto.animais.some(a => a === 'MACACO'))) {
                return false;
            }
    
            return true;
        });
    
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
    
        recintosViaveis = recintosViaveis.map(recinto => {
            const animaisNoRecinto = recinto.animais.map(a => this.animais[a]);
            let espacoOcupado = animaisNoRecinto.reduce((total, a) => total + a.tamanho, 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
    
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        });
    
        return { recintosViaveis };
    }
    
    
    
}

export { RecintosZoo as RecintosZoo };
