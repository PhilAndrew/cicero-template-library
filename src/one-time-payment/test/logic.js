/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Template = require('@accordproject/cicero-core').Template;
const Clause = require('@accordproject/cicero-core').Clause;
const Engine = require('@accordproject/cicero-engine').Engine;

const fs = require('fs');
const path = require('path');
const chai = require('chai');
chai.should();
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
const moment = require('moment');

describe('Logic', () => {

    const rootDir = path.resolve(__dirname, '..');
    const clauseText = fs.readFileSync(path.resolve(rootDir, 'sample.txt'), 'utf8');

    let template;
    let clause;
    let engine;    
    let state = {};
    state.$class = 'org.accordproject.cicero.contract.AccordContractState';
    state.stateId = 'org.accordproject.cicero.contract.AccordContractState#1';

    beforeEach( async function() {
        template = await Template.fromDirectory(rootDir);
        clause = new Clause(template);
        clause.parse(clauseText);
        engine = new Engine();    
    });
    
    describe('#OneTimePayment', async function() {

        it('should produce correct payment in USD', async function() {
            const request = {};
            request.$class = 'org.accordproject.cicero.runtime.Request';

            const result = await engine.execute(clause, request, state);
            result.should.not.be.null;
            result.emit[0].$class.should.equal('org.accordproject.cicero.runtime.PaymentObligation');
            result.emit[0].amount.doubleValue.should.equal(0.01);
            result.emit[0].amount.currencyCode.should.equal("USD");
            state = result.state;
            state.status.should.equal("OBLIGATION_EMITTED");
        });

        it('should complete once the payment is acknowledged', async function() {
            const request = {};
            request.$class = 'org.accordproject.payment.onetime.PaymentReceivedRequest';

            const result = await engine.execute(clause, request, state);
            result.should.not.be.null;
            result.state.status.should.equal("COMPLETED")
        });
    });
});
