const { Pact } = require('@pact-foundation/pact');
const { like, eachLike } = require('@pact-foundation/pact').Matchers;
const { fetchCountries } = require('./consumer');
const path = require('path');

const MOCK_URL = 'http://localhost';
const MOCK_PORT = 4000;

const provider = new Pact({
  consumer: 'Consumer A',
  provider: 'Aggregator',
  port: MOCK_PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'INFO',
});

describe('Country Service', () => {
  describe('When a request to list all countries is made', () => {
    beforeAll(() =>
      provider.setup().then(() => {
        provider.addInteraction({
          uponReceiving: 'a request to list all countries',
          withRequest: {
            method: 'GET',
            path: '/countries',
          },
          willRespondWith: {
            status: 200,
            body: eachLike(
              {
                code: like("AFG"),
                name: like('Afganistan'),
                population: like(22720000),
              },
              { min: 3 }
            ),
          },
        });
      })
    );

    test('should return the correct population', async () => {
      const response = await fetchCountries(MOCK_URL, MOCK_PORT);
      expect(response[0].code).toBe('AFG');
      expect(response[0].name).toBe('Afganistan');
      expect(response[0].population).toBe(22720000);
    });

    afterEach(() => provider.verify());
    afterAll(() => provider.finalize());
  });
});
