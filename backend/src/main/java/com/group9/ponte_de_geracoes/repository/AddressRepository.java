package com.group9.ponte_de_geracoes.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import com.group9.ponte_de_geracoes.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    @NonNull
    Page<Address> findAll(@NonNull Pageable pageable);

    @Query("SELECT DISTINCT a.city FROM Address a")
    Page<String> findAllDistinctedCities(Pageable pageable);
}
