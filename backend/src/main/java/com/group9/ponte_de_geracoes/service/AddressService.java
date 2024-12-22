package com.group9.ponte_de_geracoes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group9.ponte_de_geracoes.repository.AddressRepository;

@Service
public class AddressService {
    
    @Autowired
    private AddressRepository addressRepository;

    public Page<String> getAllDistinctedCities(Pageable pageable) {
        return addressRepository.findAllDistinctedCities(pageable);
    }

}
