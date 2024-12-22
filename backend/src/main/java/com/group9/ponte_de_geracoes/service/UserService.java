package com.group9.ponte_de_geracoes.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.exception.ImageStorageException;
import com.group9.ponte_de_geracoes.model.User;
import com.group9.ponte_de_geracoes.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final String uploadImagesDir = "./uploads/user/";
    private static final List<String> ALLOWED_FILE_TYPES = List.of(
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
    );

    public Page<User> getUsers(Boolean isAvailableOrNeedsHelp, String city, String helpDay, Pageable pageable) {
        if (isAvailableOrNeedsHelp != null) {
            return userRepository.findByIsAvailableOrNeedsHelp(isAvailableOrNeedsHelp, pageable);
        } else if (city != null) {
            return userRepository.findByAddress_City(city, pageable);
        } else {
            return userRepository.findAll(pageable);
        }
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User insertNewUser(User user) {
        user.setId(null);
        
        if (user != null && user.getProfileImageUrl() == null){
            user.setProfileImageUrl("/uploads/upload-image.svg");
        }
        return userRepository.save(user);
    }

    public String uploadImage(Long userId, MultipartFile file) {
        try {
            Optional<User> optionalUser = userRepository.findById(userId);

            if (optionalUser.isEmpty()){
                    throw new EntityNotFoundException("Usuário não encontrado", List.of("O usuário informado não foi encontrado."));
            }
            if (file.isEmpty()) {
                throw new ImageStorageException("Arquivo vazio", List.of("O arquivo de imagem recebido está vázio."));
            }
            String contentType = file.getContentType();
            if (contentType == null || !ALLOWED_FILE_TYPES.contains(contentType)) {
                throw new ImageStorageException("Tipo de arquivo inválido", List.of("O tipo de arquivo enviado não é válido. Apenas imagens .JPG e .PNG são permitidas."));
            }

            User user = optionalUser.get();
        
            String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        
            Path path = Paths.get(uploadImagesDir + fileName);
            
            File directory = new File(uploadImagesDir);
            if (!directory.exists()) {
                boolean dirCreated = directory.mkdirs();
                if (!dirCreated) {
                    throw new ImageStorageException("Falha ao subir imagem", List.of("Falha interna durante o armazenamento da imagem,"));
                }
            }
        
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        
            String fileUrl = "/uploads/user/" + fileName;
        
            user.setProfileImageUrl(fileUrl);
            userRepository.save(user);
        
            return fileUrl;
        }
        catch (IOException e){
            throw new ImageStorageException("Falha ao subir imagem", List.of("Falha interna durante o armazenamento da imagem,"));
        }
    }

    public User updateUser(Long id, User requestUser) {
        return userRepository.findById(id).map(userToUpdate -> {
            if (requestUser.getName() != null) {
                userToUpdate.setName(requestUser.getName());
            }
            if (requestUser.getBirthDate() != null) {
                userToUpdate.setBirthDate(requestUser.getBirthDate());
            }
            if (requestUser.getRg() != null) {
                userToUpdate.setRg(requestUser.getRg());
            }
            if (requestUser.getCpf() != null) {
                userToUpdate.setCpf(requestUser.getCpf());
            }
            if (requestUser.getEmail() != null) {
                userToUpdate.setEmail(requestUser.getEmail());
            }
            if (requestUser.getPhone() != null) {
                userToUpdate.setPhone(requestUser.getPhone());
            }
            if (requestUser.getPassword() != null) {
                userToUpdate.setPassword(requestUser.getPassword());
            }
            if (requestUser.getHelpDays() != null) {
                userToUpdate.setHelpDays(requestUser.getHelpDays());
            }
            if (requestUser.getSkillsOsNeeds() != null) {
                userToUpdate.setSkillsOrNeeds(requestUser.getSkillsorNeeds());
            }      
            if (requestUser.getAbout() != null) {
                userToUpdate.setAbout(requestUser.getAbout());
            }
            if (requestUser.getAddress() != null) {
                userToUpdate.setAddress(requestUser.getAddress());
            }
            userToUpdate.setAvailableOrNeedsHelp(requestUser.isAvailableOrNeedsHelp());
    
            return userRepository.save(userToUpdate);
        }).orElse(null);
    }    

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
