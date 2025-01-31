import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "./swaggerDef.js";

const options = {
  definition: swaggerDefinition,
  apis: ["./swaggerDocs/*.yaml"], // Swagger dokümantasyonu için ayrı YAML dosyaları
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📌 Swagger UI çalışıyor: http://localhost:5000/api-docs");
};

export default swaggerDocs;
