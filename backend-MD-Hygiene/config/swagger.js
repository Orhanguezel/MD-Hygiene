import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "./swaggerDef.js";

// Swagger ayarları
const options = {
  definition: swaggerDefinition,
  apis: ["./swaggerDocs/*.yaml"], // YAML dokümanlarını burada tanımla
};

// Swagger spesifikasyonlarını oluştur
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(
    `📌 Swagger UI çalışıyor: ${
      process.env.NODE_ENV === "production"
        ? `${process.env.VITE_API_URL}/api-docs`
        : `http://localhost:${process.env.PORT || 5009}/api-docs`
    }`
  );
};

export default swaggerDocs;
