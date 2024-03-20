<h1 align="center"> 
    Gerenciamento de Tarefas - API 
</h1>

<h3 align="center"> 
    Endpoints
</h3>

A API tem um total de 13 endpoints, sendo em volta principalmente do usuário (dev) - podendo cadastrar seu tarefas em diferentes categorias a serem realizadas.

A url base da API é <https://kenzie-academy-brasil-developers-m5-5gcq.onrender.com/>


>[warning] 
>Como a API está rodando em um servidor de graça pode ser que ela demore um pouco a responder na primeira requisição feita.


## Inicialização do projeto
- **Node Version**: v20.9.0^.
- **Npm Version**: v10.1.0^.
- **Instalação de dependências**: `npm i` | `npm install`.
- **Variáveis de ambiente**: Duplicar e renomear o arquivo `.env.example` para `.env.develop` e sobreescrever as informações do arquivo `.env.develop` com as suas credênciais.
- **Migrações**: Execute as migrações com o comando: `npm run migrate:dev`.
- **Rodar a aplicação**: Comando para iniciar a aplicação: `npm run dev`.

## Rotas que não precisam de autenticação

<h2 align="center"> 
    Cadastro de usuário
</h2>

`POST /users - FORMATO DA REQUISIÇÃO`

````json
{
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "12345678"
}
````

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

````json
{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}
````

Possíveis erros:

`POST /users - E-mail já cadastrado - STATUS 409`

````json
{ "message": "This email is already registered" }
````

`POST /users - Quando o corpo não é compatível com o padrão - STATUS 400`

<h2 align="center"> 
    Login
</h2>

`POST /users/login - FORMATO DA REQUISIÇÃO`

