package com.group9.ponte_de_geracoes.util;

public class SwaggerJsonExamplesUtil {

    public static final String ADRESSES_CITIES_PAGE_POPULATED_LIST_EXAMPLE = """
    {
        "content": [
            "Porto Alegre",
            "Alvorada",
            "Cachoeirinha"
        ],
        "page": {
            "size": 20,
            "number": 0,
            "totalElements": 3,
            "totalPages": 1
        }
    }
    """;

    public static final String ADRESSES_CITIES_PAGE_EMPTY_LIST_EXAMPLE = """
    {
        "content": [],
        "page": {
            "size": 20,
            "number": 0,
            "totalElements": 0,
            "totalPages": 0
        }
    }
    """;

    public static final String USERS_PAGE_POPULATED_LIST_EXAMPLE = """
    {
        "content": [
            {
                "id": 1,
                "name": "Demi Lovato",
                "profileImageUrl": "/uploads/upload-image.svg",
                "birthDate": "1992-08-20",
                "rg": "1234567890",
                "cpf": "123.456.789-10",
                "email": "demetria@example.com",
                "phone": "(51) 98765-4321",
                "password": "password123",
                "isAvailableOrNeedsHelp": "true",
                "helpDays": [
                    "Segunda, Quarta, Sexta"
                ],
                "skillsOrNeeds": "Adoro música e ensinar a tocar instrumentos.",
                "about": "Musicista e atriz com papéis principais em programas/filmes da Disney. Luto por um mundo melhor, sem preconceito e justo para todos."
                "address": {
                    "id": 1,
                    "zipCode": "01000-000",
                    "city": "São Paulo",
                    "neighborhood": "Sé";
                    "street": "Rua Exemplo",
                    "number": "123",
                    "complement": "Apt. 45"
                },
            }
        ],
        "page": {
            "size": 10,
            "number": 0,
            "totalElements": 1,
            "totalPages": 1
        }
    }
    """;

    public static final String USERS_PAGE_EMPTY_LIST_EXAMPLE = """
    {
        "content": [],
        "page": {
            "size": 10,
            "number": 0,
            "totalElements": 0,
            "totalPages": 0
        }
    }
    """;
}
