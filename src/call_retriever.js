"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const genkit_1 = require("genkit");
const index_1 = require("./index"); // Replace with the correct path to your plugin
const vertexai_1 = require("@genkit-ai/vertexai"); // Replace with the correct path to your module
const ai = (0, genkit_1.genkit)({
    plugins: [(0, index_1.mongodbvs)([
            {
                connectionString: '',
                dbName: 'test',
                collectionName: 'test',
                numCandidates: 1,
                index: 'vector_index',
                textkey: 'text',
                embeddingkey: 'embedding',
                embedder: vertexai_1.textEmbedding004
            }
        ])],
});
const retriever = (0, index_1.configureMongoDBRetriever)(ai, {
    connectionString: 'mongodb+srv://venkatesh:ashwin123@freetier.kxcgwh2.mongodb.net/',
    dbName: 'maap',
    collectionName: 'conversations',
    numCandidates: 1,
    index: 'vector_index',
    textkey: 'text',
    embeddingkey: 'embedding',
    embedder: vertexai_1.textEmbedding004
});
const data = retriever;
function iterateCursor() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, data_1 = __asyncValues(data), data_1_1; data_1_1 = yield data_1.next(), _a = data_1_1.done, !_a; _d = true) {
                _c = data_1_1.value;
                _d = false;
                const doc = _c;
                console.log(doc);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = data_1.return)) yield _b.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
iterateCursor();
