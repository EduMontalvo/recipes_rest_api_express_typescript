import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Recipes',
                description: 'API operations related to recipes'
            }
        ],
        info: {
            title: 'REST API Node.js | Express | Typescript',
            version: '1.0.0',
            description: 'API Docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpecs = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://i.imgur.com/1PpoSiK.jpeg');
            height: 187px;
            width: 10px;
        }
    `,
    customSiteTitle: 'Documentación REST API Express | Typescript'
}

export default swaggerSpecs
export {
    swaggerUiOptions
}