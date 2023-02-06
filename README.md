# gerald-code-challenge

Determine the user’s insurance needs by asking them personal & risk-related questions and gathering information about their vehicle and house. Using that data, we will determine the user's risk profile for each line of insurance  (life, disability, home & auto) and then suggest an insurance plan ("economic", "regular", "responsible") corresponding to their risk profile.

The endpoint should be deployed via AWS API Gateway using JSON Schema. Requests should supply `x-auth-key` in header. All request validation is performed against openapi.json schema. No value and bounds checks are performed in code to avoid redundancy.

## install
```sh
npm install
```

## running tests
```sh
npm run test
```

