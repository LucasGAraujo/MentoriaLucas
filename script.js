
async function cotacaobit() {
     const xhr = new XMLHttpRequest();
 xhr.open('GET', 'https://cointradermonitor.com/api/pbb/v1/ticker');
 xhr.onload = () => {
     if (xhr.status === 200) {
         const data = JSON.parse(xhr.responseText);
         console.log(data);
         document.getElementById("databit").innerText =`data e hora de verificação: R$: ${data.time}`;
         document.getElementById("last").innerText =`Last: R$: ${data.last}`;
         document.getElementById("volume").innerText =`Volume 24h : ${data.volume24h}`;
         console.log(`last: ${data.last}, volume24h: ${data.volume24h}`);
     }
 };
 xhr.send();
}
async function buscarCotacao() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const today = date.getDate() -1 ;
    const currentMonth = date.getMonth() + 1; 
    const dataFormatada = `${currentMonth}-${today}-${currentYear}`;
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@data)?@data='${dataFormatada}'&$format=json`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar dados");
        const data = await response.json();
        const cotacoes = data.value;
        console.log(cotacoes[0]);
        if (cotacoes.length === 0) {
            document.getElementById("data").innerText = "Nenhuma cotação encontrada para essa data.";
            document.getElementById("resultadoDolar").innerText = "Nenhuma cotação encontrada para essa data.";
            document.getElementById("resultadoDolar1").innerText = "Nenhuma cotação encontrada para essa data.";

            return;
        }
        const cotacaoVenda = cotacoes[0].cotacaoVenda; 
        const cotacaodeCompra = cotacoes[0].cotacaoCompra; 
        const dataCotacao = cotacoes[0].dataHoraCotacao; 

        document.getElementById("data").innerText = `Data e hora da cotação ${dataCotacao}`;
        document.getElementById("resultadoDolar").innerText = `Cotação do Dólar venda: R$ ${cotacaoVenda.toFixed(2)}`;
        document.getElementById("resultadoDolar1").innerText = `Cotação do Dólar compra: R$ ${cotacaodeCompra.toFixed(2)}`;

    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("data").innerText = "Erro ao buscar cotação.";
        document.getElementById("resultadoDolar").innerText = "Erro ao buscar cotação.";
        document.getElementById("resultadoDolar1").innerText = "Erro ao buscar cotação.";

    }
}

buscarCotacao();
cotacaobit();
