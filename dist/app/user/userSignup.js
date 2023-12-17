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
Object.defineProperty(exports, "__esModule", { value: true });
const userValidation_1 = require("./userValidation");
const signupUser = (userRepository) => {
    return (user) => __awaiter(void 0, void 0, void 0, function* () {
        const hashePassword = yield (0, userValidation_1.passwordHashing)(user === null || user === void 0 ? void 0 : user.password);
        let newUser = Object.assign(Object.assign({}, user), { password: hashePassword });
        const createUser = yield userRepository.createUser(newUser);
        return createUser;
    });
};
exports.default = signupUser;
