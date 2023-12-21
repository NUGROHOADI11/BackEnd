# API Docs

- endpoint : https://backend-dot-capstone-project-necosu.et.r.appspot.com

# User 

## Register User

Endpoint : POST /user/register

Req Body:
```json
{
    "username" : "huhu123 (permanent and must be unique)",
    "email" : "huhu (permanent and must be unique)",
    "password" : "top secret",
}
```
Res Body Success:
```json
{
    "message": "Create user successful",
    "data": {
        "id": 2,
        "username": "Angeliya",
        "email": "angeliya@gmail.com"
    }
}
```

Res Body Error:
```json
{
    "errors" : "Validation error" 
}
```

## Login User

Endpoint : POST /user/login

Req Body:
```json
{
    "username" : "huhu",
    "password" : "top secret"
}
```

Res Body Success:
```json
{
    "data" : {
        "id": 2,
        "username" : "huhu",
        "email" : "email@huhu",
        "token" : "unique-token"
    },
}
```
Res Body Error:
```json
{
    "errors" : "invalid user or password" 
}
```

## Update User

Endpoint : PATCH /user/:userId

Header:
- Authorization : (token)

Req Body:
```json
{
    "uploadimage" : "image (file)",
    "FullName" : "huhu",
    "Address" : "jl. jauh",
    "Phone" : "1234567890"
}
```
Res Body Success:
```json
{
    "success" : "true",
    "message" : "user updated successfully",
    "data" : {
        "id": "1",
        "username" : "huhu",
        "name" : "new huhu123"
        "..."
    }
}
```
Res Body Error:
```json
{
    "errors" : "name max 255 char" 
}
```

## Get User By Id 

Endpoint : GET /user/:userId

Header:
- Authorization : token

Res Body Success:
```json
{
    "success": true,
    "data": {
        "id": 2,
        "username": "Angeliya",
        "email": "angeliya@gmail.com",
        "FullName": null,
        "Address": null,
        "Phone": null,
        "Image": null
    }
}
```
Res Body Error:
```json
{
    "errors" : "Unauthorized: Token Missing" 
}
```

## Logout User

Endpoint : DELETE /user/:userId/logout

Header:
- Authorization : token

Res Body Success:
```json
{
    "message" : "Logout successful"
}
```
Res Body Error:
```json
{
    "errors" : "Unauthorized" 
}
```
# Product 

## Create 

Endpoint : POST /product

Header:
- Authorization : token

Req Body:
```json
{
    "productName" : "huhu",
    "description" : "huhu",
    "price" : 1000000,
    "stockQuantity" : 2,
    "RenterUserId" : 2,
    "uploadimage" : "(file)",
}
```
Res Body Success:
```json
{
   "success": true,
    "message": "Product created successfully",
    "data": {
        "productName" : "huhu",
        "description" : "huhu",
        "price" : 1000000,
        "stockQuantity" : 2,
        "RenterUserId" : 2,
        "uploadimage" : "(path_file)",
    }
}
```

Res Body Error:
```json
{
    "errors" : "Unauthorized" 
}
```

## Update 

Endpoint : PATCH /product/:productId

Header:
- Authorization : token

Req Body:
```json
{
    "productName" : "huhu",
    "description" : "huhu",
    "price" : 1000000,
    "stockQuantity" : 2
}
```
Res Body Success:
```json
{
   "success": true,
    "message": "Product created successfully",
    "data": {
        "productName" : "huhu",
        "description" : "huhu",
        "price" : 1000000,
        "stockQuantity" : 2,
        "RenterUserId" : 2,
        "uploadimage" : "(path_file)",
    }
}
```

Res Body Error:
```json
{
    "errors" : "Unauthorized" 
}
```
## Get Product By UserId 

Endpoint : GET /product/user/:userId

Header:
- Authorization : token

Res Body Success:
```json
{
    "success": true,
    "data": {
        "productName" : "huhu",
        "description" : "huhu",
        "price" : 1000000,
        "stockQuantity" : 2,
        "RenterUserId" : 2,
        "uploadimage" : "(path_file)",
    }
}
```
Res Body Error:
```json
{
    "errors" : "User Id Not found" 
}
```
## Get Product By Id 

Endpoint : GET /product/:productId

Header:
- Authorization : token

Res Body Success:
```json
{
    "success": true,
    "data": {
        "productName" : "huhu",
        "description" : "huhu",
        "price" : 1000000,
        "stockQuantity" : 2,
        "RenterUserId" : 2,
        "uploadimage" : "(path_file)",
    }
}
```
Res Body Error:
```json
{
    "errors" : "Id Not found" 
}
```

## Search Product

Endpoint : GET /product/search

Header:
- Authorization : token

Req Query : 
```json
{
    "keyword" : "huhu",
}
```

Res Body Success:
```json
{
    "success": true,
    "data": {
        "productName" : "huhu",
        "description" : "huhu",
        "price" : 1000000,
        "stockQuantity" : 2,
        "RenterUserId" : 2,
        "uploadimage" : "(path_file)",
    }
}
```
Res Body Error:
```json
{
    "errors" : "Product Not found" 
}
```
## Delete Product By Id 

