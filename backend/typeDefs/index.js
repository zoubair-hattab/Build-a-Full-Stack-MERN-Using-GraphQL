import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDef from './user.typeDef.js';
import trnsactionTypeDef from './transaction.typeDef.js';
const mergedTypeDefs = mergeTypeDefs([userTypeDef, trnsactionTypeDef]);
export default mergedTypeDefs;
