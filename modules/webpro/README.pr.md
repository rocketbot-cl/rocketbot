# WEB Pro
  
Módulo com funcionalidades estendidas para o navegador que funciona como complemento aos comandos da seção web

*Read this in other languages: [English](README.md), [Portugues](README.pr.md), [Español](README.es.md).*

## Como instalar este módulo
  
__Baixe__ e __instale__ o conteúdo na pasta 'modules' no caminho do Rocketbot  


## Como usar este módulo
Este módulo é complementado pelos módulos e comandos nativos da Web que vêm por padrão no Rocketbot. Para usar o módulo você deve ter um navegador já aberto do Rocketbot com o comando "Open Browser". Depois disso, podemos usar os comandos normalmente.


## Overview


1. Lista de itens  
Obtém uma lista de todos os elementos e seus filhos de uma classe ou nome, para poder iterar sobre ela.

2. Limpa uma entrada e envia o texto  
Deleta o conteúdo de um objeto tipo input e envia o texto

3. Salvar Cookies  
Salva os cookies de uma página para que possam ser carregados em outra instância

4. Carregar Cookies  
Carrega um arquivo com cookies

5. Recarregar página  
Recarregar página

6. Back  
retorna à página anterior

7. Clique duplo  
Clique duplo sobre um objeto selecionado

8. Scroll  
Rolar para uma determinada posição

9. Contar iten  
Entregar o número total de itens

10. Selecionar Objeto por Índice  
Seleciona um objeto passando-lhe o índice

11. Clique Objeto por Índice  
Clique em um objeto passando o índice

12. Exportar página para PDF  
Exporte a página para um arquivo PDF. Se a página contiver elementos fixos, eles podem ser removidos com Javascript para obter uma exportação adequada.

13. Abrir Chrome em modo headless  
Abre Chrome em modo headless

14. Tomar captura por coordenadas  
Tira uma foto da tela de uma seção da página usando coordenadas

15. Obter o retângulo de delimitação  
Obtém as coordenadas x e y e as dimensões de um objeto.

16. Obter coordenadas de um objeto  
Obtém as coordenadas x e y de um objeto.

17. Obter dimensões de um objeto  
Obtém dimensões de um objeto

18. Abrir Chrome modo desenvolvedor  
Abre o Google Chrome em modo seguro ou debugger

19. Ver Consola  
Obtém informações do console

20. Converter página para PNG  
Ele tira vários instantâneos da página da Web e os concatena em um. Se a página contiver elementos fixos, eles podem ser removidos com Javascript para obter uma exportação correta.

21. Hover Element  
Passar o mouse sobre o elemento

22. Abrir Edge (Chromium)  
Abrir o novo Chromium-based Edge

23. Clique Pro  
Clica em um objeto selecionado, esperando que ele se torne clicável.

24. Extrair Texto Pro  
Obtém o texto de um objeto esperando que ele esteja disponível.

25. Selecionar objeto Pro  
Seleciona um objeto esperando que ele esteja presente

26. Mudar para iframe Pro  
Troca para um iframe esperando que ele esteja presente

27. Enviar Teclas  
Similar ao Send Web Text, mas em um nível inferior

28. Imprimir como PDF (Chrome)  
Imprima a página como PDF no Chrome. O PDF é gerado com base no conteúdo disponível da página. Não representa uma cópia verdadeira do site.

29. Forçar o download  
Forçando um download

30. Abrir Nova Aba  
Abre uma nova aba com a URL

31. Abrir navegador  
Abre o navegador indicando a URL

32. Drag and drop  
Fazer um drag and drop

33. Subir arquivo  
Comando para fazer upload um ou mais arquivos para um input do tipo file. Basta preencher um único valor, dependendo de quantos arquivos você deseja enviar.

34. Enviar combinação de teclas  
Comando para enviar combinação de teclas

35. Clique direito  
Clique direito sobre um objeto selecionado  



### Changes
Mon May 2 16:53:22 2022  Merge from QA - Merge pull request from rocketbot-cl
Thu Aug 19 13:24:01 2021  Merge branch master of github.com:rocketbot-cl/webpro
Fri Apr 24 16:28:55 2020  Merge branch master of https://github.com/rocketbot-cl/webpro
Wed Mar 11 14:24:59 2020  Merge branch master of https://github.com/rocketbot-cl/webpro

----
### OS

- windows
- mac
- linux
- docker

### Dependencies
- [**beautifulsoup4**](https://pypi.org/project/beautifulsoup4/)- [**requests**](https://pypi.org/project/requests/)
### License
  
![MIT](https://camo.githubusercontent.com/107590fac8cbd65071396bb4d04040f76cde5bde/687474703a2f2f696d672e736869656c64732e696f2f3a6c6963656e73652d6d69742d626c75652e7376673f7374796c653d666c61742d737175617265)  
[MIT](http://opensource.org/licenses/mit-license.ph)