// Cria métodos GET, POST, PUT e DELETE para manipular objetos de endereço no sistema.

package com.group9.ponte_de_geracoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group9.ponte_de_geracoes.service.AddressService;
import com.group9.ponte_de_geracoes.util.SwaggerJsonExamplesUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/addresses")
@Tag(name = "Adress API", description = "Gerencia o objeto de Adress dentro do sistema")
public class AddressController {

    @Autowired
    private AddressService addressService;
    
    @Operation(
        summary = "Lista de cidades cadastradas",
        description = "Retorna uma página de cidades cadastradas sem repetições no sistema.",
        parameters = {
            @Parameter(
                name = "page",
                description = "Número da página.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "integer", defaultValue = "0")
            ),
            @Parameter(
                name = "size",
                description = "Quantidade de itens por página.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "integer", defaultValue = "20")
            ),
            @Parameter(
                name = "sort",
                description = "Ordenação no formato `campo,asc` ou `campo,desc`.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "string", example = "name,id")
            )
        },
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Cidades retornadas com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    examples = {
                        @ExampleObject(
                            summary = "Lista populada",
                            name = "Exemplo de resposta com cidades cadastradas",
                            value = SwaggerJsonExamplesUtil.ADRESSES_CITIES_PAGE_POPULATED_LIST_EXAMPLE
                        ),
                        @ExampleObject(
                            summary = "Lista vazia",
                            name = "Exemplo de resposta sem cidades cadastradas",
                            value = SwaggerJsonExamplesUtil.ADRESSES_CITIES_PAGE_EMPTY_LIST_EXAMPLE
                        )
                    }
                )
            )
        }
    )

    @GetMapping("/cities")
    public ResponseEntity<Page<String>> getCities(@Parameter(hidden = true) Pageable pageable) {
        Page<String> cities = addressService.getAllDistinctedCities(pageable);
        return ResponseEntity.ok(cities);
    }

}
