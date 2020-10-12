### REST API to retrieve insights about a customer’s transactions

**Stack:** Node.js, Express, Typescript, Jest



**INSTALL**
`npm run install`

**RUN:** 
`npm run start`

**TEST:** 
`npm run test`


EXPOSED ENDPOINT: 

`http://localhost:3000/api/insights/:customerId`

For the sake of the exercise I've preferred to use a fake database where we have only those 3 customer ids 
and randomly generated transactions. 

You can use as `:customerId`: `customerID1` or `customerID2` or `customerID3`

Example:
`GET http://localhost:3000/api/insights/customerID1`

Example Response: 

```
[
   {
     "type": "incomeAndOutgoings",
     "message": "You've spent 222.01 £ in total this month!"
   },
   {
     "type": "incomeAndOutgoings",
     "message": "You've earned 498.35 £ in total this month!"
   },
   {
     "type": "spendByCategory",
     "message": "You've spent 0.00 £ at bills this month"
   },
   {
     "type": "spendByCategory",
     "message": "You've spent 222.01 £ at entertainment this month"
   },
   {
     "type": "spendingComparison",
     "message": "You've spent 94.27% less the previous month!"
   }
 ]
 
 Response code: 200 (OK); Time: 43ms; Content length: 427 bytes

```


You can also filter by using the query param `insights` 

Example:
`GET http://localhost:3000/api/insights/customerID1?insights=spendByCategory,spendingComparison`

Available Insights are:

`incomeAndOutgoings` 

`spendingComparison` 

`spendByCategory`


###Next
- Add Auth
- Add Rate limiter
- Add more Insights








