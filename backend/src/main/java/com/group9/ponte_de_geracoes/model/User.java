package com.group9.ponte_de_geracoes.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String profileImageUrl;
    private LocalDate birthDate;
    private String rg;
    private String cpf;
    private String email;
    private String phone;
    private String password;
    private boolean isAvailableOrNeedsHelp;
    private List<String> helpDays;
    private String skillsOrNeeds;
    private String about;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<AssistanceLog> assistanceLogs;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAvailableOrNeedsHelp() {
        return isAvailableOrNeedsHelp;
    }

    public void setAvailableOrNeedsHelp(boolean isAvailableOrNeedsHelp) {
        this.isAvailableOrNeedsHelp = isAvailableOrNeedsHelp;
    }

    public List<String> getHelpDays() {
        return helpDays;
    }

    public void setHelpDays(List<String> helpDays) {
        this.helpDays = helpDays;
    }

    public String getSkillsOrNeeds() {
        return skillsOrNeeds;
    }

    public void setSkillsOrNeeds(String skillsOrNeeds) {
        this.skillsOrNeeds = skillsOrNeeds;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

  
}
