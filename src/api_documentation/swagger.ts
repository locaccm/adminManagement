import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import fs from "fs";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin Management API",
      version: "1.0.0",
      description: "API documentation for the admin dashboard",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  const docDir = path.join(__dirname, "..", "api_documentation");
  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir);
  }

  fs.writeFileSync(
    path.join(docDir, "swagger_doc.json"),
    JSON.stringify(swaggerSpec, null, 2),
  );
};
