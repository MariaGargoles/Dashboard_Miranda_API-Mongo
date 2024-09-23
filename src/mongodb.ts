import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI as string; 
    if (!uri) {
      throw new Error('Falta la variable MONGODB_URI en el archivo .env');
    }
    
    await mongoose.connect(uri);
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1); 
  }
};
