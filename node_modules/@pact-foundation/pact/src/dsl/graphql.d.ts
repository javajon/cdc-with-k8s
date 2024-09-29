import { Interaction, InteractionStateComplete } from './interaction';
export interface GraphQLVariables {
    [name: string]: unknown;
}
/**
 * GraphQL interface
 */
export declare class GraphQLInteraction extends Interaction {
    protected operation?: string | null;
    protected variables?: GraphQLVariables;
    protected query: string;
    /**
     * The type of GraphQL operation. Generally not required.
     */
    withOperation(operation: string | null): this;
    /**
     * Any variables used in the Query
     */
    withVariables(variables: GraphQLVariables): this;
    /**
     * The actual GraphQL query as a string.
     *
     * NOTE: spaces are not important, Pact will auto-generate a space-insensitive matcher
     *
     *  e.g. the value for the "query" field in the GraphQL HTTP payload:
     *  '{ "query": "{
     *        Category(id:7) {
     *          id,
     *          name,
     *          subcategories {
     *            id,
     *            name
     *          }
     *        }
     *     }"
     *  }'
     */
    withQuery(query: string): this;
    /**
     * The actual GraphQL mutation as a string.
     *
     * NOTE: spaces are not important, Pact will auto-generate a space-insensitive matcher
     *
     * e.g. the value for the "query" field in the GraphQL HTTP payload:
     *
     * mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
     *   createReview(episode: $ep, review: $review) {
     *     stars
     *     commentary
     *   }
     * }
     */
    withMutation(mutation: string): this;
    /**
     * Returns the interaction object created.
     */
    json(): InteractionStateComplete;
    private queryOrMutation;
}
