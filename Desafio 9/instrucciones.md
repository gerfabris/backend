# Crear base de datos
> use ecommerce
switched to db ecommerce

# Crear collections
> db.createCollection('mensajes')
{ "ok" : 1 }
> db.createCollection('productos')
{ "ok" : 1 }

# Mostrar collecciones creadas
> show collections
mensajes
productos

# Agregar 10 documentos en cada coleccion 
# añadir productos con many
# comando
>  db.productos.insertMany([
... {title: 'goma de borrar', price: 120, stock: 20, thumbnail: 'aquiVaUnURL'},
...     {title: 'lapiz lyra rembrandt 2b', price: 580, stock: 10, thumbnail: 'aquiVaUnURL'},
...     {title: 'lapiz lyra rembrandt 6b', price: 900, stock: 21,thumbnail: 'aquiVaUnURL'},
...     {title: 'boligrafo parker vector', price: 1280, stock: 30, thumbnail: 'aquiVaUnURL'},
...     {title: 'pluma parker vector', price: 1700, stock: 5, thumbnail: 'aquiVaUnURL'},
...     {title: 'pluma lamy safari', price: 2300, stock: 1, thumbnail: 'aquiVaUnURL'},
...     {title: 'pluma inoxcrom', price: 2860, stock: 25,thumbnail: 'aquiVaUnURL'},
...     {title: 'boligrafo lamy 2000', price: 3350, stock: 33, thumbnail: 'aquiVaUnURL'},
...     {title: 'boligrafo lamy imporium', price: 4320, stock: 69,thumbnail: 'aquiVaUnURL'},
...     {title: 'pluma pilot vanishing point', price: 4990, stock: 7, thumbnail: 'aquiVaUnURL'},
...  ]);
# respuesta
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("6317b6412276982ac27bbf60"),
                ObjectId("6317b6412276982ac27bbf61"),
                ObjectId("6317b6412276982ac27bbf62"),
                ObjectId("6317b6412276982ac27bbf63"),
                ObjectId("6317b6412276982ac27bbf64"),
                ObjectId("6317b6412276982ac27bbf65"),
                ObjectId("6317b6412276982ac27bbf66"),
                ObjectId("6317b6412276982ac27bbf67"),
                ObjectId("6317b6412276982ac27bbf68"),
                ObjectId("6317b6412276982ac27bbf69")
        ]
}
# añadir mensajes con insertOne
> db.mensajes.insertOne({author: 'Juan', text: 'esta es la base de datos de un chat?', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf6a")
}
>
> db.mensajes.insertOne({author: 'Morgana', text: 'Asi parece, Sherlock', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf6b")
}
>
> db.mensajes.insertOne({author: 'Gisela', text: 'Como funciona?', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf6c")
}
>
> db.mensajes.insertOne({author: 'Juan', text: 'No tengo idea lo que estoy haciendo aqui', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf6d")
}
>
> db.mensajes.insertOne({author: 'Morgana', text: 'Sos el admin de la db y no sabes que haces? mejor me voy', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf6e")
}
>
> db.mensajes.insertOne({author: 'Juan', text: 'Pará no va a explotar nada, o quizas si', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf6f")
}
>
> db.mensajes.insertOne({author: 'Gisela', text: 'No sabia que las bases de datos podian explotar', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf70")
}
>
> db.mensajes.insertOne({author: 'Juan', text: 'Era un chiste, pero ahora me entró la duda de que pueda ocurrir', timestampe: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf71")
}
>
> db.mensajes.insertOne({author: 'Gisela', text: 'Ay no, mejor dejemos de plagar de mensajes hasta que aprendas a manejar bien esto', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b8512276982ac27bbf72")
}
>
> db.mensajes.insertOne({author: 'Juan', text: 'Suena como un buen plan', timestamp: new Date() });
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317b85b2276982ac27bbf73")
}
>

# listar los productos 
# comando
> db.productos.find()
# respuesta
{ "_id" : ObjectId("6317b6412276982ac27bbf60"), "title" : "goma de borrar", "price" : 120, "stock" : 20, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf61"), "title" : "lapiz lyra rembrandt 2b", "price" : 580, "stock" : 10, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf62"), "title" : "lapiz lyra rembrandt 6b", "price" : 900, "stock" : 21, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf63"), "title" : "boligrafo parker vector", "price" : 1280, "stock" : 30, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf64"), "title" : "pluma parker vector", "price" : 1700, "stock" : 5, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf65"), "title" : "pluma lamy safari", "price" : 2300, "stock" : 1, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf66"), "title" : "pluma inoxcrom", "price" : 2860, "stock" : 25, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf67"), "title" : "boligrafo lamy 2000", "price" : 3350, "stock" : 33, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf68"), "title" : "boligrafo lamy imporium", "price" : 4320, "stock" : 69, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf69"), "title" : "pluma pilot vanishing point", "price" : 4990, "stock" : 7, "thumbnail" : "aquiVaUnURL" }
>
# comando
> db.productos.find().pretty()
# respuesta
{
        "_id" : ObjectId("6317b6412276982ac27bbf60"),
        "title" : "goma de borrar",
        "price" : 120,
        "stock" : 20,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf61"),
        "title" : "lapiz lyra rembrandt 2b",
        "price" : 580,
        "stock" : 10,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf62"),
        "title" : "lapiz lyra rembrandt 6b",
        "price" : 900,
        "stock" : 21,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf63"),
        "title" : "boligrafo parker vector",
        "price" : 1280,
        "stock" : 30,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf64"),
        "title" : "pluma parker vector",
        "price" : 1700,
        "stock" : 5,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf65"),
        "title" : "pluma lamy safari",
        "price" : 2300,
        "stock" : 1,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf66"),
        "title" : "pluma inoxcrom",
        "price" : 2860,
        "stock" : 25,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf67"),
        "title" : "boligrafo lamy 2000",
        "price" : 3350,
        "stock" : 33,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf68"),
        "title" : "boligrafo lamy imporium",
        "price" : 4320,
        "stock" : 69,
        "thumbnail" : "aquiVaUnURL"
}
{
        "_id" : ObjectId("6317b6412276982ac27bbf69"),
        "title" : "pluma pilot vanishing point",
        "price" : 4990,
        "stock" : 7,
        "thumbnail" : "aquiVaUnURL"
}
>

# listar mensajes
# comando
> db.mensajes.find()
# respuesta
{ "_id" : ObjectId("6317b8512276982ac27bbf6a"), "author" : "Juan", "text" : "esta es la base de datos de un chat?", "timestamp" : ISODate("2022-09-06T21:14:57.556Z") }
{ "_id" : ObjectId("6317b8512276982ac27bbf6b"), "author" : "Morgana", "text" : "Asi parece, Sherlock", "timestamp" : ISODate("2022-09-06T21:14:57.578Z") }
{ "_id" : ObjectId("6317b8512276982ac27bbf6c"), "author" : "Gisela", "text" : "Como funciona?", "timestamp" : ISODate("2022-09-06T21:14:57.585Z") }
{ "_id" : ObjectId("6317b8512276982ac27bbf6d"), "author" : "Juan", "text" : "No tengo idea lo que estoy haciendo aqui", "timestamp" : ISODate("2022-09-06T21:14:57.595Z") }
{ "_id" : ObjectId("6317b8512276982ac27bbf6e"), "author" : "Morgana", "text" : "Sos el admin de la db y no sabes que haces? mejor me voy", "timestamp" : ISODate("2022-09-06T21:14:57.612Z") }
{ "_id" : ObjectId("6317b8512276982ac27bbf6f"), "author" : "Juan", "text" : "Pará no va a explotar nada, o quizas si", "timestamp" : ISODate("2022-09-06T21:14:57.624Z") }
{ "_id" : ObjectId("6317b8512276982ac27bbf70"), "author" : "Gisela", "text" : "No sabia que las bases de datos podian explotar", "timestamp" : ISODate("2022-09-06T21:14:57.639Z") }
{ "_id" : ObjectId("6317b8512276982ac27bbf71"), "author" : "Juan", "text" : "Era un chiste, pero ahora me entró la duda de que pueda ocurrir", "timestampe" : ISODate("2022-09-06T21:14:57.655Z") }
{ "_id" : ObjectId("6317b8512276982ac27bbf72"), "author" : "Gisela", "text" : "Ay no, mejor dejemos de plagar de mensajes hasta que aprendas a manejar bien esto", "timestamp" : ISODate("2022-09-06T21:14:57.673Z") }
{ "_id" : ObjectId("6317b85b2276982ac27bbf73"), "author" : "Juan", "text" : "Suena como un buen plan", "timestamp" : ISODate("2022-09-06T21:15:07.650Z") }
>
# comando
> db.mensajes.find().pretty()
# respuesta
{
        "_id" : ObjectId("6317b8512276982ac27bbf6a"),
        "author" : "Juan",
        "text" : "esta es la base de datos de un chat?",
        "timestamp" : ISODate("2022-09-06T21:14:57.556Z")
}
{
        "_id" : ObjectId("6317b8512276982ac27bbf6b"),
        "author" : "Morgana",
        "text" : "Asi parece, Sherlock",
        "timestamp" : ISODate("2022-09-06T21:14:57.578Z")
}
{
        "_id" : ObjectId("6317b8512276982ac27bbf6c"),
        "author" : "Gisela",
        "text" : "Como funciona?",
        "timestamp" : ISODate("2022-09-06T21:14:57.585Z")
}
{
        "_id" : ObjectId("6317b8512276982ac27bbf6d"),
        "author" : "Juan",
        "text" : "No tengo idea lo que estoy haciendo aqui",
        "timestamp" : ISODate("2022-09-06T21:14:57.595Z")
}
{
        "_id" : ObjectId("6317b8512276982ac27bbf6e"),
        "author" : "Morgana",
        "text" : "Sos el admin de la db y no sabes que haces? mejor me voy",
        "timestamp" : ISODate("2022-09-06T21:14:57.612Z")
}
{
        "_id" : ObjectId("6317b8512276982ac27bbf6f"),
        "author" : "Juan",
        "text" : "Pará no va a explotar nada, o quizas si",
        "timestamp" : ISODate("2022-09-06T21:14:57.624Z")
}
{
        "_id" : ObjectId("6317b8512276982ac27bbf70"),
        "author" : "Gisela",
        "text" : "No sabia que las bases de datos podian explotar",
        "timestamp" : ISODate("2022-09-06T21:14:57.639Z")
}
{
        "_id" : ObjectId("6317b8512276982ac27bbf71"),
        "author" : "Juan",
        "text" : "Era un chiste, pero ahora me entró la duda de que pueda ocurrir",
        "timestampe" : ISODate("2022-09-06T21:14:57.655Z")
}
{
        "_id" : ObjectId("6317b8512276982ac27bbf72"),
        "author" : "Gisela",
        "text" : "Ay no, mejor dejemos de plagar de mensajes hasta que aprendas a manejar bien esto",
        "timestamp" : ISODate("2022-09-06T21:14:57.673Z")
}
{
        "_id" : ObjectId("6317b85b2276982ac27bbf73"),
        "author" : "Juan",
        "text" : "Suena como un buen plan",
        "timestamp" : ISODate("2022-09-06T21:15:07.650Z")
}
>
# contabilizar los documentos en cada coleccion
# productos
> db.productos.find().count()
10
# mensajes
> db.mensajes.find().count()
10
>

# Se realizan operaciones CRUD en la coleccion de productos

## Se agrega un producto a la coleccion
# comando
> db.productos.insertOne({title: 'tinta pilot', price: 4900, thumbnail: 'aquiVaUnURL'})
# respuesta
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6317ba5f2276982ac27bbf74")
}
>

# Se realizan consulta
# precios menor a 1000
# comando 
> db.productos.find({'price':{$lt:1000}})
# respuesta
{ "_id" : ObjectId("6317b6412276982ac27bbf60"), "title" : "goma de borrar", "price" : 120, "stock" : 20, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf61"), "title" : "lapiz lyra rembrandt 2b", "price" : 580, "stock" : 10, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf62"), "title" : "lapiz lyra rembrandt 6b", "price" : 900, "stock" : 21, "thumbnail" : "aquiVaUnURL" }
>
# precio entre 1000 y 3000
# comando
> db.productos.find({'price':{$lt:1000}})
# respuesta 

> db.productos.find({$and:[{'price':{$gte:1000}},{'price':{$lte:3000}}]});
{ "_id" : ObjectId("6317b6412276982ac27bbf63"), "title" : "boligrafo parker vector", "price" : 1280, "stock" : 30, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf64"), "title" : "pluma parker vector", "price" : 1700, "stock" : 5, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf65"), "title" : "pluma lamy safari", "price" : 2300, "stock" : 1, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf66"), "title" : "pluma inoxcrom", "price" : 2860, "stock" : 25, "thumbnail" : "aquiVaUnURL" }
>

# precio mayor a 3000
# comando
> db.productos.find({'price':{$gt:3000}});
# respuesta 
{ "_id" : ObjectId("6317b6412276982ac27bbf67"), "title" : "boligrafo lamy 2000", "price" : 3350, "stock" : 33, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf68"), "title" : "boligrafo lamy imporium", "price" : 4320, "stock" : 69, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf69"), "title" : "pluma pilot vanishing point", "price" : 4990, "stock" : 7, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317ba5f2276982ac27bbf74"), "title" : "tinta pilot", "price" : 4900, "thumbnail" : "aquiVaUnURL" }
>

# tercer producto mas barato.
# comando 
> db.productos.find({}).sort({'price':1}).skip(2).limit(1);
# respuesta
{ "_id" : ObjectId("6317b6412276982ac27bbf62"), "title" : "lapiz lyra rembrandt 6b", "price" : 900, "stock" : 21, "thumbnail" : "aquiVaUnURL" }
>

# stock de todos los productos a 100.
# comando
> db.productos.updateMany({ 'price':{ $gte: 0 }}, { $set:{  'stock': 100 }});
# respuesta
{ "acknowledged" : true, "matchedCount" : 11, "modifiedCount" : 11 }
>

# stock a 0 de los productos con un precio mayor a 4000.
# comando 
> db.productos.updateMany({'price':{$gte:4000}}, {$set:{'stock': 0 }})
# respuesta
{ "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }

#  Se eliminan los productos con precio menor a 1000.
# comando
> db.productos.deleteMany({'price': {$lt:1000}})
# respuesta
{ "acknowledged" : true, "deletedCount" : 3 }


# creación usuario lector
# comando
> db.createUser({'user':'lector','pwd':'1234', 'roles': [{role: 'read', db: 'ecommerce'}]})
# respuesta
Successfully added user: {
        "user" : "lector",
        "roles" : [
                {
                        "role" : "read",
                        "db" : "ecommerce"
                }
        ]
}
>
# Comando para entrar como usuario lector
cerrar aplicacion. volver a ingresar 
mongod --auth
mongo -u lector -p 1234

# comprueba que pueda leer

> show dbs
ecommerce  0.000GB
>

> use ecommerce
switched to db ecommerce
> db.productos.find()
{ "_id" : ObjectId("6317b6412276982ac27bbf63"), "title" : "boligrafo parker vector", "price" : 1280, "stock" : 100, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf64"), "title" : "pluma parker vector", "price" : 1700, "stock" : 100, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf65"), "title" : "pluma lamy safari", "price" : 2300, "stock" : 100, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf66"), "title" : "pluma inoxcrom", "price" : 2860, "stock" : 100, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf67"), "title" : "boligrafo lamy 2000", "price" : 3350, "stock" : 100, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf68"), "title" : "boligrafo lamy imporium", "price" : 4320, "stock" : 0, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317b6412276982ac27bbf69"), "title" : "pluma pilot vanishing point", "price" : 4990, "stock" : 0, "thumbnail" : "aquiVaUnURL" }
{ "_id" : ObjectId("6317ba5f2276982ac27bbf74"), "title" : "tinta pilot", "price" : 4900, "thumbnail" : "aquiVaUnURL", "stock" : 0 }
>

# comprueba que no pueda insertar
# comando
> db.productos.insertOne({title: 'articulo lector'})
# respuesta
uncaught exception: WriteCommandError({
        "ok" : 0,
        "errmsg" : "not authorized on ecommerce to execute command { insert: \"productos\", ordered: true, lsid: { id: UUID(\"b2186fe5-4eba-45b1-a901-cc91ba6b4589\") }, $db: \"ecommerce\" }",
        "code" : 13,
        "codeName" : "Unauthorized"
}) :