Endpoint : DELETE /product/:productId

Header:
- Authorization : token

Res Body Success:
```json
{
    "message": "Product deleted successfully" 
}
```
Res Body Error:
```json
{
    "errors" : "Id Not found" 
}
```

# Order

## Get Order by Id

Endpoint : GET /order/:orderId

Header:
- Authorization : token

Res Body Success:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "OrderDate": "2023-11-10",
        "ShippingAddress": "Jl. Apel",
        "Phone": "080987654321",
        "TotalCost": "190.00",
        "Status": "processed",
        "CustomerId": 2,
        "RenterId": 1,
        "Customer": {
            "id": 2,
            "username": "Angeliya",
            "email": "angeliya@gmail.com",
            "password": "$2b$10$EHCVt57SPxTAHy6fKlRxhOQ7xQ0zdwhsI7YMXfb6dgzkMNGeiWTXO",
            "FullName": null,
            "Address": null,
            "Phone": null,
            "ProfilePhotoURL": null,
            "Token": "90c4e89e-e049-48e7-b2df-adcfb0c77f55"
        },
        "Renter": {
            "id": 1,
            "username": "Angelcos",
            "email": "angelcos.rent@gmail.com",
            "password": "$2b$10$/j3bhojGEwxJ7AgWoySKyuMMRcMCJsn.7S8toMyxBkKmvi/5kZNTu",
            "FullName": "Angelcos Rent",
            "Address": "Jl. Pisang Kipas",
            "Phone": "081234567890",
            "ProfilePhotoURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:01:31_AM",
            "Token": "e7e30a46-e0ca-46bb-906e-e8d282caaadc"
        },
        "OrderItems": [
            {
                "id": 1,
                "Quantity": 1,
                "ProductId": 1,
                "OrderId": 1,
                "Product": {
                    "id": 1,
                    "ProductName": "Kostum Ayaka",
                    "Description": "Baju Ayaka lengkap dengan katana dan kipas",
                    "Price": "110000.00",
                    "StockQuantity": 3,
                    "RenterUserId": 1,
                    "ProductImageURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:13:23_AM"
                }
            },
            {
                "id": 2,
                "Quantity": 1,
                "ProductId": 2,
                "OrderId": 1,
                "Product": {
                    "id": 2,
                    "ProductName": "Kostum Ayaka",
                    "Description": "Baju Ayaka lengkap tanpa katana",
                    "Price": "80000.00",
                    "StockQuantity": 4,
                    "RenterUserId": 1,
                    "ProductImageURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:19:03_AM"
                }
            }
        ]
    }
}
```
Res Body Error:
```json
{
    "errors" : "Id Not found" 
}
```

## Get order by status

Endpoint : GET order/status/:status

Header:
- Authorization : token

Res Body Success:

```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "OrderDate": "2023-11-10",
            "ShippingAddress": "Jl. Apel",
            "Phone": "080987654321",
            "TotalCost": "190.00",
            "Status": "processed",
            "CustomerId": 2,
            "RenterId": 1
        }
    ]
}

