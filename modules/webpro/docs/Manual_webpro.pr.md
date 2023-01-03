# WEB Pro
  
Módulo com funcionalidades estendidas para o navegador que funciona como complemento aos comandos da seção web 

*Read this in other languages: [English](Manual_webpro.md), [Portugues](Manual_webpro.pr.md), [Español](Manual_webpro.es.md).*
  
![banner](imgs/Banner_webpro.png)
## Como instalar este módulo
  
__Baixe__ e __instale__ o conteúdo na pasta 'modules' no caminho do Rocketbot  


## Como usar este módulo
Este módulo é complementado pelos módulos e comandos nativos da Web que vêm por padrão no Rocketbot. Para usar o módulo você deve ter um navegador já aberto do Rocketbot com o comando "Open Browser". Depois disso, podemos usar os comandos normalmente.


## Descrição do comando

### Lista de itens
  
Obtém uma lista de todos os elementos e seus filhos de uma classe ou nome, para poder iterar sobre ela.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Tipo de classes ou atributo|Neste campo devemos colocar o tipo de classe ou atributo que usaremos.|name|
|Classes ou atributo|Neste campo devemos colocar o nome da classe ou atributo que usaremos.|class|
|Tipo do Elemento|Neste campo devemos colocar o tipo de elemento que usaremos.|div|
|Variável onde armazenar o resultado|Neste campo devemos colocar o nome da variável onde armazenaremos o resultado.|Variável|

### Limpa uma entrada e envia o texto
  
Deleta o conteúdo de um objeto tipo input e envia o texto
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Texto para enviar ou variável|Colocamos o texto ou a variável para enviar.|Texto ou Variável|
|Dado a buscar|Colocamos o dado a buscar.|Dado a buscar|
|Tipo de dado|Selecionamos o tipo de dado a buscar. Xpath, class, name, tag o id.|Dado a buscar|
|Enviar com teclas|Apaga e escreve com teclas diretamente.|Texto ou Variável|

### Salvar Cookies
  
Salva os cookies de uma página para que possam ser carregados em outra instância
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Caminho para o arquivo onde os cookies serão salvos|Neste campo indicamos o caminho para o arquivo onde os cookies serão salvos|C:/tmp/etc|
|Variável onde os cookies serão salvos|Neste campo indicamos o nome da variável onde os cookies serão salvos|cookies|

### Carregar Cookies
  
Carrega um arquivo com cookies
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Caminho para o arquivo onde os cookies são armazenados|Selecione o caminho para o arquivo onde os cookies são armazenados|C:/tmp/etc|
|Atribuir resultado à variável|Variável onde True ou False será armazenado dependendo se os cookies podem ser carregados|Variável|

### Recarregar página
  
Recarregar página
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
| --- | --- | --- |

### Back
  
retorna à página anterior
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
| --- | --- | --- |

### Clique duplo
  
Clique duplo sobre um objeto selecionado
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor a buscar|Dado|
|Tipo de dado|Colocamos o tipo de dado a buscar|xpath|

### Scroll
  
Rolar para uma determinada posição
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Posição|Escolhemos a posição em pixels|1500|

### Contar iten
  
Entregar o número total de itens
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Nome da classe|Nome da classe do elemento|Name class|
|Atribuir resultado à variável|Nome da variável onde o resultado será guardado|Variable|

### Selecionar Objeto por Índice
  
Seleciona um objeto passando-lhe o índice
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a Buscar|Colocamos o seletor a buscar|form-control|
|Índice|Colocamos o índice a buscar|1|
|Tipo de dado|Selecionamos o tipo de dado a buscar|name|

### Clique Objeto por Índice
  
Clique em um objeto passando o índice
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a Buscar|Colocamos o seletor do dado a clicar.|form-control|
|Índice|Colocamos o índice do dado a clicar.|1|
|Tipo de dado|Colocamos o tipo do dado a clicar.|class|

### Exportar página para PDF
  
Exporte a página para um arquivo PDF. Se a página contiver elementos fixos, eles podem ser removidos com Javascript para obter uma exportação adequada.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Caminho e nome do arquivo|Selecione o caminho e nome do arquivo a salvar, sem a extensão .pdf|path/to/file.pdf|
|Excluir cabeçalho fixo|Se o site contiver um cabeçalho fixo, marque a caixa para removê-lo para que não se repita em cada captura. O comando procura a tag 'header', se não encontrá-la, dará um erro, se não funcionar, você deve desmarcá-la.|True|
|Atribuir resultado à variável|Selecione o nome da variável para a qual queremos atribuir o resultado|Variável|

### Abrir Chrome em modo headless
  
Abre Chrome em modo headless
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|URL do Servidor|Escreva a URL da página a abrir.|http://www.rocketbot.co|

### Tomar captura por coordenadas
  
Tira uma foto da tela de uma seção da página usando coordenadas
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Posição|Coordenadas da seção da página|x,y|
|Dimensões|Dimensões da seção da página|largura, altura|
|Caminho e nome onde a imagem será salva|Caminho e nome onde a imagem será salva|/Users/User/folder/image.jpg|

### Obter o retângulo de delimitação
  
Obtém as coordenadas x e y e as dimensões de um objeto.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a Buscar|Colocamos o seletor do elemento a obter.|Data|
|Tipo de dado|Selecionamos o tipo de dado a buscar.|xpath|
|Variável onde armazenar o resultadoo|Nome da variável sem {}|Variável|

### Obter coordenadas de um objeto
  
Obtém as coordenadas x e y de um objeto.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor do elemento a selecionar|Data|
|Tipo de dado|Selecionamos o tipo de dado a buscar|xpath|
|Variável onde armazenar o resultado|Nome da variável sem {}|Variável|

### Obter dimensões de um objeto
  
