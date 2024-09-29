import { Interaction, InteractionObject } from '../dsl/interaction';
import { PactOptions, PactOptionsComplete } from '../dsl/options';
import { MockService } from '../dsl/mockService';
/**
 * Creates a new {@link PactProvider}.
 * @memberof Pact
 * @name create
 * @param {PactOptions} opts
 * @return {@link PactProvider}
 */
export declare class Pact {
    static defaults: PactOptions;
    static createOptionsWithDefaults(opts: PactOptions): PactOptionsComplete;
    mockService: MockService;
    opts: PactOptionsComplete;
    private mockServerStartedPort?;
    private pact;
    private interaction;
    private finalized;
    constructor(config: PactOptions);
    /**
     * Setup the pact framework, including allocating a port for the dynamic
     * mock server
     *
     * @returns {Promise}
     */
    setup(): Promise<PactOptionsComplete>;
    /**
     * Add an interaction to the {@link MockService}.
     * @memberof PactProvider
     * @instance
     * @param {Interaction} interactionObj
     * @returns {Promise}
     */
    addInteraction(interactionObj: InteractionObject | Interaction): Promise<string>;
    /**
     * Checks with the Mock Service if the expected interactions have been exercised.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    verify(): Promise<string>;
    /**
     * Writes the Pact and clears any interactions left behind and shutdown the
     * mock server
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    finalize(): Promise<void>;
    /**
     * Writes the pact file out to file. Should be called when all tests have been performed for a
     * given Consumer <-> Provider pair. It will write out the Pact to the
     * configured file.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    writePact(): Promise<string>;
    /**
     * Clear up any interactions in the Provider Mock Server.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    removeInteractions(): Promise<string>;
    private startMockServer;
    private reset;
}
