# MS Windows Controls
  
Módulo para controlar aplicativos MS Windows

Este módulo pode ser usado com "Desktop Recorder"
  
*Read this in other languages: [English](Manual_WindowsControl.md), [Portugues](Manual_WindowsControl.pr.md), [Español](Manual_WindowsControl.es.md).*
  
![banner](imgs/Banner_WindowsControl.png)
## Como instalar este módulo
  
__Baixe__ e __instale__ o conteúdo na pasta 'modules' no caminho do Rocketbot  



## Descrição do comando

### Conectar janela
  
Ele se conecta a uma janela já aberta e executa várias ações dentro dela. Essa atividade também é gerada automaticamente ao usar o gravador de desktop.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Tempo de espera em Segundos|Tempo de espera em segundos antes que o erro seja gerado|30|
|Resultado|Variável onde o resultado será armazenado|resultado|

### Captura de tela do elemento
  
Tira uma captura de tela do elemento e salva no diretório especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Caminho da captura|Selecione o nome e o local onde a captura de tela será salva.|C:/Users/Usuario/Desktop/Captura|

### Click
  
Clica em um elemento UI especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Tipo de Click|Especifica o tipo de clique do mouse (simples, duplo, para cima, para baixo) usado ao simular o evento de clique. Por padrão, um único clique é selecionado.|CLICK_SIMPLE|
|Botão do Mouse|O botão do mouse (esquerdo, direito, meio) usado para a ação de clique. Por padrão, o botão esquerdo do mouse está selecionado.|BTN_IZQUIERDO|
|Simular Click|Se selecionado, simula o clique usando a tecnologia do aplicativo de destino. Este método de entrada é o mais rápido e funciona em segundo plano. Por padrão, esta caixa de seleção não está selecionada. O método padrão é o mais lento, não pode funcionar em segundo plano, mas é compatível com todos os aplicativos de desktop.|False|
|Resultado|Variável onde o resultado será armazenado|resultado|

### Click relativo
  
Click com coordenadas relativas a um elemento UI especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Coordenada X|Coordenada X para onde o mouse se moverá em relação antes de clicar, a partir do local do seletor.|150|
|Coordenada Y|Coordenada Y para onde o mouse se moverá em relação antes de clicar, a partir do local do seletor.|100|

### Obter texto
  
Extrai um valor de texto de um elemento UI especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Enviar Texto
  
Permite gravar uma string no atributo Text de um elemento de UI especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Limpar|Se selecionado, exclui o texto antigo para escrever um novo. Por padrão, o texto será escrito em uma nova linha.|True|
|Texto|Texto o variable que se vá a escribir en el atributo Text del objeto.|Texto|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Enviar Tecla
  
Permite gravar uma string no atributo Text de um elemento de UI especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Texto|Texto ou variável para gravar no atributo Text do objeto.|Texto|
|Adicionar delay|Ative se o aplicativo digita lento|False|
|Resultado|Variável onde o resultado é armazenado|resultado|

### ComboBox
  
Selecione um item de um Seletor ou lista de itens.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Item|Escreva o nome do item a ser selecionado dentro do Seletor ou Lista.|Item|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Wheel
  
Simule o movimento da roda do mouse
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Voltas|Voltas que a roda do mouse vai fazer|1|
|Up or Down|Selecione se o movimento da roda será para cima ou para baixo.|up|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Extrair tabela
  
Extrai o valor das células em uma tabela de um elemento de UI especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Linha|Linha a ser extraída|2|
|Coluna|Coluna a ser extraída|3|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Esperar objeto
  
Aguarde até que um objeto apareça na tela
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Selector para esperar|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Tempo de espera em segundos|Tempo máximo de espera para o selector|30|
|Ação para esperar|Ação para esperar|-----Select-----|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Obter Handle de janelas abertas
  
Retorna uma lista com tuplas contendo o nome e o handle das janelas abertas
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Filtro|Filtre para encontrar a handle|*Bloco de notas|
|Variável|Variável onde a habdle será salva|Variável|

### Ler Lista
  
Extrai o valor das células em uma lista de um elemento de UI especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON que especifica os atributos do elemento GUI que você está procurando e alguns de seus pais.|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Localizar seletor filho por
  
Encontre todos os filhos por alguma propriedade e retorne seus seletores.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON que especifica os atributos do elemento GUI que você está procurando e alguns de seus pais.|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Data para pesquisar|Dado filho para pesquisar|labelClass1|
|Procurar|Seleção de onde procurar o seletor filho|ctrlid|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Obter status da checkbox
  
Obtém a Defail Action de um checkbox
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON que especifica os atributos do elemento GUI que você está procurando e alguns de seus pais.|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Obter valor|Checkbox para marcar apenas se a opção padrão não funcionar corretamente|False|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Objeto ativado
  
Retorna verdadeiro ou falso se o objeto estiver habilitado
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector|Propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON que especifica os atributos do elemento GUI que você está procurando e alguns de seus pais.|{"ctrlid":"NumberPad","cls":"NamedContainerAutomationPeer","title":"Teclado numérico","ctrltype":"GroupControl","idx": 7}|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Arrastar y soltar
  
Arraste e solte um objeto das coordenadas ou do seletor de objetos, origem e destino
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Você pode selecionar a combinação de qualquer uma das opções. Coordenadas e/ou seletor|||
|Selector do origen|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Selector do destino|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Coordenada de origem|Coordenadas de onde será arrastado|136,200|
|Coordenada de destino|Coordenadas para onde será arrastado|500,200|
|Resultado|Variável onde o resultado é armazenado|resultado|

### Obter posição
  
Retorna as coordenadas do elemento especificado. Você pode escolher mover o mouse para a posição
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Selector do origen|Use o seletor obtido no DesktopRecorder. Este seletor é a propriedade de texto usada para localizar um elemento de UI específico quando a atividade é executada. Na verdade, é um fragmento XML ou JSON especificando atributos do elemento GUI que você está procurando e de alguns de seus pais.|<wnd app='calc.exe' cls='CalcFrame' title='Calculadora' />|
|Mover o mouse para a posição|Se esta caixa estiver marcada, o mouse se moverá para o centro do elemento antes de retornar a posição|True|
|Resultado|Variável onde o resultado é armazenado|resultado|
