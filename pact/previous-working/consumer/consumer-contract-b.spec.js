const { Pact } = require('@pact-foundation/pact');
const { like, eachLike, term } = require('@pact-foundation/pact').Matchers;
const { fetchHighestPerCapita } = require('./consumer');
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
              path: '/countries/percapita',
            },
            willRespondWith: {
              status: 200,
              body: eachLike(
                {
                  code: like("IND"),
                  name: like('India'),
                  population: like(1353200000),
                  percentCases: term({ generate: "0.3333", matcher: "^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$" }),
                  // The regex is match roughly any integer or floating number greater than 0
                },
                { min: 3 }
              ),
            },
          });
        })
      );

    test('countries list ordered by percentCases', async () => {
      const response = await fetchHighestPerCapita(MOCK_URL, MOCK_PORT);
      expect(response[0].code).toBe('IND');
      expect(response[0].name).toBe('India');
      expect(response[0].population).toBe(1353200000);
      expect(Number(response[0].percentCases)).toBeGreaterThan(0.0);
    });

    afterEach(() => provider.verify());
    afterAll(() => provider.finalize());
  });
});
