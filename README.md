# Curso de NestJS

<h1>Sites Recomendados</h1>

<ul>
    <li><a href="https://typeorm.io/" target="blank">TypeORM</a></li>
    <li><a href="https://docs.nestjs.com/techniques/database" target="blank">Database</a></li>
</ul>

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
		<tr>
			<td>Usado para otimizar os validators</td>
			<td><code>npm i @nestjs/mapped-types</code></td>
		</tr>
		<tr>
			<td>Instalação do ORM e a biblioteca do postgresql</td>
			<td><code>npm i @nestjs/typeorm typeorm pg</code></td>
		</tr>
		<tr>
			<td>Cria um módulo de configuração</td>
			<td><code>npm i @nestjs/config</code></td>
		</tr>
		<tr>
			<td>Biblioteca usada para validação</td>
			<td><code>npm i @hapi/joi</code></td>
		</tr>
		<tr>
			<td>Para tipagem use do @hapi/joi</td>
			<td><code>npm i -D @types/hapi__joi</code></td>
		</tr>
		<tr>
			<td>BCrypt é usado para trabalhar com autenticação</td>
			<td><code>npm i bcryptjs</code></td>
		</tr>
		<tr>
			<td>Bibliteca que define os tipos do BCrypt</td>
			<td><code>npm i -D @types/bcryptjs</code></td>
		</tr>
		<tr>
			<td>JWT é uma biblioteca de autenticação</td>
			<td><code>npm i @nestjs/jwt</code></td>
		</tr>
		<tr>
			<td>Instalação dos tipos para o multer. O multer server para trabalhar com upload</td>
			<td><code>npm i -D @types/multer</code></td>
		</tr>
		<tr>
			<td>Usado para trabalhar com arquivos estáticos</td>
			<td><code>npm i --save @nestjs/serve-static</code></td>
		</tr>
		<tr>
			<td>Enviar imagens para o cloudinary</td>
			<td><code>npm i cloudinary buffer-to-stream</code></td>
		</tr>
		<tr>
			<td>Permite trabalhar com protocolo de segurança no cabeçalho</td>
			<td><code>npm i helmet</code></td>
		</tr>
		<tr>
			<td>Usado para limitar a quantidade de requisições por segundo</td>
			<td><code>npm i --save @nestjs/throttler</code></td>
		</tr>
		<tr>
			<td>Biblioteca para gerenciamento de e-mail: Nodemailer</td>
			<td><code>npm i nodemailer</code></td>
		</tr>
		<tr>
			<td>Tipagem do Nodemailer</td>
			<td><code>npm i @types/nodemailer</code></td>
		</tr>
		<tr>
			<td>Instalação do Swagger</td>
			<td><code>npm i @nestjs/swagger swagger-ui-express</code></td>
		</tr>
	</table>
</div>

<h2>Bibliotecas recomendadas</h2>
<ul>
    <li>file-type image-type sharp: usadas para identificação de imagens pelo buffer</li>
</ul>



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

<h1>Criar um CRUD</h1>

<code>
    nest generate resource pessoas --no-spec
</code>
<br/>Escolha a opção:
<ul>
    <li>REST API</li>
	<li>CRUD entry points? Y</li>
</ul>

<h1>Para construir o build de uma aplicação finalizada</h1>

<code>
    npm run build
</code>

<h1>Site para trabalhar com envio de e-mail gratuito</h1>
<ul>
    <li>mailtrap: https://mailtrap.io/</li>
	<li>ethereal: https://ethereal.email/</li>
</ul>

