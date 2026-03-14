let tabela = document.getElementsByTagName("tabela");
for (let i = 0; i < tabela.length; i++) {
    let tab = tabela[i];
    let linhas = Number(tab.getAttribute("linha"));
    let colunas = Number(tab.getAttribute("coluna"));


    //validacao tabela

    let validTable = true;

    if (!linhas || linhas < 0) {
        validTable = false;
    }

    else if (!colunas || colunas < 0) {
        validTable = false;
    }

    //fim validacao tabela

    if (validTable) {
        let novaTabela = document.createElement("table");

        let colspanAttr = document.getElementsByTagName("expand");
        let dadosTag = tab.getElementsByTagName("dados")[0];
        let dados = [];
        let matriz = [];

        //validacao span

        let validSpan = true;

        for (let w = 0; w < colspanAttr.length; w++) {
            matriz.push([
                l = Number(colspanAttr[w].getAttribute("linha")),
                c = Number(colspanAttr[w].getAttribute("coluna")),
                t = Number(colspanAttr[w].getAttribute("tamanho"))
            ]);

            if (matriz[w][0] >= linhas || matriz[w][0] < 0) {
                validSpan = false;

            }
            else if (matriz[w][1] >= colunas || matriz[w][1] < 0) {
                validSpan = false;

            }
            else if ((matriz[w][1] + (matriz[w][2] - 1)) >= colunas) {
                validSpan = false;
            }

            // fim validacao span
        }

        if (validSpan) {
            if (dadosTag) {

                let texto = dadosTag.textContent.trim();
                console.log("Texto :" + texto);
                let linhaDados = texto.split("\n");
                console.log("Texto sem ENTER :" + linhaDados);
                
                let validDados = true;

                //Valida quantidade de linhas
                if(linhaDados.length > linhas){
                    validDados = false;
                    console.log("jeremias");
                }

                for (let linha of linhaDados) {

                    let colunaDados = linha.split("|");
                    if(colunaDados.length > colunas){
                        validDados = false;
                    }
                    
                    dados.push(colunaDados.map(c => c.trim()));

                }

                
                console.log("Vetor : " + dados);

                if(!validDados){
                    dados.length = 0;
                    alert("Quantidade de dados excede o permitido pela tabela.")
                }

            }
            let bordaAttr = tab.getAttribute("borda");
            let vetBorda = bordaAttr.split(" ");
            novaTabela.style.setProperty('--cor-borda', vetBorda[2]);
            novaTabela.style.setProperty('--tipo-borda', vetBorda[1]);
            novaTabela.style.setProperty('--tamanho-borda', vetBorda[0]);

            for (let x = 0; x < linhas; x++) {
                let tr = document.createElement("tr");
                for (let y = 0; y < colunas; y++) {
                    let td = document.createElement("td");
                    if (dados[x] && dados[x][y]) {
                        td.innerText = dados[x][y];
                    }

                    let span = 1;
                    for (let k = 0; k < matriz.length; k++) {
                        if (matriz[k][0] == x && matriz[k][1] == y) {
                            span = matriz[k][2];
                            break;
                        }
                    }
                    if (span > 1) {
                        td.setAttribute("colspan", span);
                    } y += span - 1;

                    tr.appendChild(td);
                }
                novaTabela.appendChild(tr);
            }
            tab.appendChild(novaTabela);
        }

        else {
            alert("Não foi possível criar a tabela. Expand inválido.");
        }
    }

    else {
        alert("Não foi possível criar a tabela. Número de linhas ou colunas inválido.");
    }



}
