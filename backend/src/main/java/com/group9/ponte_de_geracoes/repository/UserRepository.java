package com.group9.ponte_de_geracoes.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import com.group9.ponte_de_geracoes.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @NonNull
    Page<User> findAll(@NonNull Pageable pageable);
    Page<User> findByIsAvailableorNeedsHelp(boolean isAvailableorNeedsHelp, Pageable pageable);
    Page<User> findByAddress_City(String city, Pageable pageable);
}
