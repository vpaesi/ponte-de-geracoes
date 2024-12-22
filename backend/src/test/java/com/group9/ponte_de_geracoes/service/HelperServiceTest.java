package com.group9.ponte_de_geracoes.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.model.User;
import com.group9.ponte_de_geracoes.repository.UserRepository;
import com.group9.ponte_de_geracoes.util.UserCreator;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = UserCreator.createUserToBeSaved();
    }

    @Test
    void testGetUsers() {
        List<User> users = Collections.singletonList(user);
        Page<User> userPage = new PageImpl<>(users);

        when(userRepository.findAll(Pageable.unpaged())).thenReturn(userPage);

        Page<User> result = userService.getUsers(null, null, null, Pageable.unpaged());

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(user.getName(), result.getContent().get(0).getName());

        verify(userRepository, times(1)).findAll(Pageable.unpaged());
    }

    @Test
    void testInsertNewUser() {
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.insertNewUser(user);

        assertNotNull(result);
        assertEquals(user.getName(), result.getName());

        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUploadImage() throws IOException {
        MultipartFile mockFile = mock(MultipartFile.class);
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getOriginalFilename()).thenReturn("profile.jpg");
        when(mockFile.getContentType()).thenReturn("image/jpeg");
        when(mockFile.getInputStream()).thenReturn(mock(InputStream.class));

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        String result = userService.uploadImage(1L, mockFile);

        assertNotNull(result);
        assertTrue(result.contains("uploads/user/"));

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUploadImageUserNotFound() {
        MultipartFile mockFile = mock(MultipartFile.class);
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> userService.uploadImage(1L, mockFile));

        assertEquals("User not founded", exception.getMessage());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        User updatedUser = new User();
        updatedUser.setName("Updated Name");

        User result = userService.updateUser(1L, updatedUser);

        assertNotNull(result);
        assertEquals("Updated Name", result.getName());

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testDeleteUser() {
        when(userRepository.existsById(1L)).thenReturn(true);

        boolean result = userService.deleteUser(1L);

        assertTrue(result);
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteUserNotExists() {
        when(userRepository.existsById(1L)).thenReturn(false);

        boolean result = userService.deleteUser(1L);

        assertFalse(result);
        verify(userRepository, times(0)).deleteById(1L);
    }
}
