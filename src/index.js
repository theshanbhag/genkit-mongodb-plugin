"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbvs = mongodbvs;
exports.configureMongoDBRetriever = configureMongoDBRetriever;
const plugin_1 = require("genkit/plugin");
const mongodb_1 = require("mongodb");
/**
 * MongoDB plugin that provides a mongodb retriever and indexer
 */
function mongodbvs(params) {
    return (0, plugin_1.genkitPlugin)('mongodbvs', (ai) => __awaiter(this, void 0, void 0, function* () {
        params.map((i) => configureMongoDBRetriever(ai, i));
    }));
}
/**
 * Configures a MongoDB retriever.
 */
function configureMongoDBRetriever(ai, params) {
    const { connectionString, dbName, collectionName, numCandidates, index, textkey, embeddingkey, embedder, embedderOptions, query } = Object.assign({}, params);
    // connect to mongodb using connection string declared in params 
    const client = new mongodb_1.MongoClient(connectionString);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = collection.find(query);
    return data;
}
