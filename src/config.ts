import dotenv from "dotenv";

dotenv.config();

const checkEnv = (envVar: string, defaultValue?: string) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const PORT: number = parseInt(checkEnv("PORT", '3000'), 10);
export const DBURL: string = checkEnv("DBURL", "mongodb://localhost:27017/userFavorites" );
export const sectretKey: string = checkEnv("secretKey");
export const CORS_ORIGINS = [`http://localhost:${PORT}`];
