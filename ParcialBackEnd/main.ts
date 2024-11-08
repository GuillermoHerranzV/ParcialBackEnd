import { MongoClient } from 'mongodb'
import type { Personas } from './Personas.ts'

// Connection URL
const url = "mongodb+srv://UsuarioParcial:UsuarioParcial@clusterparcial.c8i31.mongodb.net/?retryWrites=true&w=majority&appName=ClusterParcial";

if (!url){
  console.log ("Base de datos no encontrada.");
  Deno.exit(1);
}

const client = new MongoClient(url);

// Nombre de la base de datos
const dbName = 'ExamenParcial';

// Conectarse a la base de datos
await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const ColeccionPersonas = db.collection('Personas');

const handler = async (req: Request) => {

  const method = req.method;
  const url = new URL (req.url)
  const path = url.pathname;

  if (method === "GET"){

    if (path === "/personas"){

      const nombre = url.searchParams.get ("Nombre");
      if (!nombre){

        const personas = await ColeccionPersonas.find().toArray();

        return new Response (JSON.stringify (personas));

      } else {

        const personas = await ColeccionPersonas.findOne ({nombre});

        return new Response (JSON.stringify (personas));

      }

    }else if (path === "/persona"){

      const email = url.searchParams.get ("Email");
      if (!email){

        return new Response ("Persona no encontrada");

      } else {

        const persona = await ColeccionPersonas.findOne ({email});

        return new Response (JSON.stringify (persona));

      }

    }

  } if (method === "POST"){

    if (path === "/personas"){



    }

  } if (method === "PUT"){



  } if (method === "DELETE"){



  }

}
//Esta comentado porque da error no se porque
//Deno.serve({ port: 3000 }, handler);