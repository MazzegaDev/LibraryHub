package com.Mazzega_Dev.LibraryHub.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Mazzega_Dev.LibraryHub.database.entity.UsuarioEntity;

public interface IUsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {

}
