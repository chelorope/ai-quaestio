package app;

import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.logging.Logger;
import java.util.logging.Level;

import javax.servlet.MultipartConfigElement;

public class Main {
    public static void main(String[] args) {
    	File uploadDir = new File("upload");
        uploadDir.mkdir();
        Logger logger = Logger.getLogger(Main.class.getName());

        staticFiles.externalLocation("upload");
    	
        port(9090);
        post("/file", (req, res) -> {
        	Path tempFile = Files.createTempFile(uploadDir.toPath(), "", "");

            req.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

            try (InputStream input = req.raw().getPart("uploaded_file").getInputStream()) { // getPart needs to use same "name" as input field in form
                Files.copy(input, tempFile, StandardCopyOption.REPLACE_EXISTING);
            }
            logger.log(Level.INFO, "Uploading file", tempFile);
        	return QML.fromFile(tempFile.toFile()).toString();
        });
    }

}