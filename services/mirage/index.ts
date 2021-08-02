import {  createServer, Factory, Model, Response } from 'miragejs';
import faker from 'faker'; //Lib que cria dados fakes

type User = {
    name: string;
    email: string;
    create_at: string;
}

export function makeServer(){
    const server = createServer({
        models: { //banco de dados ficticio
            user: Model.extend<Partial<User>>({ //Partial = Talvez tenha dados que nao possuam tudo o que foi informado no User

            })
        },

        factories: { //criação dos dados iniciais da apifake
            user: Factory.extend({
                name(indice: number){
                    return `User ${indice +1}`
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt(){
                    return faker.date.recent(10); //Cria datas random a partir de 10 dias atrás ate a data atual
                }
            })
        },

        seeds(server){ //Dados iniciais na api fake
            server.createList('user', 200); //nome da factories que deve criar e quantidade
        },

        routes(){

            this.namespace = 'api'; //avisa que para chamar o '/users' é preciso por '/api' antes
            this.timing = 750; //avisa que a api deve aguardar 0.75s para resolver

            this.get("/users", function(schema, request){
                const { page = 1, per_page = 10 } = request.queryParams;
            
                const total = schema.all('user').length;

                const pageStart = (Number(page) - 1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page);
                
                const users = this.serialize(schema.all('user'))
                    .users.slice(pageStart, pageEnd);

                    return new Response(
                        200,
                        {'x-total-count': String(total)},
                        { users }
                    );


            }); //Shorthands => O miragejs entende pelo nome da rota que deve retornar todos os itens da tabela com o nome da rota
            this.post("/users"); //Shorthands => O miragejs entende pelo nome da rota que deve adicionar um item na tabela com o nome da rota
            
            this.namespace = '' ;
            this.passthrough();
        }
    })

    return server;
}