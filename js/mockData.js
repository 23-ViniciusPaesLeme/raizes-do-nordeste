const produtos = [

    // NORDESTE 
    {
        id: 1,
        nome: "Baião de Dois",
        preco: 25,
        categoria: "pratos",
        regiao: "nordeste",
        imagem: "assets/baiao.jpg",
        descricao: "Arroz, feijão verde, queijo coalho e carne seca."
    },
    {
        id: 2,
        nome: "Carne de Sol com Macaxeira",
        preco: 35,
        categoria: "pratos",
        regiao: "nordeste",
        imagem: "assets/carne-sol.jpg",
        descricao: "Carne de sol com mandioca frita."
    },
    {
        id: 3,
        nome: "Escondidinho de Carne Seca",
        preco: 28,
        categoria: "pratos",
        regiao: "nordeste",
        imagem: "assets/escondidinho.jpg",
        descricao: "Purê de macaxeira com carne seca."
    },
    {
        id: 4,
        nome: "Moqueca Baiana",
        preco: 40,
        categoria: "pratos",
        regiao: "nordeste",
        imagem: "assets/moqueca.jpg",
        descricao: "Peixe com leite de coco e dendê."
    },
    {
        id: 5,
        nome: "Bobó de Camarão",
        preco: 42,
        categoria: "pratos",
        regiao: "nordeste",
        imagem: "assets/bobo.jpg",
        descricao: "Camarão com creme de mandioca."
    },
    {
        id: 6,
        nome: "Acarajé",
        preco: 18,
        categoria: "lanches",
        regiao: "nordeste",
        imagem: "assets/acaraje.jpg",
        descricao: "Bolinho de feijão com vatapá."
    },
    {
        id: 7,
        nome: "Vatapá",
        preco: 22,
        categoria: "pratos",
        regiao: "nordeste",
        imagem: "assets/vatapa.jpg",
        descricao: "Creme de pão, camarão e dendê."
    },
    {
        id: 8,
        nome: "Sarapatel",
        preco: 26,
        categoria: "pratos",
        regiao: "nordeste",
        imagem: "assets/sarapatel.jpg",
        descricao: "Prato típico com miúdos e temperos fortes."
    },
    {
        id: 9,
        nome: "Caruru",
        preco: 24,
        categoria: "pratos",
        regiao: "nordeste",
        imagem: "assets/caruru.jpg",
        descricao: "Quiabo com camarão seco."
    },

    // BEBIDAS NORDESTE
    {
        id: 10,
        nome: "Suco de Cajá",
        preco: 10,
        categoria: "bebidas",
        regiao: "nordeste",
        imagem: "assets/caja.jpg",
        descricao: "Suco natural refrescante."
    },
    {
        id: 11,
        nome: "Suco de Umbu",
        preco: 10,
        categoria: "bebidas",
        regiao: "nordeste",
        imagem: "assets/umbu.jpg",
        descricao: "Fruta típica do sertão."
    },
    {
        id: 12,
        nome: "Caldo de Cana",
        preco: 8,
        categoria: "bebidas",
        regiao: "nordeste",
        imagem: "assets/caldo-cana.jpg",
        descricao: "Bebida doce natural."
    },

    // LANCHES (TODAS)
    {
        id: 13,
        nome: "X-Burger",
        preco: 20,
        categoria: "lanches",
        regiao: "todas",
        imagem: "assets/xburger.jpg",
        descricao: "Hambúrguer clássico."
    },
    {
        id: 14,
        nome: "X-Bacon",
        preco: 25,
        categoria: "lanches",
        regiao: "todas",
        imagem: "assets/xbacon.jpg",
        descricao: "Hambúrguer com bacon."
    },

    // SUDESTE
    {
        id: 15,
        nome: "Feijoada",
        preco: 30,
        categoria: "pratos",
        regiao: "sudeste",
        imagem: "assets/feijoada.jpg",
        descricao: "Clássica Feijoada brasileira."
    },
    {
        id: 16,
        nome: "Virado à Paulista",
        preco: 28,
        categoria: "pratos",
        regiao: "sudeste",
        imagem: "assets/virado.jpg",
        descricao: "Prato típico paulista."
    },

    // CENTRO-OESTE
    {
        id: 17,
        nome: "Arroz com Pequi",
        preco: 27,
        categoria: "pratos",
        regiao: "centro-oeste",
        imagem: "assets/pequi.jpg",
        descricao: "Prato típico de Goiás."
    },

    // SUL
    {
        id: 18,
        nome: "Churrasco Gaúcho",
        preco: 45,
        categoria: "pratos",
        regiao: "sul",
        imagem: "assets/churrasco.jpg",
        descricao: "Carne assada tradicional."
    },

    // 🌽 FESTAS JUNINAS (SAZONAL)
    {
        id: 19,
        nome: "Canjica",
        preco: 10,
        categoria: "sobremesas",
        regiao: "todas",
        imagem: "assets/canjica.jpg",
        descricao: "Doce típico de festa junina.",
        sazonal: { inicio: "06-01", fim: "07-31" }
    },
    {
        id: 20,
        nome: "Pamonha",
        preco: 12,
        categoria: "lanches",
        regiao: "todas",
        imagem: "assets/pamonha.jpg",
        descricao: "Milho cozido na palha.",
        sazonal: { inicio: "06-01", fim: "07-31" }
    },
    {
        id: 21,
        nome: "Milho Cozido",
        preco: 8,
        categoria: "lanches",
        regiao: "todas",
        imagem: "assets/milho.jpg",
        descricao: "Milho verde cozido.",
        sazonal: { inicio: "06-01", fim: "07-31" }
    },

    // SOBREMESAS
    {
        id: 22,
        nome: "Bolo de Rolo",
        preco: 15,
        categoria: "sobremesas",
        regiao: "nordeste",
        imagem: "assets/bolo-rolo.jpg",
        descricao: "Doce pernambucano tradicional."
    },
    {
        id: 23,
        nome: "Cartola",
        preco: 14,
        categoria: "sobremesas",
        regiao: "nordeste",
        imagem: "assets/cartola.jpg",
        descricao: "Banana com queijo e canela."
    },
    {
        id: 24,
        nome: "Sorvete de Chocolate",
        preco: 12,
        categoria: "sobremesas",
        regiao: "todas",
        imagem: "assets/sorvete-chocolate.jpg",
        descricao: "Sorvete cremoso de chocolate."
    },
    {
        id: 25,
        nome: "Sorvete de Morango",
        preco: 12,
        categoria: "sobremesas",
        regiao: "todas",
        imagem: "assets/sorvete-morango.jpg",
        descricao: "Sorvete refrescante de morango."
    },
    {
        id: 26,
        nome: "Sorvete de Creme",
        preco: 12,
        categoria: "sobremesas",
        regiao: "todas",
        imagem: "assets/sorvete-creme.jpg",
        descricao: "Sorvete clássico sabor creme."
    },

    // BEBIDAS GERAIS
    {
        id: 27,
        nome: "Suco de Laranja Natural",
        preco: 9,
        categoria: "bebidas",
        regiao: "sudeste",
        imagem: "assets/suco-laranja.jpg",
        descricao: "Suco natural de laranja."
    },
    {
        id: 28,
        nome: "Mate Gelado",
        preco: 8,
        categoria: "bebidas",
        regiao: "sudeste",
        imagem: "assets/mate.jpg",
        descricao: "Chá mate gelado."
    },
    {
        id: 29,
        nome: "Tereré",
        preco: 8,
        categoria: "bebidas",
        regiao: "centro-oeste",
        imagem: "assets/terere.jpg",
        descricao: "Bebida gelada com erva-mate."
    },
    {
        id: 30,
        nome: "Suco de Guaraná Natural",
        preco: 10,
        categoria: "bebidas",
        regiao: "centro-oeste",
        imagem: "assets/guarana.jpg",
        descricao: "Guaraná natural refrescante."
    },
    {
        id: 31,
        nome: "Chimarrão",
        preco: 7,
        categoria: "bebidas",
        regiao: "sul",
        imagem: "assets/chimarrao.jpg",
        descricao: "Bebida tradicional do Sul."
    },
    {
        id: 32,
        nome: "Suco de Uva Integral",
        preco: 11,
        categoria: "bebidas",
        regiao: "sul",
        imagem: "assets/suco-uva.jpg",
        descricao: "Suco de uva integral."
    },
    {
        id: 33,
        nome: "Água Mineral",
        preco: 5,
        categoria: "bebidas",
        regiao: "todas",
        imagem: "assets/agua.jpg",
        descricao: "Água mineral sem gás."
    },
    {
        id: 34,
        nome: "Coca-Cola Lata",
        preco: 7,
        categoria: "bebidas",
        regiao: "todas",
        imagem: "assets/coca-cola.jpg",
        descricao: "Refrigerante de cola."
    },
    {
        id: 35,
        nome: "Guaraná Antarctica Lata",
        preco: 7,
        categoria: "bebidas",
        regiao: "todas",
        imagem: "assets/guarana-antartica.jpg",
        descricao: "Refrigerante de guaraná."
    },
    {
        id: 36,
        nome: "Fanta Laranja",
        preco: 7,
        categoria: "bebidas",
        regiao: "todas",
        imagem: "assets/fanta-laranja.jpg",
        descricao: "Refrigerante de laranja."
    },
    {
        id: 37,
        nome: "Sprite",
        preco: 7,
        categoria: "bebidas",
        regiao: "todas",
        imagem: "assets/sprite.jpg",
        descricao: "Refrigerante de limão."
    }

];