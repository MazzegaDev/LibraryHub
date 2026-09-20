package com.Mazzega_Dev.LibraryHub.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Mazzega_Dev.LibraryHub.database.entity.UsuarioEntity;

public interface IUsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {

   Optional<UsuarioEntity> findByUsuarioEmail(String usuarioEmail);

   Optional<UsuarioEntity> findByUsuarioTelefone(String usuarioTelefone);
}
