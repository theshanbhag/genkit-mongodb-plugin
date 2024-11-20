/**
 * Copyright 2024 The Fire Company
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GenkitPlugin, genkitPlugin } from 'genkit/plugin';
import { Genkit, z } from 'genkit';
import { MongoClient } from 'mongodb';
import { EmbedderArgument } from 'genkit/embedder';
import { RetrieverParams } from 'genkit';
import { ZodTypeAny } from 'zod'; // Add this line


export interface PluginOptions {
  connectionString: string ;
    dbName: string ;
    collectionName: string ;
    numCandidates: number ;
    index: string ;
    textkey: string ;
    embeddingkey: string ;
}

/**
 * MongoDB plugin that provides a mongodb retriever and indexer
 */
export function mongodbvs<EmbedderCustomOptions extends z.ZodTypeAny>(
  params: {
    connectionString: string ;
    dbName: string ;
    collectionName: string ;
    numCandidates: number ;
    index: string ;
    textkey: string ;
    embeddingkey: string ;
    embedder: EmbedderArgument<EmbedderCustomOptions>;
    embedderOptions?: z.infer<EmbedderCustomOptions>;
  }[]
): GenkitPlugin {
  return genkitPlugin('mongodbvs', async (ai: Genkit) => {
    params.map((i) => configureMongoDBRetriever(ai, i));
  });
}

/**
 * Configures a MongoDB retriever.
 */
export function configureMongoDBRetriever<
  EmbedderCustomOptions extends z.ZodTypeAny,
>(
  ai: Genkit,
  params: {
    connectionString: string ;
    dbName: string ;
    collectionName: string ;
    numCandidates: number ;
    index: string ;
    textkey: string ;
    embeddingkey: string ;
    embedder: EmbedderArgument<EmbedderCustomOptions>;
    embedderOptions?: z.infer<EmbedderCustomOptions>;
    query?: any;
// ...

  }
) {
  const { connectionString, dbName, collectionName, numCandidates, index, textkey, embeddingkey, embedder, embedderOptions, query } = {
    ...params,
  };
  // connect to mongodb using connection string declared in params 
  const client = new MongoClient(connectionString);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  
  
  const data = collection.find(query);

  return data;

}
