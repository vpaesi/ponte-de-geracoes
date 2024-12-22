// cria métodos GET, POST, PUT e DELETE para a entidade User, além de métodos para upload de imagem e listagem de usuários.

package com.group9.ponte_de_geracoes.controller;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.model.User;
import com.group9.ponte_de_geracoes.service.UserService;
import com.group9.ponte_de_geracoes.util.SwaggerJsonExamplesUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/user")
@Tag(name = "User API", description = "Gerencia o objeto User dentro do sistema")
public class UserController {

    @Autowired
    private UserService userService;

    private URI createNewURIById(User user) {
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user.getId())
                .toUri();
    }

    @Operation(
        summary = "Lista de users cadastrados",
        description = "Retorna uma página de usuários cadastrados no sistema.",
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
                schema = @Schema(type = "integer", defaultValue = "10")
            ),
            @Parameter(
                name = "sort",
                description = "Ordenação no formato `campo,asc` ou `campo,desc`.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "string", example = "name,id")
            ),
            @Parameter(
                name = "city",
                description = "Filtro por cidade.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "string", example = "Porto Alegre")
            ),
            @Parameter(
                name = "day",
                description = "Filtro por dia da semana.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "string", example = "Segunda-Feira")
            )
        },
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Useários retornados com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    examples = {
                        @ExampleObject(
                            summary = "Lista populada",
                            name = "Exemplo de resposta com usuários cadastrados",
                            value = SwaggerJsonExamplesUtil.USERS_PAGE_POPULATED_LIST_EXAMPLE
                        ),
                        @ExampleObject(
                            summary = "Lista vazia",
                            name = "Exemplo de resposta sem usuários cadastrados",
                            value = SwaggerJsonExamplesUtil.USERS_PAGE_EMPTY_LIST_EXAMPLE
                        )
                    }
                )
            )
        }
    )
    @GetMapping
    public ResponseEntity<Page<User>> getUsers(@Parameter(hidden = true)
            @PageableDefault(size = 10, sort = {"id"}) Pageable pageable,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String day
    ) {
        Page<User> page = userService.getUsers(isAvailable, city, day, pageable);
        
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        throw new EntityNotFoundException("Usuário não encontrado", List.of("O usuários informado não foi encontrado."));
    }

    @Operation(
        summary = "Insere um novo user",
        description = "Adiciona um novo usuários ao sistema.",
        responses = {
            @ApiResponse(
                responseCode = "201",
                description = "Usuário inserido com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = User.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Erro ao inserir usuário",
                content = @Content
            )
        }
    )
    @PostMapping
    public ResponseEntity<User> insertNewUser(@RequestBody User user) {     
        User insertedUser = userService.insertNewUser(user);
        URI locator = createNewURIById(insertedUser);

        return ResponseEntity.created(locator).body(insertedUser);
    }

    @Operation(
        summary = "Faz upload de imagem para um usuário",
        description = "Permite o upload de uma imagem associada ao usuário.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Imagem carregada e salva com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = String.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Erro no upload da imagem",
                content = @Content
            )
        }
    )
    @PostMapping("/upload-image/{userId}")
    public ResponseEntity<?> uploadImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        String fileUrl = userService.uploadImage(userId, file);

        return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
    }

    @Operation(
        summary = "Atualiza um usuário",
        description = "Atualiza as informações de um usuário existente.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Usuário atualizado com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = User.class)
                )
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Usuário não encontrado",
                content = @Content
            )
        }
    )
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Validated @RequestBody User requestUser) {
        User updatedUser = userService.updateUser(id, requestUser);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
        summary = "Deleta um usuário",
        description = "Remove um usuário do sistema.",
        responses = {
            @ApiResponse(
                responseCode = "204",
                description = "Usuário deletado com sucesso",
                content = @Content
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Usuário não encontrado",
                content = @Content
            )
        }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
