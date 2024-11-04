# Curso de NestJS

<h1>Requerimentos</h1>

<ul>
    <li>NodeJS</li>
    <li>NPM</li>
</ul>

<h1>Instalar o NestJS CLI
</h1>

<code>
    npm install -g @nestjs/cli
</code>

<h1>Instalação de extensões do VSCode</h1>

<ul>
    <li>REST Client</li>
    <li>Reload</li>
	<li>ESLint</li>
	<li>Prettier - Code formatter</li>
</ul>

<br/>Testando a instalação

<code>
    nest --version
</code>

<h1>Criar uma nova aplicação</h1>

<code>
    nest new <i>nome_aplicacao</i> --skip-git
</code>

<br/>Escolha a opção:
<ul>
    <li>npm</li>
</ul>

<h1>Rodar o servidor</h1>

<code>
    npm run start
</code>

<code>
    npm run start:dev
</code>

<br/>Host: <code>localhost:3000</code>

<h1>Bibliotecas instaladas</h1>

<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
	<table>
		<tr>
			<td>Descrição</td>
			<td>Instalação</td>
		</tr>
		<tr>
			<td>Trabalha com validação e transformação de dados</td>
			<td><code>npm i class-validator class-transformer</code></td>
		</tr>
	</table>
</div>



<h1>Criar um módulo</h1>

<code>
    nest generate module <i>nome_modulo</i>
</code>

<h1>Criar um controller</h1>

<code>
    nest generate controller <i>nome_controller</i> --no-spec
</code>

<h1>Criar um service/provider</h1>

<code>
    nest generate service <i>nome_service</i> --no-spec
</code>

<h1>Criar um DTO</h1>

<code>
    nest generate class <i>path/nome_service.dto</i> --no-spec --flat
</code>