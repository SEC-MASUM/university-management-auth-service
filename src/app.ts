import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import Routes from './app/routes';
const app: Application = express();

app.use(cors());

//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
// app.use('/api/v1/user/', UserRoutes);
// app.use('/api/v1/academic-semester/', AcademicSemesterRoutes);

app.use('/api/v1', Routes);

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error Logger')
// })

// global error handler
app.use(globalErrorHandler);

export default app;