```

Res Body Error:
```json
{
    "errors" : "order Not found" 
}
```

## Create order

Endpoint : POST /order

Req Body:
```json
{
  "orderDate": "2023-11-10",
  "shippingAddress": "Jl. Apel",
  "phone": "080987654321",
  "totalCost": 190.000,
  "status": "shipped",
  "customerId": 2, 
  "renterId": 1,   
  "orderItems": [
    {
      "productId": 1,  
      "quantity": 1
    },
    {
      "productId": 2,  
      "quantity": 1
    }
  ]
}
```
Res Body Success:
```json
{
    "success": true,
    "data": {
        "id": 1,
        "OrderDate": "2023-11-10",
        "ShippingAddress": "Jl. Apel",
        "Phone": "080987654321",
        "TotalCost": "190.00",
        "Status": "processed",
        "CustomerId": 2,
        "RenterId": 1,
        "Customer": {
            "id": 2,
            "username": "Angeliya",
            "email": "angeliya@gmail.com",
            "password": "$2b$10$EHCVt57SPxTAHy6fKlRxhOQ7xQ0zdwhsI7YMXfb6dgzkMNGeiWTXO",
            "FullName": null,
            "Address": null,
            "Phone": null,
            "ProfilePhotoURL": null,
            "Token": "90c4e89e-e049-48e7-b2df-adcfb0c77f55"
        },
        "Renter": {
            "id": 1,
            "username": "Angelcos",
            "email": "angelcos.rent@gmail.com",
            "password": "$2b$10$/j3bhojGEwxJ7AgWoySKyuMMRcMCJsn.7S8toMyxBkKmvi/5kZNTu",
            "FullName": "Angelcos Rent",
            "Address": "Jl. Pisang Kipas",
            "Phone": "081234567890",
            "ProfilePhotoURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:01:31_AM",
            "Token": "e7e30a46-e0ca-46bb-906e-e8d282caaadc"
        },
        "OrderItems": [
            {
                "id": 1,
                "Quantity": 1,
                "ProductId": 1,
                "OrderId": 1,
                "Product": {
                    "id": 1,
                    "ProductName": "Kostum Ayaka",
                    "Description": "Baju Ayaka lengkap dengan katana dan kipas",
                    "Price": "110000.00",
                    "StockQuantity": 3,
                    "RenterUserId": 1,
                    "ProductImageURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:13:23_AM"
                }
            },
            {
                "id": 2,
                "Quantity": 1,
                "ProductId": 2,
                "OrderId": 1,
                "Product": {
                    "id": 2,
                    "ProductName": "Kostum Ayaka",
                    "Description": "Baju Ayaka lengkap tanpa katana",
                    "Price": "80000.00",
                    "StockQuantity": 4,
                    "RenterUserId": 1,
                    "ProductImageURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:19:03_AM"
                }
            }
        ]
    }
}
```

Res Body Error:
```json
{
    "errors" : "Renter not found" 
}
```

## Update Status Order

Endpoint : PATCH /order/:orderId

Header:
- Authorization : token

Req Body:
```json
{
    "status" : "processed"
}
```
Res Body Success:
```json
{
    "success": true,
    "message": "Order updated successfully",
    "data": {
        "id": 1,
        "OrderDate": "2023-11-10",
        "ShippingAddress": "Jl. Apel",
        "Phone": "080987654321",
        "TotalCost": "190.00",
        "Status": "processed",
        "CustomerId": 2,
        "RenterId": 1,
        "Customer": {
            "id": 2,
            "username": "Angeliya",
            "email": "angeliya@gmail.com",
            "password": "$2b$10$EHCVt57SPxTAHy6fKlRxhOQ7xQ0zdwhsI7YMXfb6dgzkMNGeiWTXO",
            "FullName": null,
            "Address": null,
            "Phone": null,
            "ProfilePhotoURL": null,
            "Token": "90c4e89e-e049-48e7-b2df-adcfb0c77f55"
        },
        "Renter": {
            "id": 1,
            "username": "Angelcos",
            "email": "angelcos.rent@gmail.com",
            "password": "$2b$10$/j3bhojGEwxJ7AgWoySKyuMMRcMCJsn.7S8toMyxBkKmvi/5kZNTu",
            "FullName": "Angelcos Rent",
            "Address": "Jl. Pisang Kipas",
            "Phone": "081234567890",
            "ProfilePhotoURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:01:31_AM",
            "Token": "e7e30a46-e0ca-46bb-906e-e8d282caaadc"
        },
        "OrderItems": [
            {
                "id": 1,
                "Quantity": 1,
                "ProductId": 1,
                "OrderId": 1,
                "Product": {
                    "id": 1,
                    "ProductName": "Kostum Ayaka",
                    "Description": "Baju Ayaka lengkap dengan katana dan kipas",
                    "Price": "110000.00",
                    "StockQuantity": 3,
                    "RenterUserId": 1,
                    "ProductImageURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:13:23_AM"
                }
            },
            {
                "id": 2,
                "Quantity": 1,
                "ProductId": 2,
                "OrderId": 1,
                "Product": {
                    "id": 2,
                    "ProductName": "Kostum Ayaka",
                    "Description": "Baju Ayaka lengkap tanpa katana",
                    "Price": "80000.00",
                    "StockQuantity": 4,
                    "RenterUserId": 1,
                    "ProductImageURL": "https://storage.googleapis.com/bucket-project-necosu/12_16_2023_07:19:03_AM"
                }
            }
        ]
    }
}
```

Res Body Error:
```json
{
    "errors" : "Unauthorized" 
}
```

## Delete order by Id

Endpoint : DELETE /order/:orderId

Header:
- Authorization : token

Res Body Success:
```json
{
    "message": "order deleted successfully" 
}
```
Res Body Error:
```json
{
    "errors" : "Id Not found" 
}
```

# Favorite

## Get Favorite by UserId

Endpoint : GET /favorite/:favoriteId

Header:
- Authorization : token

Res Body Success:
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "UserId": 2,
            "ProductId": 1
        }
    ]
}
```
Res Body Error:
```json
{
    "errors" : "Id Not found" 
}
```
## Create Favorite 

Endpoint : POST /favorite

Header:
- Authorization : token

Req Body:
```json
{
  "userId": 2,
  "productId": 1
}
```

Res Body Success:
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "UserId": 2,
            "ProductId": 1
        }
    ]
}
```
Res Body Error:
```json
{
    "errors" : "Id Not found" 
}
```

## Delete Favorite

Endpoint : DELETE /favorite/:favoriteId

Header:
- Authorization : token

Res Body Success:
```json
{
    "message": "favorite deleted successfully" 
}
```
Res Body Error:
```json
{
    "errors" : "Id Not found" 
}
```