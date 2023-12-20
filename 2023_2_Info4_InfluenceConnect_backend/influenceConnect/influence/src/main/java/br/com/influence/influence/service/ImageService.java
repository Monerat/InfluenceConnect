package br.com.influence.influence.service;


import org.apache.commons.lang3.exception.ContextedRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.influence.influence.common.ImageUtils;
import br.com.influence.influence.model.Image;
import br.com.influence.influence.repository.ImageRepository;

import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;


@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image uploadImage(MultipartFile imageFile, String filename) throws IOException {
        Image imageToSave = new Image.Builder()
                .name(filename)
                .type(imageFile.getContentType())
                .imageData(ImageUtils.compressImage(imageFile.getBytes()))
                .build();

        
        return imageRepository.save(imageToSave);
    }

    public byte[] downloadImage(Long id) {
        Optional<Image> dbImage = imageRepository.findById(id);
        return dbImage.map(image -> {
            try {
                return ImageUtils.decompressImage(image.getImageData());
            } catch (DataFormatException | IOException exception) {
                throw new ContextedRuntimeException("Error downloading an image", exception)
                        .addContextValue("Image ID",  image.getId())
                        .addContextValue("Image name", image.getName());
            }
        }).orElse(null);
    }
}