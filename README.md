# Getting Started with project

1. Run command npm install in root directory for server
3. Copy .env.example to .env and add your MONGO_URL
4. Run command npm run serve in root directory for node server
5. Get all products api

    method: GET
    url: /api/products
    
5. Add new product api

    method: POST
    url: /api/product
    data: {
        "name"            : "product name",
        "description"     : "description",
        "price"           : "200",
        "variants": [
            {
                "name": "variant name",
                "sku": "136",
                "additional_cost": 10,
                "stock_count": 5
            }
        ]
    }

7. Update product api

    method: PUT
    url: /api/product/:productId
    data: {
        "name"            : "product new name",
        "description"     : "description new",
        "price"           : "200",
        "variants": [
            {
                "name": "variant name",
                "sku": "136",
                "additional_cost": 10,
                "stock_count": 5
            }
        ]
    }

5. Delete product api

    method: DELETE
    url: /api/product/:productId
    
6. Add product variant api

    method: POST
    url: /api/products/:productId/variants
    data: {
        "name": "variant name",
        "sku": "136",
        "additional_cost": 10,
        "stock_count": 5
    }

7. Update product variant api

    method: PUT
    url: /api/products/:productId/variants/:variantId
    data: {
        "name": "variant name",
        "sku": "136",
        "additional_cost": 10,
        "stock_count": 5
    }

8. Delete product variant api

    method: DELETE
    url: /api/products/:productId/variants/:variantId


9. Search product api

    method: GET
    url: /api/products/search?text=des
    query: text="text"