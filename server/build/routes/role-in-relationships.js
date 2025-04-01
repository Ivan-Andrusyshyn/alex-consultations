"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getQuestions_1 = __importDefault(require("../controllers/role-in-relationships-test/getQuestions"));
const getCategoryName_1 = __importDefault(require("../controllers/role-in-relationships-test/getCategoryName"));
const getInfoByCategory_1 = __importDefault(require("../controllers/role-in-relationships-test/getInfoByCategory"));
const getTestInformation_1 = __importDefault(require("../controllers/role-in-relationships-test/getTestInformation"));
const role_in_relationships_test_1 = require("../validators/role-in-relationships-test");
const roleInRelationshipsRouter = (0, express_1.default)();
roleInRelationshipsRouter.get('/role-in-relationships', getQuestions_1.default);
roleInRelationshipsRouter.get('/role-in-relationships/category/:categoryName', getInfoByCategory_1.default);
roleInRelationshipsRouter.get('/role-in-relationships/information', getTestInformation_1.default);
roleInRelationshipsRouter.post('/role-in-relationships/category', role_in_relationships_test_1.roleInRelationshpsGetNameValidator, getCategoryName_1.default);
exports.default = roleInRelationshipsRouter;
