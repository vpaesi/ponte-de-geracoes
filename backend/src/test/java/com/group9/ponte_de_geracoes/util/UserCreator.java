package com.group9.ponte_de_geracoes.util;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.group9.ponte_de_geracoes.model.Address;
import com.group9.ponte_de_geracoes.model.User;

public class UserCreator {

    public static User createUserToBeSaved() {
        User user = new User();
        
        user.setName("João Paulo");
        user.setProfileImageUrl(null);
        user.setBirthDate(LocalDate.of(2005, 05, 12));
        user.setRg("123456789");
        user.setCpf("123.456.789-10");
        user.setEmail("joaopaulo@example.com");
        user.setPhone("(11) 98765-4321");
        user.setPassword("password123");
        user.setAvailableOrNeedsHelp(true);
        user.setHelpDays(Arrays.asList("Segunda", "Quarta", "Sexta"));
        user.setSkillsOrNeeds("Adoro ajudar em tarefas domésticas e jardinagem");
        user.setAbout("Estudante de Engenharia de Software e amante de plantas");
        
        Address address = new Address();
        address.setCity("São Paulo");
        address.setZipCode("01000-000");
        address.setNeighborhood("Sé");
        address.setStreet("Rua Exemplo");
        address.setNumber("123");
        address.setComplement("Apt. 45");

        user.setAddress(address);

        return user;
    }

    public static List<User> createListOfUsersWithDifferentAddresses() {
        List<User> users = new ArrayList<>();
    
        users.add(createUserWithAddress("São Paulo", "01000-000", "Rua Exemplo", "123", "Apt. 45"));
        users.add(createUserWithAddress("Rio de Janeiro", "20000-000", "Avenida Exemplo", "456", null));
        users.add(createUserWithAddress("Belo Horizonte", "30000-000", "Praça Exemplo", "789", "Casa"));
    
        return users;
    }

    public static User createUserWithName(String name) {
        User user = createUserToBeSaved();
        user.setName(name);
        return user;
    }

    public static User createUserWithAvailableDays(String name) {
        User user = createUserToBeSaved();
        user.setName(name);
        return user;
    }

    public static User createUserWithoutCpf() {
        User user = createUserToBeSaved();
        user.setCpf(null);
        return user;
    }
    
    private static User createUserWithAddress(String city, String zipCode, String street, String number, String complement) {
        Address address = new Address();
        address.setZipCode(zipCode);
        address.setCity(city);
        address.setNeighborhood(complement);
        address.setStreet(street);
        address.setNumber(number);
        address.setComplement(complement);
    
        User user = new User();
        user.setAddress(address);
    
        return user;
    }
}