````json
{
    "email": "johndoe@email.com",
    "password": "12345678"
}
````

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 200`

````json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxMjcwMjk2LCJleHAiOjE3MDEzMTM0OTZ9.Ebru139GF02sx9EFR0PouLrErYyYIcFJgLa6vIfsktA",
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "johndoe@email.com"
	}
}⁠
````

Possíveis erros:

`POST /users/login - Usuário não existe - STATUS 404`

````json
{ "messsage": "User not exists" }
````

`POST /users/login - E-mail e senha não correspondem - STATUS 401`

````json
{ "messsage": "Email and password doesn't match" }
````

`POST /users/login - Quando o corpo não é compatível com o padrão - STATUS 400`

## Rotas que precisam de autenticação

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

````json
Authorization: Bearer {token}
````

<h2 align="center"> 
    Recuperação de usuário
</h2>

`GET /users/profile`

Caso dê tudo certo, a resposta será assim:

`GET /users/profile - FORMATO DA RESPOSTA - STATUS 200`

````json
{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}⁠⁠
````

Possíveis erros:

`GET /users/profile - O token é obrigatório - STATUS 401`

````json
{"message": "jwt must be provided"}
````

<h2 align="center"> 
    Criação de tarefa
</h2>

`POST /tasks - FORMATO DA REQUISIÇÃO`

````json
{
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
}
````

Caso dê tudo certo, a resposta será assim:

`POST /tasks - FORMATO DA RESPOSTA - STATUS 201`

````json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "userId": 1,
    "categoryId": null
}    
````

Possíveis erros:

`POST /tasks - Categoria não encontrada. - STATUS 404`

````json
{"message": "Category not found"}
````

`POST /tasks - Quando o corpo não é compatível com o padrão - STATUS 400`

<h2 align="center"> 
    Leitura de tarefas
</h2>

`GET /tasks`

Caso dê tudo certo, a resposta será assim:

`GET /tasks - FORMATO DA RESPOSTA - STATUS 200`

````json
[
    {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "Lorem ipsum",
        "finished": true,
        "category": {
            "id": 1,
            "name": "Estudo",
        }
    }  
]    
````

Nessa rota também pode ser passado um parâmetro como filtro das tasks, dessa maneira:

`GET /tasks?category=name_category`

Caso dê tudo certo, a resposta será assim:

`GET /tasks?category=estudo - FORMATO DA RESPOSTA - STATUS 200`

````json
[
    {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "Lorem ipsum",
        "finished": true,
        "category": {
            "id": 1,
            "name": "Estudo",
        }
    },
    {
        "id": 2,
        "title": "Lorem ipsum 2",
        "content": "Lorem ipsum 2",
        "finished": true,
        "category": {
            "id": 1,
            "name": "Estudo",
        }
    }    
]    
````

Possíveis erros:

`GET /tasks?category=name_category - Categoria não encontrada. - STATUS 404`

````json
{"message": "Category not found"}  
````

### Leitura de tarefa individual

`GET /tasks/:id`

Caso dê tudo certo, a resposta será assim:

`GET /tasks/1 - FORMATO DA RESPOSTA - STATUS 200`

````json
[
    {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "Lorem ipsum",
        "finished": true,
        "category": {
            "id": 1,
            "name": "Estudo",
        }
    }  
]    
````

Possíveis erros:

`GET /tasks/:id - Tarefa não encontrada. - STATUS 404`

````json
{"message": "Task not found"}
````

<h2 align="center"> 
    Atualização de tarefa
</h2>

`PATCH /tasks/:id - FORMATO DA REQUISIÇÃO`

````json
{"content": "Lorem ipsum novo"}
````

Caso dê tudo certo, a resposta será assim:

`PATCH /tasks/:id - FORMATO DA RESPOSTA - STATUS 200`

````json
{
	"id": 1,
	"title": "Lorem ipsum",
	"content": "Lorem ipsum novo",
	"finished": true,
	"userId": 1,
	"categoryId": 1
}  
````

Possíveis erros:

`PATCH /tasks/:id - Tarefa não encontrada. - STATUS 404`

````json
{"message": "Task not found"}
````

`PATCH /tasks/:id - Categoria não encontrada. - STATUS 404`

````json
{"message": "Category not found"}
````

`PATCH /tasks/:id - Quando o corpo não é compatível com o padrão - STATUS 400`

<h2 align="center"> 
    Excluindo a tarefa
</h2>

`DELETE /tasks/:id - FORMATO DA REQUISIÇÃO`

Caso dê tudo certo, a resposta será assim:

`DELETE /tasks/:id - Está rota não tem um corpo de resposta - STATUS 204`

````
Não é necessário um corpo da requisição.
````
Possíveis erros:

`DELETE /tasks/:id - Tarefa não encontrada. - STATUS 404`

````json
{"message": "Task not found"}
````

<h2 align="center"> 
    Criação de categoria
</h2>

`POST /categories - FORMATO DA REQUISIÇÃO`

````json
{
    "name": "Estudo"
}
````

Caso dê tudo certo, a resposta será assim:

`POST /categories - FORMATO DA RESPOSTA - STATUS 201`

````json
{
	"id": 1,
	"name": "Estudo"
}
````

Possíveis erros:

`POST /categories - Quando o corpo não é compatível com o padrão - STATUS 400`

<h2 align="center"> 
    Excluindo a categoria
</h2>

`DELETE /categories/:id - FORMATO DA REQUISIÇÃO`

Caso dê tudo certo, a resposta será assim:

`DELETE /categories/:id - Está rota não tem um corpo de resposta - STATUS 204`

````
Não é necessário um corpo da requisição.
````
Possíveis erros:

`DELETE /categories/:id - Tarefa não encontrada. - STATUS 404`

````json
{"message": "Category not found"}
````

<h2 align="center"> 
    Possível erro em comum das rotas autenticadas
</h2>

`Token expirado. - STATUS 401`

````json
{
	"message": "jwt expired"
}
````

`Token invalido. - STATUS 401`

````json
{
	"message": "jwt must be provided"
}
````