
# Installment Sale

This is a smart legal clause that conforms to the [Accord Protocol Template Specification](https://docs.google.com/document/d/1UacA_r2KGcBA2D4voDgGE8jqid-Uh4Dt09AE-shBKR0), the protocol is managed by the open-source community of the [Accord Project](https://accordproject.org). The clause can be parsed and executed by the [Cicero](https://github.com/accordproject/cicero) engine.

## Description
> This is a clause for a simple installment sale.

This clause contains:
- *Some sample Clause Text* - [sample.txt](sample.txt)
- *A template* - [grammar/template.tem](grammar/template.tem)
- *A data model* - [models/model.cto](models/model.cto)
- *Contact logic* (in JavaScript) - [logic/logic.js](lib/logic.js)

## Running this clause

### On your own machine

1. [Download the Cicero template library](https://github.com/accordproject/installment-sale/archive/master.zip)

2. Unzip the library with your favourite tool

3. Then from the command-line, change the current directory to the folder containing this README.md file.
```
cd installment-sale
```
4. With the [Cicero command-line tool](https://github.com/accordproject/cicero#installation):
```
cicero execute --template ./ --sample ./sample.txt --request ./request.json --state./state.json
11:21:39 - info: Logging initialized. 2018-05-08T15:21:39.670Z
bash-3.2$ cicero execute --template ./ --sample ./sample.txt --request ./request.json --state ./state.json
11:24:03 - info: Logging initialized. 2018-05-08T15:24:03.859Z
11:24:04 - info: {"clause":"installment-sale@0.0.3-0a9db97c3ffc9b2e5e0ac30a3abf957f56de16d3cc5d273c19f40041925b1983","request":{"$class":"org.accordproject.installmentsale.Installment","amount":2500},"response":{"$class":"org.accordproject.installmentsale.Balance","balance":7612.499999999999,"total_paid":2500,"transactionId":"4c2c8861-6557-46e9-840e-b0e39e410e49","timestamp":"2018-05-08T15:24:04.434Z"},"state":{"status":"WaitingForFirstDayOfNextMonth","balance_remaining":7612.499999999999,"total_paid":2500,"next_payment_month":4},"emit":[]}
```
> Note, all of the command-line flags (like `--template`) are optional.

Alternatively you can use the simpler command below if you want to use all of the default files.
```
cicero execute
```

You should see the following output in your terminal:
```bash
mattmbp:installment-sale matt$ cicero execute
```

### Sample Payload Data


Request, as in [data.json](https://github.com/accordproject/cicero-template-library/blob/master/installment-sale/data.json)
```json
{
    "$class": "org.accordproject.installmentsale.Installment",
    "amount": 2500.00
}
```

For the request above, you should see the following response:
```json
{
  "$class": "org.accordproject.installmentsale.Balance",
  "balance": 7612.499999999999,
  "total_paid": 2500,
  "transactionId": "4c2c8861-6557-46e9-840e-b0e39e410e49",
  "timestamp": "2018-05-08T15:24:04.434Z"
}
```


## Testing this clause

This clause comes with an automated test that ensures that it executes correctly under different conditions. To test the clause, complete the following steps.

You need npm and node to test a clause. You can download both from [here](https://nodejs.org/).

> This clause was tested with Node v8.9.3 and NPM v5.6.0

From the `installment-sale` directory.

1. Install all of the dependencies.
```
npm install
```

2. Run the tests
```
npm test
```
If successful, you should see the following output
```
mattmbp:installment-sale matt$ npm test

> installment-sale@0.0.3 test /Users/matt/dev/accordproject/cicero-template-library/installment-sale
> mocha

21:57:31 - info: Logging initialized. 2018-02-17T21:57:31.074Z


  Logic
    #InspectDeliverable
      ✓ passed inspection within time limit
      ✓ failed inspection within time limit
      ✓ inspection outside time limit
      ✓ inspection before delivable should throw


  4 passing (458ms)

```