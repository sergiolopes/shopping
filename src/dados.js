var slug = require('slug');

var lojas = [
    {
        nome: 'Só Sapatos',
        descricao: 'Sapatos femininos, masculinos, infantis. Sapatos para cachorros, bonecas e bichos e pelúcia. Só sapatos.',
        categoria: 'Moda',
        numero: 124
    },
    {
        nome: 'Adidas',
        descricao: 'Loja Core adidas abrange as linhas Sports Performance e Style da marca. Possui produtos focados nas diversas modalidades esportivas, bem como artigos da linha Originals.',
        categoria: 'Moda',
        numero: 121
    },
    {
        nome: 'Brooksfield',
        descricao: 'Sua linha principal é a “Way of Life”. Variedade e bom gosto tradicional da etiqueta estão representados e fidelizada por seu consumidor exigente, um público que tem estilo clássico e que gosta de agregar elegância, corte, estilo e qualidade ao seu modo de vida.',
        categoria: 'Moda',
        numero: 122
    },
    {
        nome: 'Burberry',
        descricao: 'A Burberry é uma marca icônica britânica sinônimo de inovação e qualidade. Sediada em Londres sob a direção do Diretor Criativo Christopher Bailey, a marca possui uma reputação global fundada em seus designs e tecidos pioneiros.',
        categoria: 'Moda',
        numero: 123
    },
    {
        nome: 'Cavalera',
        descricao: 'Ícone da cultura de vanguarda de uma geração, a CAVALERA se destacou no cenário nacional por traduzir o universo da música e arte, misturando moda, comportamento e lifestyle.',
        categoria: 'Moda',
        numero: 126
    },
    {
        nome: 'Centauro',
        descricao: 'Artigos para esporte, Calçados esportivos, Moda Esporte',
        categoria: 'Moda',
        numero: 210
    },
    {
        nome: 'Farm',
        descricao: 'A FARM conseguiu sintetizar em peças lindas, todo jeito e toda a bossa da carioca. Símbolo do estilo de vida dessa menina e de muitas outras que se identificam com o jeito leve, as cores e formas da marca.',
        categoria: 'Moda',
        numero: 212
    },
    {
        nome: 'Forum',
        descricao: 'Forum é jeanswear, traz sua essência de brasilidade contemporaneidade e sensualidade.',
        categoria: 'Moda',
        numero: 223
    },
    {
        nome: 'Le Lis Blanc',
        descricao: 'Le Lis Blanc Deux é uma das principais empresas varejistas do setor de vestuário e acessórios de moda feminina de alto padrão no Brasil. A marca Le Lis Blanc está associada a produtos de alta qualidade e a um estilo de vida sofisticado e desejado. Os clientes são principalmente mulheres com alto poder aquisitivo, de diferentes faixas etárias, que procuram produtos elegantes e femininos, inspirados nas últimas tendências internacionais',
        categoria: 'Moda',
        numero: 233
    },
    {
        nome: 'Shoulder',
        descricao: 'Focada na mulher contemporânea urbana que procura uma marca com opções para todas as ocasiões do seu dia-a-dia,  a Shoulder está sempre em busca de surpreender e encantar, imprimindo sempre muita feminilidade em tudo que faz.',
        categoria: 'Moda',
        numero: 245
    },
    {
        nome: 'Tip Top',
        descricao: 'Fundada em 1952, em São Paulo, a Tip Top, referência nacional em vestuário infantil, com foco em roupa para bebês, está no mercado há quase 60 anos.',
        categoria: 'Moda',
        numero: 300
    },
    {
        nome: 'Bacio Di Latte',
        descricao: 'Sorvetes artesanaus. 412 sabores, 7 novos sabores toda semana. Inclui cookies.',
        categoria: 'Restaurante',
        numero: 312
    },
    {
        nome: 'Galetos',
        descricao: 'Desde 1971, conserva sua tradicional formula de desossar e temperar galetos segue também uma linha contemporânea em sua maneira rápida de servir seus clientes e de cuidar do meio ambiente.',
        categoria: 'Restaurante',
        numero: 314
    },
    {
        nome: 'Pizza Hut',
        descricao: 'A típica pizza americanizada cheio de peperoni e que não lembra em nada a pizza normal italiana.',
        categoria: 'Restaurante',
        numero: 316
    },
    {
        nome: 'Ofner',
        descricao: 'Tradicional doceria brasileira com cafeteria, salgados, doces, panetones.',
        categoria: 'Restaurante',
        numero: 317
    },
];

lojas.sort(function(a,b){
    return a.nome.localeCompare(b.nome);
});

var lojasPorCategoria = [];
var categorias = {};

lojas.forEach(function(loja){
    loja.id = slug(loja.nome, {lower: true});
    loja.url = '/loja/' + loja.id + '.html';
    loja.img = '/img/loja/' + loja.id + '.jpg';

    if (!categorias[loja.categoria]) {
        var categoria = {
            nome: loja.categoria,
            id: slug(loja.categoria, {lower: true}),
            lojas: []
        };

        lojasPorCategoria.push(categoria);
        categorias[loja.categoria] = categoria;
    }

    categorias[loja.categoria].lojas.push(loja);
});

module.exports = {
    lojas: lojas,
    lojasPorCategoria: lojasPorCategoria
};