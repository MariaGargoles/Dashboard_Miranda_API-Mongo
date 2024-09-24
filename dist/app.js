"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mustache_express_1 = __importDefault(require("mustache-express"));
const auth_1 = require("./controllers/auth");
const rooms_1 = __importDefault(require("./controllers/rooms"));
const users_1 = __importDefault(require("./controllers/users"));
const booking_1 = __importDefault(require("./controllers/booking"));
const contactmessages_1 = require("./controllers/contactmessages");
const mongodb_1 = require("./mongodb");
const auth_2 = require("./middleware/auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 3001;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongodb_1.connectDB)();
            console.log('MongoDB connected');
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    });
}
startServer();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.engine('mustache', (0, mustache_express_1.default)());
app.post('/login', auth_1.loginController);
app.use('/rooms', auth_2.authTokenMiddleware, rooms_1.default);
app.use('/users', auth_2.authTokenMiddleware, users_1.default);
app.use('/booking', auth_2.authTokenMiddleware, booking_1.default);
app.use('/contact', auth_2.authTokenMiddleware, contactmessages_1.ContactRouter);
app.get('/', (_req, res) => {
    res.render('index');
});
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(error.status || 500).json({
        message: error.safe ? error.message : 'Error in the application',
    });
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
