import {GraphQLError} from "graphql/error/index.js";

export function internalError(message, code) {
    console.error(message);
    throw new GraphQLError(message, {
        extensions: { code },
    });
}

export function notFoundError(message) {
    console.error(message);
    throw new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' },
    });
}

export function unauthorizedError(message) {
    console.error(message);
    return new GraphQLError(message, {
        extensions: { code: 'UNAUTHORIZED' },
    });
}