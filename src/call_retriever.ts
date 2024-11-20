import { genkit } from 'genkit';
import { mongodbvs, configureMongoDBRetriever } from './index'; // Replace with the correct path to your plugin
import { textEmbedding004, vertexAI } from '@genkit-ai/vertexai'; // Replace with the correct path to your module
import { exit } from 'process';

const ai = genkit({
  plugins: [mongodbvs([
    {
      connectionString: '',
      dbName: 'test',
      collectionName: 'test',
      numCandidates: 1,
      index: 'vector_index',
      textkey: 'text',
      embeddingkey: 'embedding',
      embedder: textEmbedding004 
    }
  ])],
});

const retriever: any = configureMongoDBRetriever(ai, {
  connectionString: 'mongodb+srv://venkatesh:ashwin123@freetier.kxcgwh2.mongodb.net/',
  dbName: 'maap',
  collectionName: 'conversations',
  numCandidates: 1,
  index: 'vector_index',
  textkey: 'text',
  embeddingkey: 'embedding',
  embedder: textEmbedding004 
});

const data = retriever;

async function iterateCursor() {
  for await (const doc of data) {
    console.log(doc);
  }
}

iterateCursor();
