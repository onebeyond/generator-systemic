const { spy } = require('sinon');
const mockFunctions = require('require-all')({ dirname: join(process.cwd(), 'test', 'mocks', 'components') });

let mocks;
let metricsSpy;

describe('Sample unit tests', ()=>{
    beforeEach(async ()=> {
        mocks = {
            config: mockFunctions.config(),
            logger: mockFunctions.logger(),
            metrics: mockFunctions.metrics(),
        };
        metricsSpy = spy(mocks.metrics, 'trackMetric');
    });
    afterEach(()=>{
		metricsSpy.restore();
    });
    it('Sample case', ()=>{
        //Do stuff here with mocks
    });
});