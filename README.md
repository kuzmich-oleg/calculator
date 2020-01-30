# kuzmich-oleg.github.io/calculator/
Simple calculator to use in everyday life
# Tourist guide
The description of the preferred approach of API usage


### Phone verification
Creation of the phone verification token is required to create an access token

To create a verification token, you should send `POST` request using endpoint and data transfer model mentioned below

`POST api/v1/phone-verification-tokens`

method request model (PhoneVerificationTokenDto)
```
{
	"phone": "+380458648798"
}
```

method errors:

400 - Phone field is empty; (The whole model or appropriative field is empty)

method response model:
```
{
    "id": "41bffd26-7ecb-4e8e-28cb-08d7a5895b01",
    "phone": "+380458648798",
    "code": ""
}
```

Field `id` should be stored locally to use it later for the token creation

Field `code` is empty cause it's already sent to the specified phone number


### Token creation
To create a token, you should send `POST` request using the next endpoint

`POST api/v1/tokens`

method request model (PhoneVerificationTokenDto)
```
{
    "id": "41bffd26-7ecb-4e8e-28cb-08d7a5895b01",
    "phone": "+380458648798",
    "code": "1234" 
}
```

method errors:

404 - Phone token isn't found; (There is no phone verification token in the database with the specified token id)

403 - Phone token is already used or wrong code specified (Phone token was created for another phone number or is already used. Token can be used only once)

method response model:
```
{
    "code": "eyJhbGciOiJIUzI4NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.sqPXqvTxeori52YuCMpsP1W0HPcuzYpyiW9jjfU1gxM",
    "user": {
        "id": 1,
        "phone": "+380458648798"
    }
}
```

`Code` field should be stored locally and transefered as header with other methods (if authorization is obligatory)

### Transaction creation
The main purpose of the `transaction` entity is an identification of user and tour when purchase callback request is handling

To create a transaction, you should send `POST` request using the next endpoint

`POST api/v1/transactions`

method request model (TransactionDto)
```
{
	"externalTourId": 1
}
```

method errors:

401 - Invalid token (Unauthorized)

400 - Invalid data (The model is empty)

404 - Tour isn't found (There is no tour with the specified externalTourId)

403 - The tour is already purchased (You can't buy the same tour more than once)

method response model:
```
{
    "id": "e16382c3-9875-4e9f-8564-08d7a58ff393",
    "userId": 1,
    "externalTourId": 0, //default value
    "tourId": 2 //inner id
}
```

Field `id` should be passed as parameter `merchant_data` through Fondy SDK

### Tour content
To fetch a tour content you should send `GET` request using the following endpoint

`GET api/v1/tours/{id}/content`

method errors:

401 - Invalid token (Unauthorized)

404 - Tour isn't found (There is no tour with the specified externalTourId)

403 - You have not enough permissions to get tour content (You can fetch the content of only already purchased tours)

400 - Invalid filename (The filesystem doesn't contain any file with the specified name)


method response

stream - application/octet-stream
