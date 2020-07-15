const { Pact } = require('@pact-foundation/pact');
const { like, eachLike } = require('@pact-foundation/pact').Matchers;
const { fetchCountries } = require('./consumer');
const path = require('path');

const MOCK_URL = 'http://localhost';
const MOCK_PORT = 4000;

const provider = new Pact({
  consumer: 'Consumer B',
  provider: 'Aggregator',
  port: MOCK_PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'INFO',
});

  describe('Countries with highest infections per capita', () => {
    describe('When a request an order list of countries with highest infections per capita.', () => {
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
                  code: like("IND"),
                  name: like('India'),
                  population: like(1353200000),
                  percentCases: like(0.33000000),
                },
                { min: 3 }
              ),
            },
          });
        })
      );

    test('countries list ordered by percentCases', async () => {
      const response = await fetchCountries(MOCK_URL, MOCK_PORT);
      expect(response[0].code).toBe('IND');
      expect(response[0].name).toBe('India');
      expect(response[0].population).toBe(1353200000);
      expect(response[0].percentCases).toBe(0.33000000);

    });

    afterEach(() => provider.verify());
    afterAll(() => provider.finalize());
  });
});
