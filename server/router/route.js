import { Router } from "express";
const router = Router();

import * as controller from '../controller/controller.js';

router.route('/register').post(controller.registerUser);
router.route('/login').post(controller.loginUser);
router.route('/questions').get(controller.getQuestions).post(controller.insertQuestions).delete(controller.dropQuestions);
router.route('/questions/:id').delete(controller.deleteQuestion).put(controller.editQuestion);
router.route('/feedback').post(controller.storeFeedback);
router.route('/feedback/stats').get(controller.getRatingsStats);
router.route('/result').get(controller.getResult).post(controller.storeResult);
router.route('/result/:id').delete(controller.deleteResult);
router.route('/total-users').get(controller.getTotalUsers);
router.route('/total-questions').get(controller.getTotalQuestions);

export default router;

