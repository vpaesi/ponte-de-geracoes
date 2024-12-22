package com.group9.ponte_de_geracoes.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.model.User;
import com.group9.ponte_de_geracoes.service.UserService;
import com.group9.ponte_de_geracoes.util.UserCreator;

class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

    MockHttpServletRequest mockRequest = new MockHttpServletRequest();
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));

        user = UserCreator.createUserToBeSaved();
    }

    @Test
    void testGetUsers() {
        List<User> users = new ArrayList<>();
        users.add(user);
        Page<User> userPage = new PageImpl<>(users);

        when(userService.getUsers(null, null, null, Pageable.unpaged())).thenReturn(userPage);

        ResponseEntity<Page<User>> response = userController.getUsers(Pageable.unpaged(), null, null, null);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        Page<User> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertFalse(responsePage.isEmpty());

        User createdUser = responsePage.getContent().get(0);
        assertEquals(user.getName(), createdUser.getName());
        assertEquals(user.getAddress().getCity(), createdUser.getAddress().getCity());

        verify(userService, times(1)).getUsers(null, null, null, Pageable.unpaged());
    }

    @Test
    void testGetUsersWithNoContent() {
        List<User> users = new ArrayList<>();
        Page<User> userPage = new PageImpl<>(users);

        when(userService.getUsers(null, null, null, Pageable.unpaged())).thenReturn(userPage);

        ResponseEntity<Page<User>> response = userController.getUsers(Pageable.unpaged(), null, null, null);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        Page<User> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertTrue(responsePage.isEmpty());

        verify(userService, times(1)).getUsers(null, null, null, Pageable.unpaged());
    }

    @Test
    void testGetUsersWithFilteredByCity() {
        List<User> users = UserCreator.createListOfUsersWithDifferentAddresses();

        Page<User> userPage = new PageImpl<>(users);

        when(userService.getUsers(null, "Porto Alegre", null, Pageable.unpaged())).thenReturn(userPage);

        ResponseEntity<Page<User>> response = userController.getUsers(Pageable.unpaged(), null, "Porto Alegre", null);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        Page<User> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertFalse(responsePage.isEmpty());

        User actualUser = responsePage.getContent().get(0);
        User expectedUser = users.get(0);
        assertEquals(actualUser.getAddress().getCity(), expectedUser.getAddress().getCity());

        verify(userService, times(1)).getUsers(null, "Porto Alegre", null, Pageable.unpaged());
    }

    @Test
    void testGetUsersWithFilteredByDay() {
        List<User> users = UserCreator.createListOfUsersWithDifferentAddresses();

        Page<User> userPage = new PageImpl<>(users);

        when(userService.getUsers(null, null, "Segunda", Pageable.unpaged())).thenReturn(userPage);

        ResponseEntity<Page<User>> response = userController.getUsers(Pageable.unpaged(), null, null, "Segunda");

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        Page<User> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertFalse(responsePage.isEmpty());

        User actualUser = responsePage.getContent().get(0);
        User expectedUser = users.get(0);
        assertEquals(actualUser.getAddress().getCity(), expectedUser.getAddress().getCity());

        verify(userService, times(1)).getUsers(null, null, "Segunda", Pageable.unpaged());
    }

    @SuppressWarnings("null")
    @Test
    void testCreateUser() {
        when(userService.insertNewUser(user)).thenReturn(user);

        ResponseEntity<User> response = userController.insertNewUser(user);
    
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(user.getName(), response.getBody().getName());
    
        verify(userService, times(1)).insertNewUser(user);
    }

    @SuppressWarnings("null")
    @Test
    void testUpdateUser() {
        Long userId = 1L;

        when(userService.updateUser(userId, user)).thenReturn(user);

        ResponseEntity<User> response = userController.updateUser(userId, user);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(user.getName(), response.getBody().getName());

        verify(userService, times(1)).updateUser(userId, user);
    }

    @Test
    void testUpdateUserNotFound() {
        Long userId = 1L;

        when(userService.updateUser(userId, user)).thenReturn(null);

        ResponseEntity<User> response = userController.updateUser(userId, user);

        assertNotNull(response);
        assertEquals(404, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(userService, times(1)).updateUser(userId, user);
    }

    @Test
    void testDeleteUser() {
        Long userId = 1L;

        when(userService.deleteUser(userId)).thenReturn(true);

        ResponseEntity<Void> response = userController.deleteUser(userId);

        assertNotNull(response);
        assertEquals(204, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(userService, times(1)).deleteUser(userId);
    }

    @Test
    void testDeleteUserNotFound() {
        Long userId = 1L;

        doThrow(new EntityNotFoundException("User not found", List.of("O Ajudante informado não foi encontrado."))).when(userService).deleteUser(userId);

        assertThrows(EntityNotFoundException.class, () -> userController.deleteUser(userId));

        verify(userService, times(1)).deleteUser(userId);
    }

}

