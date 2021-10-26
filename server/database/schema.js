const _ = require('lodash');
const Author = require('../models/Author')
const Book = require('../models/Book');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLSchema
} = require('graphql');

//Hard Coding
var books = [
    {name:'Alchemist' , genre:'Fiction',id:'1',authorid:'1'},
    {name:'Alchemist' , genre:'Fiction',id:'2',authorid:'2'},
    {name:'Alchemist' , genre:'Fiction',id:'3',authorid:'2'},
    {name:'Alchemist' , genre:'Fiction',id:'4',authorid:'4'}
];

var authors = [
    {name:'x' , age:'23',id:'1'},
    {name:'Paulo Coelcho' , age:'32',id:'2'},
    {name:'z' , age:'45',id:'3'},
    {name:'m' , age:'67',id:'4'},
]
//Object Type
const BookType = new GraphQLObjectType({
    name :'BookType',
    fields : () => ({
        id:{type: GraphQLID},
        name:{type : GraphQLString},
        genre : {type: GraphQLString},
        authorsid: {type: GraphQLString},
        author:{
            type : AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorid);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name :'AuthorType',
    fields : () => ({
        id:{type: GraphQLID},
        name:{type : GraphQLString},
        age : {type: GraphQLString},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.findById(parent.authorsid);
            }
        }
    })
});



//RootQuery
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type:BookType,
            args:{id: {type:GraphQLID}},
            resolve(parent,args){
               return Book.findById(args.id);
            }
        },
        author:{
           type: AuthorType,
           args:{id : {type:GraphQLID}},
           resolve(parent,args){
              return Author.findById(parent.authorsid);
           }
        },
        books:{
            type:GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({});
            }
        },
        authors:{
            type:GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({});
            }
        }
    }
});
//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorid:{type: GraphQLID}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid
                })
                return book.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
})