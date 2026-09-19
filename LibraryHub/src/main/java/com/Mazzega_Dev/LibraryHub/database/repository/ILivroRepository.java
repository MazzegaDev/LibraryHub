package com.Mazzega_Dev.LibraryHub.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Mazzega_Dev.LibraryHub.database.entity.LivroEntity;

public interface ILivroRepository extends JpaRepository<LivroEntity, Integer>{

}
