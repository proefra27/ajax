package com.upiiz.ajaxcrud.repositories;

import com.upiiz.ajaxcrud.models.MascotaModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MascotaRepository {
    public List<MascotaModel> findAllMascotas();
    public MascotaModel findMascotaById(int id);
    //Regresa la mascota, incluyendo el id
    public MascotaModel save(MascotaModel model);
    //Regrese la cantidad de registros afectados = 1, 30 o 0
    public int update(MascotaModel model);
    //Regrese la cantidad de mascotas eliminadas = 5 o 0
    public int delete(int id);
}