Obtém dimensões de um objeto
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor do elemento a selecionar|Data|
|Tipo de dado|Selecionamos o tipo de dado a buscar|xpath|
|Variável onde armazenar o resultado|Nome da variável sem {}|Variável|

### Abrir Chrome modo desenvolvedor
  
Abre o Google Chrome em modo seguro ou debugger
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|URL do Servidor|URL do servidor a abrir|http://www.rocketbot.co|
|Modo|Selecionamos o modo em que o navegador será aberto.|Debugger|

### Ver Consola
  
Obtém informações do console
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Variável onde armazenar o resultado|Nome da variável onde armazenar o resultado|Variável|
|Nível |Nível de informação a mostrar|Severe|

### Converter página para PNG
  
Ele tira vários instantâneos da página da Web e os concatena em um. Se a página contiver elementos fixos, eles podem ser removidos com Javascript para obter uma exportação correta.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Nome|Nome da imagem|ImagemWeb|
|Pasta de download|Caminho onde a imagem gerada será baixada|C:/Users/user/Desktop|

### Hover Element
  
Passar o mouse sobre o elemento
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o selecionador do elemento ao qual fazermos hover.|Data|
|Tipo de dado|Colocamos o tipo de dado que queremos buscar.|xpath|

### Abrir Edge (Chromium)
  
Abrir o novo Chromium-based Edge
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|URL do Servidor|Url da páxina a abrir no Edge|http://www.rocketbot.co|

### Clique Pro
  
Clica em um objeto selecionado, esperando que ele se torne clicável.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor do elemento a clicar.|Data|
|Tipo de dado|Selecionamos o tipo de dado a buscar.|xpath|
|Esperar|Colocamos o tempo em segundos que esperaremos a que o elemento se torne clicável.|5|

### Extrair Texto Pro
  
Obtém o texto de um objeto esperando que ele esteja disponível.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor do elemento a extrair texto.|Data|
|Tipo de dado|Selecionamos o tipo de dado a buscar.|xpath|
|Esperar|Colocamos o tempo em segundos que esperaremos a que o elemento este disponível.|5|
|Variável onde armazenar o resultado|Colocamos o nome da variável onde armazenaremos o resultado.|Variável|

### Selecionar objeto Pro
  
Seleciona um objeto esperando que ele esteja presente
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor do elemento a selecionar.|Data|
|Tipo de dado|Selecionamos o tipo de dado a buscar.|xpath|
|Esperar|Colocamos o tempo em segundos que esperaremos a que o elemento apareça.|5|

### Mudar para iframe Pro
  
Troca para um iframe esperando que ele esteja presente
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor do iframe|Data|
|Tipo de dado|Selecionamos o tipo de dado|xpath|
|Esperar|Colocamos o tempo de espera|5|

### Enviar Teclas
  
Similar ao Send Web Text, mas em um nível inferior
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Texto|Texto a enviar|Texto|
|Tecla especial|Tecla especial a enviar|SPACE|

### Imprimir como PDF (Chrome)
  
Imprima a página como PDF no Chrome. O PDF é gerado com base no conteúdo disponível da página. Não representa uma cópia verdadeira do site.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|O pdf será baixado para a pasta de downloads padrão do navegador.|||

### Forçar o download
  
Forçando um download
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|URL de Download|Colocamos a URL de download a forçar|http://www.web.test/file.csv|
|Nome do arquivo|Colocamos o nome do arquivo a forçar|file.csv|

### Abrir Nova Aba
  
Abre uma nova aba com a URL
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|URL|URL para abrir em uma nova aba|http://www.google.com|

### Abrir navegador
  
Abre o navegador indicando a URL
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|URL|URL para abrir|http://www.google.com|
|Tempo de espera|Tiempo de espera en segundos|5|
|Id|Id do navegador|4|
|Pasta de perfil|Rota da pasta do perfil do usuário para abrir o navegador|C:/folder|
|Pasta de download|Caminho da pasta de downloads para o navegador aberto|C:/folder|
|Forçar downloads|Forçar downloads para torná-los automáticos|True|
|Opções para o Chrome|Opções do navegador|{'download.default_directory': download_path}|

### Drag and drop
  
Fazer um drag and drop
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Origem|Origem do elemento|source|
|Destino|Destino do elemento|target|
|Tipo de dado|Tipo de dado a buscar|Dado a buscar|

### Subir arquivo
  
Comando para fazer upload um ou mais arquivos para um input do tipo file. Basta preencher um único valor, dependendo de quantos arquivos você deseja enviar.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor do elemento onde o arquivo será subido|Data|
|Tipo de dado|Tipo de dado a buscar|xpath|
|Carregue apenas um único campo do seguinte. Se quiser fazer upload de um único arquivo, use o primeiro seletor, se quiser fazer upload de mais de um, carregue o segundo seletor com o formato indicado.|||
|Carregar um único arquivo|Selecionamos o arquivo a subir|C:/Users/user/file1.pdf'|
|Carregar vários arquivos|Selecionamos o arquivo a subir|['C:/Users/user/file1.pdf', 'C:/Users/user/file2.pdf']|

### Enviar combinação de teclas
  
Comando para enviar combinação de teclas
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Primeira tecla especial|Primeira tecla especial a combinar com uma letra/numero ou com uma segunda tecla especial|SPACE|
|Letra ou número|Letra ou número para combinar com a primeira tecla se necessário.|A|
|Segunda tecla especial|Segunda tecla especial para combinar com a primeira tecla se necessário.|SPACE|

### Clique direito
  
Clique direito sobre um objeto selecionado
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Dado a buscar|Colocamos o seletor para pesquisar|Dado|
|Tipo de dado|Colocamos o tipo de dados para procurar|xpath|
